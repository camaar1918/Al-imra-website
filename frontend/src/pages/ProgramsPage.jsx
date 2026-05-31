import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import api from '../api/client';
import Button from '../components/ui/Button';
import { faculties } from '../data/siteData';

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

      <section className="pb-20 px-4 bg-theme-secondary/5">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Faculties"
            title="Six Undergraduate Faculties"
            subtitle="Browse every faculty supporting our bachelor programs with expert deans and strong academic departments."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((f) => (
              <article key={f.name} className="glass rounded-[2rem] p-6 hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-aiu-green/25">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-aiu-gold">{f.programs} Programs</span>
                  <span className="rounded-full bg-aiu-blue/10 px-3 py-1 text-xs font-semibold text-aiu-blue">{f.name.replace('Faculty of ', '')}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-theme">{f.name}</h3>
                <p className="mt-3 text-sm text-theme-muted">
                  Dean: <span className="text-aiu-green">{f.dean || 'TBD'}</span>
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.departments.map((dept) => (
                    <span key={dept} className="rounded-full bg-aiu-green/10 px-3 py-1 text-xs text-aiu-green">{dept}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
