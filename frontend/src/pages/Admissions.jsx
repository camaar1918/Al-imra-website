import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { admissionSteps } from '../data/siteData';

const faqs = [
  { q: 'When is the application deadline?', a: 'Applications for Fall 2026 close on August 15, 2026.' },
  { q: 'Are scholarships available?', a: 'Yes — merit-based and need-based scholarships up to 100% tuition.' },
  { q: 'Can international students apply?', a: 'Absolutely. We welcome students from 40+ countries.' },
];

export default function Admissions() {
  return (
    <>
      <PageHero badge="Admissions" title="Begin Your AIU Journey" subtitle="Simple, transparent admission process for ambitious students worldwide." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Process" title="How to Apply" />
          <div className="grid md:grid-cols-5 gap-4">
            {admissionSteps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aiu-green text-white font-bold">{s.step}</span>
                <h4 className="mt-4 font-semibold">{s.title}</h4>
                <p className="mt-2 text-xs text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/apply">Start Application</Button>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-aiu-dark-2/50">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-4 group">
                <summary className="cursor-pointer font-medium text-aiu-gold">{f.q}</summary>
                <p className="mt-3 text-white/70 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
