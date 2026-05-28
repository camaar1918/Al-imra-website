import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import api from '../api/client';
import Button from '../components/ui/Button';

export default function ProgramsPage({ level, title, subtitle }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/programs?level=${level}`)
      .then((r) => setPrograms(r.data))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, [level]);

  return (
    <>
      <PageHero badge="Programs" title={title} subtitle={subtitle} />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <article key={p.id} className="glass rounded-2xl p-6 flex flex-col hover:glow-blue transition-shadow">
                  <span className="text-xs uppercase tracking-wider text-aiu-gold">{p.faculty}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-white/60 flex-1">{p.description}</p>
                  <div className="mt-4 flex justify-between text-sm text-white/50">
                    <span>{p.duration}</span>
                    <span>{p.credits} credits</span>
                  </div>
                  <p className="mt-2 text-aiu-green font-semibold">${p.semesterFee}/semester</p>
                  <Button to="/apply" className="mt-4 !text-xs !py-2">Apply</Button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
