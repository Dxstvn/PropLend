'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:bg-gray-950/95">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-navy-600 dark:text-navy-400 text-2xl font-bold">PropertyLend</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">{/* Navigation will go here */}</nav>

        <div className="flex items-center gap-4">{/* Wallet connect button will go here */}</div>
      </div>
    </header>
  );
}
