<?php
// ═══════════════════════════════════════════════════════════════
//  HOSTINGER LEAD SUBMISSION HANDLER — PHP
//  Compatible with Next.js static export & direct form submission
//  Sends leads to:
//    1. Google Sheet Webhook
//    2. PropTiger CRM API
// ═══════════════════════════════════════════════════════════════

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

error_reporting(0);
ini_set('display_errors', 0);

/* ─── DEFAULT CONFIGURATION (TATA GHANSOLI) ─── */
define('DEFAULT_PROJECT_ID',   '3528269');
define('DEFAULT_PROJECT_NAME', 'Tata Ghansoli');
define('DEFAULT_CITY_DISPLAY', 'Mumbai');
define('DEFAULT_CITY_SLUG',    'mumbai');
define('DEFAULT_CITY_ID',      '1');
define('DEFAULT_SHEET_NAME',   'Mumbai');
define('DEFAULT_SECRET_KEY',   '6c7f9ad8b2a1e0f4d5a8c0b9f6e2a4d190');

define('SHEET_WEBHOOK', 'https://script.google.com/macros/s/AKfycbw2MGrCI0lVGZZD049RrqM52ubNIHHZLzuk7mIg9KMVacJREV9sw05jnPMvT5OeNtWt/exec');
define('PROPTIGER_URL', 'https://www.proptiger.com/data/v1/entity/enquiry');

/* ─── BASIC GUARDS ─── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => false, 'msg' => 'Method not allowed']);
    exit;
}

/* ─── PARSE REQUEST BODY (Supports FormData, x-www-form-urlencoded & JSON) ─── */
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);
$data = is_array($jsonData) ? array_merge($_POST, $jsonData) : $_POST;

/* ─── HELPER FUNCTIONS ─── */
function clean($v) {
    if (is_array($v) || is_object($v)) return '';
    return trim(strip_tags(isset($v) ? (string)$v : ''));
}

function getVal($data, $keys, $fallback = '') {
    if (!is_array($keys)) $keys = [$keys];
    foreach ($keys as $k) {
        if (isset($data[$k]) && clean($data[$k]) !== '') {
            return clean($data[$k]);
        }
    }
    return $fallback;
}

function getUserIP() {
    $loopback = ['::1', '127.0.0.1', '::ffff:127.0.0.1'];
    $ipHeaders = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR'
    ];
    foreach ($ipHeaders as $header) {
        if (!empty($_SERVER[$header])) {
            $ipList = explode(',', $_SERVER[$header]);
            $clientIp = trim($ipList[0]);
            if (!empty($clientIp) && !in_array($clientIp, $loopback, true)) {
                return $clientIp;
            }
        }
    }
    return '';
}

/* ─── HONEYPOT CHECK ─── */
if (getVal($data, ['website', 'honeypot']) !== '') {
    echo json_encode(['status' => false, 'msg' => 'Spam detected']);
    exit;
}

/* ─── REQUIRED FIELDS ─── */
$phone = preg_replace('/\D+/', '', getVal($data, 'phone'));
if (strlen($phone) > 10) $phone = substr($phone, -10);
if (strlen($phone) > 0 && strlen($phone) < 10) {
    echo json_encode(['status' => false, 'msg' => 'Invalid phone number']);
    exit;
}
if (strlen($phone) === 10 && !preg_match('/^[6-9]\d{9}$/', $phone)) {
    echo json_encode(['status' => false, 'msg' => 'Phone number must start with 6, 7, 8, or 9']);
    exit;
}

$email = getVal($data, 'email');
if ($phone === '' && $email === '') {
    echo json_encode(['status' => false, 'msg' => 'Phone or email required']);
    exit;
}

/* ─── PROJECT & USER DATA ─── */
$projectId   = getVal($data, ['projectId', 'projectid'], DEFAULT_PROJECT_ID);
$projectName = getVal($data, ['projectName', 'projectname'], DEFAULT_PROJECT_NAME);
$secretKey   = getVal($data, 'secret', DEFAULT_SECRET_KEY);
$sheetName   = getVal($data, 'sheet_name', DEFAULT_SHEET_NAME);
$cityDisplay = getVal($data, ['city', 'projectcity', 'cityName'], DEFAULT_CITY_DISPLAY);
$citySlug    = getVal($data, ['citySlug', 'cityName'], DEFAULT_CITY_SLUG);
$cityId      = getVal($data, ['cityId', 'city_id'], DEFAULT_CITY_ID);

