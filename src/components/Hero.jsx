import { useState } from 'react';
import { ArrowRight, Play, Shield, Target } from 'lucide-react';

export default function Hero() {
  const [showDemoMsg, setShowDemoMsg] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="overview" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-neutral-950 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              <Shield className="h-3.5 w-3.5" />
              Secure and scalable
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Performance Management System
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
              Set objectives, track progress, collect feedback, and run appraisals — all in one elegant workspace designed for clarity and collaboration.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo('features')} className="px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
                Explore features
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => setShowDemoMsg(true)} className="px-5 py-2.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium hover:opacity-90 flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start a demo
              </button>
            </div>
            {showDemoMsg && (
              <div className="mt-4 p-3 rounded-md border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                <Target className="h-4 w-4 mt-0.5" />
                <p>Demo mode enabled. Try creating goals, switching tabs, and opening notifications.</p>
                <button onClick={() => setShowDemoMsg(false)} className="ml-auto text-blue-700 dark:text-blue-300 underline">Dismiss</button>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800" />
              </div>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">Clean, modular UI components for goals, reviews, and analytics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
