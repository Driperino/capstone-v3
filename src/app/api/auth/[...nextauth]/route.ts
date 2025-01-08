import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

//all of a sudden this is causing the build to fail????

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
