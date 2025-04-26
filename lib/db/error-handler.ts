import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

type ApiError = {
  message: string
  status: number
  details?: unknown
}

export class ApiErrorHandler extends Error {
  constructor(public error: ApiError) {
    super(error.message)
    this.name = 'ApiErrorHandler'
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  if (error instanceof ApiErrorHandler) {
    return NextResponse.json(
      { error: error.error.message, details: error.error.details },
      { status: error.error.status }
    )
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Validation error', details: error.errors },
      { status: 400 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  )
}

export function createApiError(
  message: string,
  status: number,
  details?: unknown
) {
  return new ApiErrorHandler({ message, status, details })
}

// Популярні помилки
export const apiErrors = {
  unauthorized: (message = 'Authentication required') =>
    createApiError(message, 401),
  forbidden: (message = 'Access denied') => createApiError(message, 403),
  notFound: (resource: string) => createApiError(`${resource} not found`, 404),
  validation: (details: unknown) =>
    createApiError('Validation error', 400, details),
  server: (message = 'Server error') => createApiError(message, 500),
  conflict: (message = 'Resource already exists') =>
    createApiError(message, 409),
}
