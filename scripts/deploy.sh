#!/bin/bash
set -e

echo "🔨 1. Building Next.js static export..."
npm run build
mkdir -p out/privacy-policy
cp out/privacy-policy.html out/privacy-policy/index.html 2>/dev/null || true

echo "📦 2. Preparing deploy files..."
TMP_DEPLOY=$(mktemp -d)
cp -R out/* "$TMP_DEPLOY/"
cp out/.htaccess "$TMP_DEPLOY/" 2>/dev/null || true
find "$TMP_DEPLOY" -name ".DS_Store" -delete

cd "$TMP_DEPLOY"
git init -b main
git remote add origin https://github.com/vineet-proptiger/tata-host.git
git add -A
git commit -m "Deploy: Updated build for Hostinger ($(date +'%Y-%m-%d %H:%M:%S'))"

echo "🚀 3. Pushing to main branch (Hostinger)..."
git push --force origin main

rm -rf "$TMP_DEPLOY"
echo "✅ Successfully deployed to Hostinger main branch!"
