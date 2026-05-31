import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { facultyMembers } from '../data/siteData';

const timeline = [
  { year: '2010', title: 'Foundation', desc: 'Al-Imra International University established with a vision for excellence in East Africa.' },
  { year: '2015', title: 'Global Expansion', desc: 'International partnerships with 20+ universities across Europe, Asia, and the Americas.' },
  { year: '2020', title: 'Research Institute', desc: 'Launch of the $12M AI Innovation Hub and Health Sciences Research Center.' },
  { year: '2024', title: 'Accreditation Milestone', desc: 'Full international accreditation by leading education bodies.' },
  { year: '2026', title: 'World-Class Status', desc: 'Ranked among top emerging universities in East Africa with 12,500+ students.' },
];

const values = [
  { title: 'Excellence', desc: 'Pursuing the highest standards in teaching, research, and student outcomes.', icon: '⭐' },
  { title: 'Integrity', desc: 'Ethical conduct in all academic, research, and professional endeavors.', icon: '🛡️' },
  { title: 'Innovation', desc: 'Embracing creativity, technology, and forward-thinking solutions.', icon: '💡' },
  { title: 'Inclusion', desc: 'Welcoming diverse perspectives from 42 countries across the globe.', icon: '🌐' },
];

const achievements = [
  { stat: '12,500+', label: 'Students Enrolled' },
  { stat: '48+', label: 'Degree Programs' },
  { stat: '94%', label: 'Employment Rate' },
  { stat: '180+', label: 'Research Projects' },
];

export default function About() {
  return (
    <div className="page-enter">
      <PageHero badge="About AIU" title="Our Legacy of Excellence" subtitle="Building leaders, advancing knowledge, transforming communities since 2010." />

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-8">
            <h3 className="font-display text-2xl text-aiu-green mb-4">Our Mission</h3>
            <p className="text-theme-secondary leading-relaxed">To provide world-class education that empowers students with knowledge, skills, and ethical values to excel in a rapidly evolving global society and contribute meaningfully to their communities.</p>
          </div>
          <div className="glass rounded-3xl p-8">
            <h3 className="font-display text-2xl text-aiu-blue mb-4">Our Vision</h3>
            <p className="text-theme-secondary leading-relaxed">To be the leading international university in Africa, recognized globally for academic excellence, research innovation, and transformative societal impact.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((a) => (
            <div key={a.label} className="glass rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-aiu-gold">{a.stat}</p>
              <p className="mt-1 text-sm text-theme-muted">{a.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Values" title="Core Values" />
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass rounded-2xl p-6 text-center">
                <span className="text-4xl">{v.icon}</span>
                <h4 className="mt-3 font-display text-xl text-aiu-gold">{v.title}</h4>
                <p className="mt-2 text-sm text-theme-muted">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-theme-secondary/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="History" title="Our Journey" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-aiu-green via-aiu-blue to-aiu-gold" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-16 pb-10 last:pb-0">
                <div className="absolute left-4 w-4 h-4 rounded-full bg-aiu-green border-4 border-[var(--bg-primary)]" />
                <div className="glass rounded-2xl p-6">
                  <span className="text-aiu-gold font-bold text-lg">{item.year}</span>
                  <h4 className="font-display text-xl mt-1 text-theme">{item.title}</h4>
                  <p className="text-theme-muted mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Leadership" title="University Leadership" />
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'Prof. Hassan Ali Mohamed', role: 'Chancellor', image: '/c.jpeg' },
              { name: 'Eng. Mohamed Ali Abdi', role: 'Vice Chancellor', image: '/b.jpeg' },
              { name: 'Mr. Mohamed Gure Rooble', role: 'Academic Director', image: '/aiu-logo.png' },
              { name: 'Eng. Abdisamad Omar Mohamed', role: 'Exam & Registrar Director', image: '/A.png' },
            ].map((l) => (
              <div key={l.name} className="glass rounded-2xl p-6 text-center hover:glow-green transition-shadow">
                <div className="mb-3 flex justify-center"><img src={l.image} alt={l.name} className="h-16 w-16 rounded-full object-cover" /></div>
                <h4 className="font-semibold text-theme">{l.name}</h4>
                <p className="text-sm text-aiu-green">{l.role}</p>
              </div>
            ))}
          </div>
          <SectionHeading label="Faculty" title="Distinguished Faculty" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyMembers.map((f) => (
              <div key={f.name} className="glass rounded-2xl p-5">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-aiu-green to-aiu-blue flex items-center justify-center text-white font-bold text-sm">
                  {f.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <h4 className="mt-3 font-semibold text-theme">{f.name}</h4>
                <p className="text-xs text-aiu-green">{f.title}</p>
                <p className="text-xs text-theme-muted mt-1">{f.faculty}</p>
                <p className="text-xs text-aiu-gold mt-2">Research: {f.research}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
