import { useEffect, useState } from 'react';
import { Rocket, Bell, Sun, Moon, LogIn } from 'lucide-react';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('overview')} className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
          <Rocket className="h-5 w-5 text-blue-600" />
          <span>PMS</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          <button onClick={() => scrollTo('overview')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Overview</button>
          <button onClick={() => scrollTo('users')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Users</button>
          <button onClick={() => scrollTo('features')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Features</button>
          <button onClick={() => scrollTo('process')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Process</button>
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={() => setDark(v => !v)} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="relative">
            <button onClick={() => setNotifOpen(o => !o)} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 rounded-full" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg p-3">
                <p className="text-sm font-medium mb-2">Notifications</p>
                <div className="space-y-2 text-sm">
                  <p className="p-2 rounded-md bg-neutral-50 dark:bg-neutral-800">3 pending goal approvals</p>
                  <p className="p-2 rounded-md bg-neutral-50 dark:bg-neutral-800">Review cycle starts next week</p>
                </div>
              </div>
            )}
          </div>
          <button onClick={() => alert('Authentication coming soon in this demo')} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
