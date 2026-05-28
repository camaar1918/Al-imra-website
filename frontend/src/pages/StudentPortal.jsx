import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, ClipboardList, User, Bell, BarChart3, LogOut } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'results', label: 'Results', icon: ClipboardList },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function StudentPortal() {
  const { user, login, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('student@aiu.edu');
  const [password, setPassword] = useState('Student@123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/students/dashboard').then((r) => setData(r.data)).catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch {
      setError('Invalid credentials. Demo: student@aiu.edu / Student@123');
    }
  };

  if (authLoading) return <PageHero title="Loading Portal..." />;

  if (!isAuthenticated) {
    return (
      <>
        <PageHero badge="Portal" title="Student Portal" subtitle="Access your courses, results, and campus services." />
        <section className="py-20 px-4">
          <form onSubmit={handleLogin} className="mx-auto max-w-md glass rounded-3xl p-8 space-y-4">
            <h3 className="font-display text-xl text-center text-theme">Sign In</h3>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3" placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3" placeholder="Password" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-aiu-green py-3 font-medium text-white">Login</button>
            <p className="text-xs text-center text-theme-muted">Demo: student@aiu.edu / Student@123</p>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero badge={`Welcome, ${user?.name}`} title="Student Dashboard" subtitle="Your academic hub at AIU." />
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 glass rounded-2xl p-4 h-fit">
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id)} className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${tab === id ? 'bg-aiu-green/20 text-aiu-green' : 'hover:bg-white/5'}`}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </nav>
            <button onClick={() => { logout(); navigate('/'); }} className="mt-4 w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-xl">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </aside>
          <div className="flex-1 glass rounded-2xl p-6 min-h-[400px]">
            {tab === 'dashboard' && data && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-aiu-green/10 p-4"><p className="text-sm text-white/50">Attendance</p><p className="text-2xl font-bold text-aiu-green">{data.attendance.percentage}%</p></div>
                <div className="rounded-xl bg-aiu-blue/10 p-4"><p className="text-sm text-white/50">Courses</p><p className="text-2xl font-bold">{data.courses.length}</p></div>
                <div className="rounded-xl bg-aiu-gold/10 p-4"><p className="text-sm text-white/50">Latest GPA</p><p className="text-2xl font-bold text-aiu-gold">{data.results[0]?.gpa}</p></div>
              </div>
            )}
            {tab === 'courses' && data?.courses.map((c) => (
              <div key={c.code} className="border-b border-white/10 py-3 flex justify-between">
                <span><strong>{c.code}</strong> — {c.name}</span>
                <span className="text-aiu-green">{c.credits} cr</span>
              </div>
            ))}
            {tab === 'timetable' && data?.timetable.map((t, i) => (
              <div key={i} className="py-2 flex gap-4 text-sm"><span className="text-aiu-gold w-24">{t.day}</span><span>{t.time}</span><span>{t.course}</span><span className="text-white/50">{t.room}</span></div>
            ))}
            {tab === 'results' && data?.results.map((r, i) => (
              <div key={i} className="py-3 flex justify-between border-b border-white/10"><span>{r.semester}</span><span className="text-aiu-green font-bold">GPA {r.gpa}</span></div>
            ))}
            {tab === 'notices' && data?.notices.map((n, i) => (
              <div key={i} className="py-3 border-b border-white/10"><p className="font-medium">{n.title}</p><p className="text-xs text-white/50">{new Date(n.date).toLocaleDateString()}</p></div>
            ))}
            {tab === 'profile' && (
              <dl className="space-y-2">
                <div><dt className="text-white/50">Name</dt><dd>{data?.profile?.fullName || user?.name}</dd></div>
                <div><dt className="text-white/50">Student ID</dt><dd>{data?.profile?.studentId}</dd></div>
                <div><dt className="text-white/50">Program</dt><dd>{data?.profile?.program}</dd></div>
              </dl>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
