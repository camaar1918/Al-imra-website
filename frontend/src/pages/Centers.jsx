import PageHero from '../components/ui/PageHero';
import { centers } from '../data/siteData';

export default function Centers() {
  return (
    <>
      <PageHero badge="Research" title="Research Centers" subtitle="Dedicated hubs for interdisciplinary discovery." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {centers.map((c) => (
            <div key={c.name} className="glass rounded-2xl p-8 group hover:scale-[1.02] transition-transform">
              <h3 className="font-display text-2xl text-aiu-green group-hover:text-aiu-gold transition-colors">{c.name}</h3>
              <p className="mt-4 text-white/70">{c.focus}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
