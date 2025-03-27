import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { hashSync } from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    const user = await prisma.user.create({
      data: {
        email,
        password: hashSync(password, 10),
        fullName,
      },
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Registration error' }, { status: 500 })
  }
}
