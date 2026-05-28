import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { publications } from '../data/siteData';

export default function Publications() {
  return (
    <div className="page-enter">
      <PageHero badge="Research" title="Publications" subtitle="Peer-reviewed research from AIU faculty and students worldwide." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <SectionHeading label="Journal Articles" title="Recent Publications" center={false} />
          <div className="space-y-5">
            {publications.map((p, i) => (
              <article key={p.title} className="glass rounded-2xl p-6 hover:glow-blue transition-shadow flex flex-col md:flex-row md:items-start gap-4">
                <div className="rounded-xl bg-aiu-blue/15 px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-aiu-gold">{p.year}</p>
                  <p className="text-[10px] uppercase text-theme-muted">{p.category}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-theme">{p.title}</h3>
                  <p className="text-sm text-aiu-green mt-2">{p.authors}</p>
                  <p className="text-sm text-theme-muted mt-1 italic">{p.journal}</p>
                  <button type="button" className="mt-3 text-sm text-aiu-blue hover:text-aiu-green transition-colors">Read Abstract →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
