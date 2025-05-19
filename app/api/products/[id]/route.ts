import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { ProductParams } from '@/types/api.types'

const getProduct = async (request: NextRequest, { params }: ProductParams) => {
  const { id } = params

  if (!id) {
    throw apiErrors.validation('Product ID is required')
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  })

  if (!product) {
    throw apiErrors.notFound('Product')
  }

  return NextResponse.json(product)
}

export const GET = async (request: NextRequest, context: ProductParams) => {
  try {
    return await getProduct(request, context)
  } catch (error) {
    return handleApiError(error)
  }
}
