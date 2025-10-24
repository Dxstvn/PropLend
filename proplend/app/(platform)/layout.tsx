export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Platform navigation will go here */}
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
