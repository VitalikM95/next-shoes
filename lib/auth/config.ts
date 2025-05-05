import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/prisma/prisma-client'
import bcrypt from 'bcrypt'

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google' && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          })

          if (!existingUser) {
            try {
              const googleUser = await prisma.user.create({
                data: {
                  email: user.email,
                  fullName: user.name || 'Google User',
                  password: '',
                  cart: {
                    create: {},
                  },
                },
                include: {
                  cart: true,
                },
              })

              if (user && googleUser) {
                user.id = googleUser.id
              }

              console.log(
                `Successfully created new user via Google auth: ${googleUser.id}`
              )
            } catch (createError) {
              console.error('Error creating user via Google auth:', createError)
              return false
            }
          } else {
            user.id = existingUser.id

            try {
              const userCart = await prisma.cart.findUnique({
                where: { userId: existingUser.id },
              })

              if (!userCart) {
                await prisma.cart.create({
                  data: { userId: existingUser.id },
                })
                console.log(
                  `Created cart for existing Google user: ${existingUser.id}`
                )
              }
            } catch (cartError) {
              console.error(
                'Error checking/creating cart for existing user:',
                cartError
              )
            }
          }

          return true
        } catch (error) {
          console.error('Error during Google sign in:', error)
          return false
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      if (token.email && !token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
          })

          if (dbUser) {
            token.id = dbUser.id
            token.role = dbUser.role
            token.name = dbUser.fullName
          }
        } catch (error) {
          console.error('Error fetching user data for JWT:', error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
