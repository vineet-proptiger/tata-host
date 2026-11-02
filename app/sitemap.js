export default function sitemap() {
  const baseUrl = 'https://tataorbisghansoliproject.co.in/'
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // {
    //   url: `${baseUrl}/new-launch-bangalore`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.3,
    // },
  ]
}
