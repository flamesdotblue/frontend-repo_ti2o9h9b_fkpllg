import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBoard from './components/FeaturesBoard';
import RolesGrid from './components/RolesGrid';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function App() {
  const steps = [
    { title: 'Create users', tip: 'Admins add accounts and assign roles.' },
    { title: 'Set goals', tip: 'Managers and employees collaborate.' },
    { title: 'Track progress', tip: 'Monitor updates and adjust as needed.' },
    { title: 'Annual review', tip: 'Summarize outcomes and set new goals.' },
  ];
  const [stage, setStage] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <Navbar />
      <main>
        <Hero />
        <RolesGrid />
        <FeaturesBoard />

        {/* Lightweight process flow preview */}
        <section id="process" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold">Process flow</h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">Navigate through the key stages of performance management.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setStage(s => Math.max(0, s - 1))} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />Prev
                </button>
                <button onClick={() => setStage(s => Math.min(steps.length - 1, s + 1))} className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 flex items-center gap-1">
                  Next<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-4 gap-4">
              {steps.map((st, idx) => (
                <button key={st.title} onClick={() => setStage(idx)} className={`text-left p-5 rounded-xl border transition-colors ${idx <= stage ? 'border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                  <p className="text-xs text-neutral-500">Step {idx + 1}</p>
                  <h4 className="mt-1 font-semibold">{st.title}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{st.tip}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Current stage</p>
              <h3 className="text-lg font-semibold mt-1">{steps[stage].title}</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{steps[stage].tip}</p>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => alert(`Approved items for ${steps[stage].title}`)} className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Approve sample</button>
                <button onClick={() => alert('Returned to employee for edits')} className="px-3 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">Return</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 dark:text-neutral-400">
          Built for clarity, collaboration, and continuous improvement.
        </div>
      </footer>
    </div>
  );
}

export default App;
