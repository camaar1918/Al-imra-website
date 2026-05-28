import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { researchAreas, researchProjects, publications, centers } from '../data/siteData';

export default function Research() {
  return (
    <div className="page-enter">
      <PageHero badge="Research" title="Research & Innovation" subtitle="Pioneering discoveries that transform communities and industries worldwide." />

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Focus Areas" title="Research Domains" />
          <div className="grid md:grid-cols-3 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div key={area.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 text-center hover:glow-green transition-shadow">
                <span className="text-5xl">{area.icon}</span>
                <h4 className="mt-4 font-display text-xl text-aiu-green">{area.name}</h4>
                <p className="mt-2 text-sm text-theme-muted">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Projects" title="Active Research Projects" />
          <div className="grid md:grid-cols-2 gap-6">
            {researchProjects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, x: i % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 border-l-4 border-aiu-blue">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs rounded-full bg-aiu-green/15 text-aiu-green px-3 py-1">{p.area}</span>
                  <span className="text-xs text-aiu-gold font-semibold">{p.funding}</span>
                </div>
                <h4 className="mt-3 font-display text-lg text-theme">{p.title}</h4>
                <p className="mt-2 text-sm text-theme-muted">Lead: {p.lead}</p>
                <span className="mt-3 inline-block text-xs text-aiu-blue">{p.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Publications" title="Recent Publications" />
          <div className="grid md:grid-cols-2 gap-4">
            {publications.map((pub) => (
              <div key={pub.title} className="glass rounded-xl p-5">
                <span className="text-xs text-aiu-gold">{pub.year} · {pub.category}</span>
                <h4 className="mt-2 font-medium text-theme">{pub.title}</h4>
                <p className="text-sm text-aiu-green mt-1">{pub.authors}</p>
                <p className="text-xs text-theme-muted mt-1">{pub.journal}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button to="/publications">View All Publications</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-theme-secondary/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Centers" title="Innovation Centers" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.slice(0, 3).map((c) => (
              <div key={c.name} className="glass rounded-2xl p-6">
                <h4 className="font-display text-lg text-aiu-gold">{c.name}</h4>
                <p className="mt-2 text-sm text-theme-muted">{c.focus}</p>
                <p className="mt-2 text-xs text-aiu-green">Director: {c.director}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button to="/centers">All Centers</Button>
            <Button to="/conferences" variant="outline">Conferences</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
