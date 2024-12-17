import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      <p className="text-lg mb-6">
        ✅ This is a test page for:{' '}
        <strong>{process.env.NEXT_PUBLIC_ROUTE ?? 'Current Route'}</strong>
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
