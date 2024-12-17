import type { Metadata } from 'next';
import './globals.css';
import { ThemeProviderWrapper } from '@/components/theme/ThemeProviderWrapper';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/auth/SessionProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}