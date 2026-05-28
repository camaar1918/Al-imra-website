import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import api from '../api/client';

export default function Conferences() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/media/events').then((r) => setEvents(r.data.filter((e) => e.category === 'Conference' || e.featured))).catch(() => {});
  }, []);

  return (
    <>
      <PageHero badge="Events" title="Conferences & Symposia" subtitle="Join global conversations at AIU." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl space-y-6">
          {(events.length ? events : [{ title: 'International Research Summit 2026', description: 'Leading researchers from 40+ countries.', location: 'Main Auditorium', startDate: '2026-09-15' }]).map((e, i) => (
            <div key={e.id || i} className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="rounded-xl bg-aiu-blue/20 px-4 py-3 text-center min-w-[100px]">
                <p className="text-2xl font-bold text-aiu-gold">{new Date(e.startDate).getDate()}</p>
                <p className="text-xs uppercase">{new Date(e.startDate).toLocaleString('default', { month: 'short' })}</p>
              </div>
              <div>
                <h3 className="font-display text-xl">{e.title}</h3>
                <p className="text-white/60 mt-1">{e.description}</p>
                {e.location && <p className="text-sm text-aiu-green mt-2">{e.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
