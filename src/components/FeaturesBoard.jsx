import { useMemo, useState } from 'react';
import { Calendar, BarChart3, FileText, Target, Pause, Play, Send, Plus, Trash2 } from 'lucide-react';

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium border ${active ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
    >
      {children}
    </button>
  );
}

export default function FeaturesBoard() {
  const [tab, setTab] = useState('goals');
  const [running, setRunning] = useState(false);
  const [notified, setNotified] = useState(false);

  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ description: '', targetDate: '', weight: 10 });

  const totalWeight = useMemo(() => goals.reduce((sum, g) => sum + Number(g.weight || 0), 0), [goals]);
  const overWeight = totalWeight + Number(form.weight || 0) > 100;

  const addGoal = () => {
    if (!form.description || !form.targetDate) return;
    if (overWeight) return;
    setGoals(prev => [...prev, { ...form, id: crypto.randomUUID() }]);
    setForm({ description: '', targetDate: '', weight: 10 });
  };

  const removeGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));

  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white">Features</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">Plan goals, track performance, collect feedback, and review outcomes.</p>
          </div>
          <div className="flex items-center gap-2">
            <TabButton active={tab === 'goals'} onClick={() => setTab('goals')}>Goal setting</TabButton>
            <TabButton active={tab === 'tracking'} onClick={() => setTab('tracking')}>Performance tracking</TabButton>
            <TabButton active={tab === 'feedback'} onClick={() => setTab('feedback')}>Feedback</TabButton>
            <TabButton active={tab === 'reporting'} onClick={() => setTab('reporting')}>Reporting</TabButton>
          </div>
        </div>

        {/* Goals Tab */}
        {tab === 'goals' && (
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="font-semibold">Create goal</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Collaboratively define objectives and ensure plan weight stays within 100%.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-neutral-600 dark:text-neutral-300">Description</label>
                  <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" placeholder="e.g., Increase NPS to 60" />
                </div>
                <div>
                  <label className="text-sm text-neutral-600 dark:text-neutral-300">Target date</label>
                  <input type="date" value={form.targetDate} onChange={(e) => setForm({ ...form, targetDate: e.target.value })} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-neutral-600 dark:text-neutral-300">Weight (%)</label>
                  <input type="number" min={0} max={100} value={form.weight} onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm" />
                </div>
              </div>
              {overWeight && (
                <div className="mt-3 p-2.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-900 text-sm">
                  Total weight cannot exceed 100%.
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <button onClick={addGoal} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add goal
                </button>
                <button onClick={() => setForm({ description: '', targetDate: '', weight: 10 })} className="px-3 py-2 rounded-md border text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Reset</button>
              </div>

              <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Goal plan</h4>
                  <span className={`text-sm ${totalWeight > 100 ? 'text-rose-600' : 'text-neutral-500 dark:text-neutral-400'}`}>Total weight: {totalWeight}%</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {goals.length === 0 && (
                    <li className="text-sm text-neutral-500 dark:text-neutral-400">No goals yet. Add your first goal above.</li>
                  )}
                  {goals.map(g => (
                    <li key={g.id} className="p-3 rounded-md bg-neutral-50 dark:bg-neutral-800/60 flex items-center gap-3">
                      <Target className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{g.description}</p>
                        <p className="text-xs text-neutral-500">Due {g.targetDate} • Weight {g.weight}%</p>
                      </div>
                      <button onClick={() => removeGoal(g.id)} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"><Trash2 className="h-4 w-4" /></button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => alert('Submitted for approval')} className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Submit for approval
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <h4 className="font-semibold">Review period</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Define date ranges for each cycle.</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => alert('Review period set to Jan–Dec')} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Set to Jan–Dec</button>
                  <button onClick={() => alert('Deadline extended by 7 days')} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Extend deadline</button>
                </div>
              </div>
              <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div>
                    <h4 className="font-semibold">Run goal process</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Manually trigger or schedule execution.</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => setRunning(r => !r)} className={`px-3 py-1.5 rounded-md text-sm text-white flex items-center gap-2 ${running ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {running ? 'Pause' : 'Run now'}
                  </button>
                  <button onClick={() => setNotified(true)} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Notify employees</button>
                </div>
                {notified && (
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Notifications sent successfully.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {tab === 'tracking' && (
          <div className="mt-8 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5" />
              <div>
                <h4 className="font-semibold">Performance tracking</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Real-time updates on progress from employees and managers.</p>
              </div>
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Goals on track', value: 12, color: 'text-emerald-600' },
                { label: 'At risk', value: 3, color: 'text-amber-600' },
                { label: 'Off track', value: 1, color: 'text-rose-600' }
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                  <p className="text-2xl font-semibold {s.color}">{s.value}</p>
                  <p className="text-sm text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {tab === 'feedback' && (
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
              <h4 className="font-semibold">Collect feedback</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Request and provide structured feedback.</p>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => alert('Feedback requested from peers')} className="px-3 py-1.5 rounded-md border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Request peer feedback</button>
                <button onClick={() => alert('Manager feedback submitted')} className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Submit manager feedback</button>
              </div>
            </div>
            <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
              <h4 className="font-semibold">Approval queue</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Approve or return employee requests.</p>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => alert('Approved #1245')} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Approve</button>
                <button onClick={() => alert('Returned to employee for edits')} className="px-3 py-1.5 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">Return</button>
              </div>
            </div>
          </div>
        )}

        {/* Reporting Tab */}
        {tab === 'reporting' && (
          <div className="mt-8 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900">
            <h4 className="font-semibold">Reporting and analytics</h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Build reports to support decisions.</p>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <button onClick={() => alert('Exported performance summary')} className="p-4 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left">
                Export performance summary
              </button>
              <button onClick={() => alert('Downloaded goal completion report')} className="p-4 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left">
                Goal completion report
              </button>
              <button onClick={() => alert('Shared calibration insights')} className="p-4 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left">
                Calibration insights
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
