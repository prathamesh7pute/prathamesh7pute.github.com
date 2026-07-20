'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState } from 'react';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/useMounted';

import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface CodeBlockProps {
  children?: string | string[];
  language?: string;
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

  const rawCode = String(children || '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        aria-label={copied ? 'Code copied' : 'Copy code'}
        type="button"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : (
          <CopyIcon className="w-5 h-5" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        showLineNumbers
        customStyle={{ margin: 0, borderRadius: '0.5rem' }}
      >
        {rawCode}
      </SyntaxHighlighter>
    </div>
  );
}
