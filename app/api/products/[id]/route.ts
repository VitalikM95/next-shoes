import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products/[id] - отримати конкретний товар
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID must be a number' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          select: {
            id: true,
            colorType: true,
            colorName: true,
            colorHash: true,
            sizes: true,
            images: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
