import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Check if it's a logout or login
      if (url === '/api/auth/signout') {
        // Redirect to the home page after logout
        return `${baseUrl}/`;
      }
      // Default redirect to dashboard after login
      return `${baseUrl}/dashboard`;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
