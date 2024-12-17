'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sprout } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { data: session } = useSession(); // Check session status
  const router = useRouter(); // For redirection

  const handleClick = () => {
    if (session?.user) {
      // User is authenticated, redirect to dashboard
      router.push('/dashboard');
    } else {
      // User is not authenticated, invoke signIn
      signIn();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
          <div className="flex items-center justify-center">
            <Sprout className="h-16 w-auto text-green-600" />
            Leaf Matrix
            <br /> Grow Smarter.
          </div>
        </h1>
        <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-300">
          Leaf Matrix is your ultimate plant care tracker. Monitor growth,
          receive reminders, and keep your plants happy and healthy.
        </p>

        {/* Login Call-to-Action */}
        <Button
          className={cn(
            'mt-6 px-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white'
          )}
          onClick={handleClick}
        >
          Get Started
        </Button>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white/75 py-4 text-center text-gray-500 dark:bg-gray-800/75 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Vincent Winkler. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
