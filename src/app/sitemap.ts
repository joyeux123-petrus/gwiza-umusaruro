import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gwiza.rw';

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });

  const productUrls = products.flatMap((p) => [
    { url: `${baseUrl}/rw/products/${p.slug}`, lastModified: p.updatedAt },
    { url: `${baseUrl}/en/products/${p.slug}`, lastModified: p.updatedAt },
  ]);

  const articleUrls = articles.flatMap((a) => [
    { url: `${baseUrl}/rw/tips/${a.slug}`, lastModified: a.updatedAt },
    { url: `${baseUrl}/en/tips/${a.slug}`, lastModified: a.updatedAt },
  ]);

  return [
    { url: `${baseUrl}/rw`, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/rw/products`, lastModified: new Date() },
    { url: `${baseUrl}/en/products`, lastModified: new Date() },
    ...productUrls,
    ...articleUrls,
  ];
}
