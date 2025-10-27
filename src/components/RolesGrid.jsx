import { useState } from 'react';
import { Shield, Settings, User, Users, Building2, CheckCircle2 } from 'lucide-react';

const roles = [
  {
    key: 'sysadmin',
    title: 'System Administrator',
    desc: 'Manage user accounts, roles, and permissions to keep your workspace secure.',
    icon: Shield,
    accent: 'from-blue-500/10 to-blue-500/0 border-blue-200 dark:border-blue-900'
  },
  {
    key: 'pmadmin',
    title: 'Performance Management Admin',
    desc: 'Configure plans, review periods, and organization-wide settings.',
    icon: Settings,
    accent: 'from-amber-500/10 to-amber-500/0 border-amber-200 dark:border-amber-900'
  },
  {
    key: 'manager',
    title: 'Manager',
    desc: 'Set goals, provide timely feedback, and run performance reviews.',
    icon: Users,
    accent: 'from-emerald-500/10 to-emerald-500/0 border-emerald-200 dark:border-emerald-900'
  },
  {
    key: 'employee',
    title: 'Employee',
    desc: 'View objectives, track progress, and submit self-evaluations.',
    icon: User,
    accent: 'from-purple-500/10 to-purple-500/0 border-purple-200 dark:border-purple-900'
  },
  {
    key: 'hr',
    title: 'HR Personnel',
    desc: 'Oversee compliance and support managers and employees throughout cycles.',
    icon: Building2,
    accent: 'from-rose-500/10 to-rose-500/0 border-rose-200 dark:border-rose-900'
  }
];

export default function RolesGrid() {
  const [active, setActive] = useState('manager');
  const ActiveIcon = roles.find(r => r.key === active)?.icon || User;

  return (
    <section id="users" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white">System target users</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">Clear roles keep responsibilities focused and workflows efficient.</p>
          </div>
          <div className="flex items-center gap-2">
            {roles.map(r => (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                className={`px-3 py-1.5 rounded-full text-sm border ${active === r.key ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              >
                {r.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(({ key, title, desc, icon: Icon, accent }) => (
            <div key={key} className={`rounded-xl border ${accent} bg-gradient-to-b p-5 hover:shadow-sm transition-shadow`}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => setActive(key)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">View</button>
                <button onClick={() => alert(`${title}: quick actions executed`)} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Quick actions</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              <ActiveIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Active selection</p>
              <h4 className="font-semibold text-neutral-900 dark:text-white capitalize">{active.replace('-', ' ')}</h4>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Assign sample permissions
              </button>
              <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Open dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
