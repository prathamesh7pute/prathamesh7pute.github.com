'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center p-4 border-b mb-12">
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
