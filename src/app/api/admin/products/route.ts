import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const published = searchParams.get('published');
  const featured = searchParams.get('featured');
  const promoted = searchParams.get('promoted');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      {
        OR: [
          { nameRw: { contains: query } },
          { nameEn: { contains: query } },
          { brand: { contains: query } },
          { activeIngredients: { contains: query } },
          { usagePurpose: { contains: query } },
        ],
      },
      categoryId ? { categoryId } : {},
      published !== null ? { published: published === 'true' } : {},
      featured !== null ? { featured: featured === 'true' } : {},
      promoted !== null ? { promoted: promoted === 'true' } : {},
    ],
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: {
          include: { parent: true }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        slug: data.slug || data.nameEn.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
