'use client';

import { usePathname } from 'next/navigation';

export default function PageTitle() {
  const pathname = usePathname(); // Get the current path

  // Extract page name from the path
  const pageName =
    pathname
      .split('/')
      .filter(Boolean) // Remove empty strings
      .pop() // Get the last segment
      ?.replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Home'; // Capitalize first letters

  return <h1 className="text-xl font-semibold text-primary">{pageName}</h1>;
}
