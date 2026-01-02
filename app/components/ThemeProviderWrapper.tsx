'use client';

import { ThemeProvider } from 'next-themes';

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client-only wrapper for next-themes ThemeProvider so the server layout
  // doesn't attempt to render the theme state on the server and cause
  // hydration mismatches.
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
