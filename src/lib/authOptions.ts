import { NextAuthOptions, Session } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { connectToDB } from './ConnectDB'
import bcrypt from 'bcryptjs'
import User, { IUser } from '@/models/User'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please fill the all required Fields')
        }
        try {
          await connectToDB()
          const user: IUser | null = await User.findOne({
            email: credentials?.email
          })
          if (!user) {
            throw new Error('User not found with this email')
          }
          if (!(await bcrypt.compare(credentials.password, user.password))) {
            throw new Error('Invalid Password')
          }
          if (!user.isVerified) {
            throw new Error('User is not verified')
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            address: user.address
          }
        } catch (error) {
          throw new Error(`Error while authorizing the user ${error}`)
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.email = user.email as string
        token.name = user.name as string
        token.role = user.role
      }
      return token
    },

    async session ({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
        session.user.name = token.name
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  theme: {
    colorScheme: 'light',
    brandColor: '#FBBF24',
    logo: '/logo.png'
  },
  events: {
    signIn: async (message) => {
      console.log('User signed in', message)
    }
  }
}
