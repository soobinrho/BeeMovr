import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
//    {
//      url: 'https://acme.com/about',
//      lastModified: new Date(),
//      changeFrequency: 'monthly',
//      priority: 0.8,
//    },
//    {
//      url: 'https://acme.com/blog',
//      lastModified: new Date(),
//      changeFrequency: 'weekly',
//      priority: 0.5,
//    },
  ]
}
