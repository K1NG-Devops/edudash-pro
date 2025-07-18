import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

// We'll implement this when we set up the database
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from './db';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // We'll add this when we set up the database
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: Replace with actual database lookup when we set up the database
        // For now, we'll use a mock user for development
        const mockUser = {
          id: '1',
          email: 'admin@edudash.com',
          password: await bcrypt.hash('admin123', 10), // admin123
          name: 'Admin User',
          role: 'ADMIN',
        };

        if (credentials.email === mockUser.email) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            mockUser.password
          );

          if (isPasswordValid) {
            return {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Types for NextAuth
declare module 'next-auth' {
  interface User {
    role?: string;
  }
  interface Session {
    user: User & {
      id: string;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