$fullName = getVal($data, ['fullname', 'name', 'FullName']);
$nameParts = preg_split('/\s+/', $fullName, 2);
$firstName = $nameParts[0] ?? '';
$lastName  = $nameParts[1] ?? $firstName;

$comments = getVal($data, ['comments', 'query', 'message']);
$formName = getVal($data, ['form_name', 'formname'], 'Popup Modal');

/* ─── TRACKING & METADATA ─── */
$landingPage = getVal($data, ['SourceURL', 'sourceurl', 'landing_page'], $_SERVER['HTTP_REFERER'] ?? '');
$userIP      = getUserIP() ?: getVal($data, ['ip_address', 'ipaddress']);

// Auto-detect device if not passed
$device = getVal($data, 'device');
if ($device === '') {
    $ua = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
    $device = preg_match('/mobile|android|iphone|ipad|ipod/i', $ua) ? 'mobile' : 'desktop';
}

$utmSource   = getVal($data, 'utm_source', 'Microsite');
$utmMedium   = getVal($data, 'utm_medium', 'organic');
$utmCampaign = getVal($data, 'utm_campaign');
$utmTerm     = getVal($data, 'utm_term');
$utmContent  = getVal($data, 'utm_content');
$campaignName= getVal($data, 'campaign_name');

$gclid  = getVal($data, 'gclid');
$gbraid = getVal($data, 'gbraid');
$wbraid = getVal($data, 'wbraid');
$fbclid = getVal($data, 'fbclid');

/* ═══════════════════════════════════════════════════════════════
   1. GOOGLE SHEET WEBHOOK POST
   ═══════════════════════════════════════════════════════════════ */
$sheetPayload = http_build_query([
    'secret'        => $secretKey,
    'projectid'     => $projectId,
    'projectname'   => $projectName,

    'fullname'      => $fullName ?: trim("$firstName $lastName"),
    'firstname'     => $firstName,
    'lastname'      => $lastName,
    'email'         => $email,
    'mobile'        => $phone,
    'comments'      => $comments,

    'utm_source'    => $utmSource,
    'utm_medium'    => $utmMedium,
    'utm_campaign'  => $utmCampaign,
    'utm_term'      => $utmTerm,
    'utm_content'   => $utmContent,
    'campaign_name' => $campaignName,
    'sub_source'    => getVal($data, 'sub_source'),
    'utm_id'        => getVal($data, 'utm_id'),

    'ad_name'       => getVal($data, 'ad_name'),
    'ad_group_name' => getVal($data, 'ad_group_name'),
    'ad_group_id'   => getVal($data, 'ad_group_id'),

    'gclid'         => $gclid,
    'gbraid'        => $gbraid,
    'wbraid'        => $wbraid,
    'fbclid'        => $fbclid,

    'sourceurl'     => $landingPage,
    'landing_page'  => $landingPage,

    'device'        => $device,
    'referrer'      => getVal($data, 'referrer'),
    'ipaddress'     => $userIP,
    'formname'      => $formName,
    'projectcity'   => $cityDisplay,
    'sheet_name'    => $sheetName,
]);

$chSheet = curl_init(SHEET_WEBHOOK);
curl_setopt_array($chSheet, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $sheetPayload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_TIMEOUT        => 8,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);
$sheetResponse = curl_exec($chSheet);
$sheetStatus   = curl_getinfo($chSheet, CURLINFO_HTTP_CODE);
curl_close($chSheet);

/* ═══════════════════════════════════════════════════════════════
   2. PROPTIGER CRM API POST
   ═══════════════════════════════════════════════════════════════ */
$ptUrl = PROPTIGER_URL . '?utm_source=' . urlencode($utmSource)
    . '&utm_medium=' . urlencode($utmMedium)
    . '&utm_campaign=' . urlencode($utmCampaign)
    . '&utm_term=' . urlencode($utmTerm)
    . '&utm_content=' . urlencode($utmContent)
    . '&gclid=' . urlencode($gclid)
    . '&gbraid=' . urlencode($gbraid)
    . '&wbraid=' . urlencode($wbraid)
    . '&campaign_name=' . urlencode($campaignName)
    . '&sourceDomain=Microsite';

