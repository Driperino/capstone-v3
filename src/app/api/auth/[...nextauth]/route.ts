import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb'; // MongoDB connection utility

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Use MongoDB Adapter
  secret: process.env.NEXTAUTH_SECRET, // Required for encryption

  session: {
    strategy: 'jwt', // Use JWT for stateless sessions
  },

  callbacks: {
    // Redirect Callback
    async redirect({ url, baseUrl }) {
      if (url === '/api/auth/signout') {
        // Redirect to the home page after logout
        return `${baseUrl}/`;
      }
      // Default redirect to dashboard after login
      return `${baseUrl}/dashboard`;
    },

    // Session Callback - Attach user ID to session
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    // JWT Callback - Pass user ID to JWT
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
