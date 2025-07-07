'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      updateHtmlClass(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      updateHtmlClass(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const updateHtmlClass = (theme: 'light' | 'dark') => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    updateHtmlClass(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-500">
      <header className="bg-zinc-100 dark:bg-zinc-900 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Trainoo</h1>
          <nav className="flex gap-4 text-sm items-center">
            <Link href="/" className="hover:text-purple-400 transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/stats" className="hover:text-purple-400 transition-colors duration-300">
              Statystyki
            </Link>
            <Link href="/settings" className="hover:text-purple-400 transition-colors duration-300">
              Ustawienia
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="Przełącz motyw"
              aria-pressed={theme === 'dark'}
              className="ml-4 p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
              title={theme === 'dark' ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            >
              {theme === 'dark' ? (
                <span role="img" aria-label="Moon">
                  🌙
                </span>
              ) : (
                <span role="img" aria-label="Sun">
                  ☀️
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-10 space-y-6">{children}</main>
    </div>
  );
}