// Additional tracking query parameters
$extraTracking = [
    'google_campaign_id'    => $campaignName,
    'google_ad_group_id'    => getVal($data, 'google_ad_group_id'),
    'google_ad_group_name'  => getVal($data, 'google_ad_group_name'),
    'google_ad_name'        => getVal($data, 'google_ad_name'),
    'google_ad_id'          => getVal($data, 'google_ad_id'),
    'google_wbraid'         => getVal($data, 'google_wbraid'),
    'google_gbraid'         => getVal($data, 'google_gbraid'),
    'google_keyword'        => getVal($data, 'google_keyword'),
    'google_matchtype'      => getVal($data, 'google_matchtype'),
    'google_device'         => getVal($data, 'google_device'),
    'google_gclid'          => getVal($data, 'google_gclid'),
    'utm_campaign_id'       => getVal($data, 'utm_campaign_id'),
    'utm_adgroup'           => getVal($data, 'utm_adgroup'),
    'utm_adgroup_id'        => getVal($data, 'utm_adgroup_id'),
    'utm_ad_id'             => getVal($data, 'utm_ad_id'),
    'utm_keyword'           => getVal($data, 'utm_keyword'),
    'utm_matchtype'         => getVal($data, 'utm_matchtype'),
    'utm_network'           => getVal($data, 'utm_network'),
    'utm_device'            => getVal($data, 'utm_device'),
    'utm_gclid'             => getVal($data, 'utm_gclid'),
    'utm_gbraid'            => getVal($data, 'utm_gbraid'),
    'utm_wbraid'            => getVal($data, 'utm_wbraid'),
    'ip_address'            => $userIP,
    'sub_source'            => getVal($data, 'sub_source'),
    'landing_page'          => $landingPage,
    'referrer'              => getVal($data, 'referrer'),
    'google_gad_source'     => getVal($data, 'google_gad_source'),
    'google_gad_campaignid' => getVal($data, 'google_gad_campaignid'),
    'asset_group_id'        => getVal($data, 'asset_group_id'),
    'meta_campaign_id'      => getVal($data, 'meta_campaign_id'),
    'meta_adset_id'         => getVal($data, 'meta_adset_id'),
    'meta_adset_name'       => getVal($data, 'meta_adset_name'),
    'meta_ad_name'          => getVal($data, 'meta_ad_name'),
    'meta_ad_id'            => getVal($data, 'meta_ad_id'),
    'meta_creative_id'      => getVal($data, 'meta_creative_id'),
    'meta_placement'        => getVal($data, 'meta_placement'),
    'meta_fbclid'           => getVal($data, 'meta_fbclid'),
    'user_agent'            => getVal($data, 'user_agent', $_SERVER['HTTP_USER_AGENT'] ?? ''),
];

foreach ($extraTracking as $key => $val) {
    if ($val !== '') {
        $ptUrl .= '&' . $key . '=' . urlencode($val);
    }
}

$ptPayload = [
    'name'        => $fullName ?: trim("$firstName $lastName"),
    'email'       => $email,
    'phone'       => $phone,
    'countryId'   => '1',
    'source'      => $utmSource,
    'projectId'   => (string)$projectId,
    'projectName' => $projectName,
    'cityId'      => (string)$cityId,
    'cityName'    => strtolower($citySlug),
    'city'        => $cityDisplay,
    'gaMedium'    => $utmMedium,
    'campaign'    => $utmCampaign,
    'addgroup'    => getVal($data, ['adgroup_name', 'ad_group_name']),
    'utm_term'    => $utmTerm,
    'utm_content' => $utmContent,
    'gclid'       => $gclid,
    'gbraid'      => $gbraid,
    'wbraid'      => $wbraid,
    'query'       => $comments ?: 'Please arrange a callback',
    'device'      => $device,
    'userIP'      => $userIP,
    'sendOtp'     => false,
    'isTemp'      => false,
];

$chPt = curl_init($ptUrl);
curl_setopt_array($chPt, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($ptPayload),
    CURLOPT_HTTPHEADER     => [
        'Accept: application/json',
        'Content-Type: application/json',
        'User-Agent: Microsite'
    ],
    CURLOPT_TIMEOUT        => 8,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);
$ptResponse = curl_exec($chPt);
$ptStatus   = curl_getinfo($chPt, CURLINFO_HTTP_CODE);
curl_close($chPt);

/* ─── LOGGING (HELPFUL FOR HOSTINGER DEBUGGING) ─── */
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
$logFile = $logDir . '/leads.log';
$logEntry = "[" . date('Y-m-d H:i:s') . "] CRM: {$ptStatus} | SHEET: {$sheetStatus} | Phone: {$phone} | Name: {$fullName}\n";
@file_put_contents($logFile, $logEntry, FILE_APPEND);

/* ─── RETURN JSON RESPONSE ─── */
echo json_encode([
    'status' => true,
    'crm'    => $ptStatus,
    'sheet'  => $sheetStatus
]);
exit;
