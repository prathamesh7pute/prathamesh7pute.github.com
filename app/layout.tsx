import './globals.css';
import Navbar from './components/Navbar';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Prathamesh Satpute',
    template: '%s',
  },
  description:
    'A full-stack engineer passionate about AI, web development and open source. Sharing insights on Agentic AI, web development and more.',
  keywords: [
    'Agentic AI',
    'TypeScript',
    'Python',
    'Kubernetes',
    'LLM',
    'Node.js',
    'Web Development',
    'Open Source',
  ],
  authors: [{ name: 'Prathamesh Satpute' }],
  creator: 'Prathamesh Satpute',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prathamesh7pute.github.com',
    title: 'Prathamesh Satpute',
    description:
      'A full-stack engineer passionate about AI, web development and open source. Sharing insights on Agentic AI, web development and more.',
    siteName: 'Prathamesh Satpute',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning because theme class on <html> may differ between
    // server and client while next-themes initializes. This prevents the
    // hydration mismatch warning. The visual theme still updates correctly.
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <div className="max-w-4xl mx-auto px-6 py-8 ">
          <ThemeProviderWrapper>
            <Navbar />
            {children}
          </ThemeProviderWrapper>
        </div>
      </body>
    </html>
  );
}
