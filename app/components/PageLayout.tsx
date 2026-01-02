interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
    </main>
  );
}
