import { useState } from 'react';
import { Bell, CheckCircle, Clock, Edit3, Send, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: 'Create users',
    desc: 'Admins add accounts and assign roles to control access.',
    icon: CheckCircle
  },
  {
    title: 'Set goals',
    desc: 'Managers and employees collaborate on measurable objectives.',
    icon: Edit3
  },
  {
    title: 'Track progress',
    desc: 'Monitor updates throughout the cycle and adjust as needed.',
    icon: Clock
  },
  {
    title: 'Review & approve',
    desc: 'Managers provide feedback and approve submissions.',
    icon: Send
  }
];

export default function ProcessSection() {
  const [current, setCurrent] = useState(1);
  const [notify, setNotify] = useState(false);

  return (
    <section id="process" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white">Process flow</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">A clear path from onboarding to annual review.</p>
          </div>
          <button onClick={() => setNotify(true)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Send reminder
          </button>
        </div>

        {notify && (
          <div className="mt-4 p-3 rounded-md border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-sm">
            Reminders sent to pending approvers.
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const active = idx <= current;
            return (
              <button key={s.title} onClick={() => setCurrent(idx)} className={`text-left p-5 rounded-xl border transition-colors ${active ? 'border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{s.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 mt-4 text-neutral-400" />
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Current stage</p>
          <h3 className="text-lg font-semibold mt-1">{steps[current].title}</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">{steps[current].desc}</p>
        </div>
      </div>
    </section>
  );
}
