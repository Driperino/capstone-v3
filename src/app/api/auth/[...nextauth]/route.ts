import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

//nvm fixed....

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
