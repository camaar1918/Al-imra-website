import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, BookOpen, Users, Award, Newspaper, Camera, ExternalLink } from 'lucide-react';
import CinematicHero from '../components/home/CinematicHero';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { whyChoose, testimonials, partners, newsArticles, campusLife, successStories, galleryItems } from '../data/siteData';
import api from '../api/client';

export default function Home() {
  const revealRef = useScrollReveal();
  const [programs, setPrograms] = useState([]);
  const [stats, setStats] = useState(null);
  const [galleryHighlights, setGalleryHighlights] = useState([]);

  const shuffleGallery = () => {
    const mixed = [...galleryItems].sort(() => Math.random() - 0.5);
    setGalleryHighlights(mixed.slice(0, 10));
  };

  useEffect(() => {
    api.get('/programs?featured=true')
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : [];
        setPrograms(data.slice(0, 3));
      })
      .catch(() => {});
    api.get('/stats').then((r) => setStats(r.data)).catch(() => {});
    shuffleGallery();

    const timer = window.setInterval(shuffleGallery, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const displayStats = stats
    ? [
        { label: 'Students', value: stats.students, suffix: '+' },
        { label: 'Programs', value: stats.programs, suffix: '+' },
        { label: 'Faculty', value: stats.faculty, suffix: '+' },
        { label: 'Countries', value: stats.countries, suffix: '' },
      ]
    : null;

  return (
    <div className="page-enter">
      <CinematicHero stats={displayStats} />

      <section ref={revealRef} className="py-24 px-4 bg-theme">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Welcome" title="A University Without Borders" subtitle="Join a vibrant international community dedicated to knowledge, character, and global impact." />
          <div data-reveal className="glass rounded-3xl p-8 md:p-12">
            <p className="text-lg text-theme-secondary leading-relaxed">
              At Al-Imra International University (AIU), we believe education is the most powerful force for transformation. Our mission is to nurture curious minds, ethical leaders, and innovators who will shape a better tomorrow — across Somalia, Africa, and the world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Why AIU" title="Why Choose Al-Imra" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Array.isArray(whyChoose) ? whyChoose : []).map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="glass rounded-2xl p-6">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-theme">{item.title}</h3>
                <p className="mt-2 text-sm text-theme-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Programs" title="Featured Programs" />
          <div className="grid md:grid-cols-3 gap-6">
            {(Array.isArray(programs) && programs.length ? programs : [
              { slug: 'bsc-computer-science', name: 'BSc Computer Science', faculty: 'Computer Science', description: 'AI, cybersecurity, and software engineering tracks.' },
              { slug: 'bsc-medicine', name: 'BSc Medicine & Surgery', faculty: 'Health Sciences', description: 'World-class medical education with clinical rotations.' },
              { slug: 'msc-artificial-intelligence', name: 'MSc Artificial Intelligence', faculty: 'Computer Science', description: 'Advanced AI research with industry partnerships.' },
            ]).map((p) => (
              <Link key={p.slug || p.name} to="/undergraduate" className="group glass rounded-2xl p-6 hover:glow-blue transition-all">
                <GraduationCap className="h-8 w-8 text-aiu-green" />
                <h3 className="mt-4 font-display text-xl font-semibold text-theme group-hover:text-aiu-green">{p.name}</h3>
                <p className="mt-2 text-sm text-theme-muted">{p.description || p.faculty}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-aiu-gold">Learn more <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-theme-secondary/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Success" title="Student Success Stories" />
          <div className="grid md:grid-cols-3 gap-6">
            {(Array.isArray(successStories) ? successStories : []).map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 border-l-4 border-aiu-green">
                <p className="text-theme-secondary italic">&ldquo;{s.story}&rdquo;</p>
                <p className="mt-4 font-semibold text-aiu-green">{s.name}</p>
                <p className="text-sm text-theme-muted">{s.program} · Class of {s.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading label="Research" title="Research Excellence" center={false} />
            <p className="text-theme-secondary mb-6">Pioneering discoveries in AI, health sciences, and sustainable development — with $50M+ in active research grants and 12 innovation laboratories.</p>
            <Button to="/research">Explore Research</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[BookOpen, Users, Award, GraduationCap].map((Icon, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <Icon className="mx-auto h-10 w-10 text-aiu-gold" />
                <p className="mt-2 font-semibold text-theme">{['180+ Projects', '320 Faculty', '50+ Awards', '12 Labs'][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Campus" title="Campus Life" />
          <div className="grid md:grid-cols-4 gap-6">
            {(Array.isArray(campusLife) ? campusLife : []).map((c) => (
              <div key={c.title} className="glass rounded-2xl p-6 text-center">
                <span className="text-3xl">{c.icon}</span>
                <h4 className="mt-3 font-semibold text-theme">{c.title}</h4>
                <p className="mt-2 text-sm text-theme-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-theme-secondary/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Gallery" title="Latest Gallery Highlights" subtitle="A refreshed mix of graduation, campus, and student-life moments from AIU’s recent albums." />
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
            {galleryHighlights.map((item, i) => (
              <motion.article key={`${item.title}-${i}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-3xl overflow-hidden hover:glow-green transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-aiu-green/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{item.category}</span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-white/80">{item.description}</p>
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/90">AIU</span>
                </div>
                <div className="p-5 flex items-center justify-between text-sm text-theme-muted">
                  <span className="inline-flex items-center gap-2"><Camera className="h-4 w-4 text-aiu-gold" /> AIU Gallery</span>
                  <span className="text-aiu-green">Fresh</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="News" title="Latest News & Events" />
          <div className="grid md:grid-cols-3 gap-6">
            {(Array.isArray(newsArticles) ? newsArticles.slice(0, 3) : []).map((n) => (
              <Link key={n.title} to="/media" className="glass rounded-2xl p-6 hover:glow-green transition-shadow group">
                <Newspaper className="h-6 w-6 text-aiu-blue" />
                <span className="text-xs text-aiu-gold mt-3 block">{n.category}</span>
                <h4 className="mt-2 font-display text-lg text-theme group-hover:text-aiu-green">{n.title}</h4>
                <p className="mt-2 text-sm text-theme-muted">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Stories" title="What Our Students Say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Array.isArray(testimonials) ? testimonials : []).map((t, i) => (
              <blockquote key={t.name} className="glass rounded-2xl p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aiu-green/20 text-sm font-bold text-aiu-green">{t.avatar}</div>
                <p className="mt-4 text-theme-secondary text-sm italic">&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-semibold text-aiu-green">{t.name}</p>
                  <p className="text-xs text-theme-muted">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

    

      <section className="py-24 px-4 bg-theme-secondary/40">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div className="glass rounded-3xl p-6 md:p-8">
            <SectionHeading label="Social" title="Latest from Facebook" subtitle="Follow AIU Somalia for the newest announcements, events, and campus moments." center={false} />
            <p className="text-theme-secondary mb-5">The feed below is linked directly to AIU Somalia’s Facebook page so visitors can stay up to date without leaving the homepage.</p>
            <div className="rounded-2xl border border-(--border-color) bg-theme p-3 shadow-inner">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAIUSomalia14&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="420"
                style={{ border: 'none', overflow: 'hidden', borderRadius: '16px' }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                title="AIU Somalia Facebook Page"
                loading="lazy"
              />
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <SectionHeading label="Stay close" title="Why this section matters" subtitle="A quick glance at what students and families can expect from AIU." center={false} />
            <ul className="space-y-4 text-theme-secondary">
              <li className="rounded-2xl border border-(--border-color) bg-theme/60 p-4">Recent campus news, research highlights, and outreach updates are posted in real time.</li>
              <li className="rounded-2xl border border-(--border-color) bg-theme/60 p-4">The gallery cards and Facebook feed keep the homepage dynamic, visual, and easy to scan.</li>
              <li className="rounded-2xl border border-(--border-color) bg-theme/60 p-4">Visitors can jump directly to the official Facebook page for deeper reading and engagement.</li>
            </ul>
            <div className="mt-6">
              <Button href="https://www.facebook.com/AIUSomalia14" variant="outline" className="w-full justify-center">Open Facebook Page <ExternalLink className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl text-center glass rounded-3xl p-12 glow-green">
          <h2 className="font-display text-3xl font-bold md:text-4xl text-theme">Ready to Begin Your Journey?</h2>
          <p className="mt-4 text-theme-secondary">Join thousands of students shaping the future at AIU.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/apply">Start Application</Button>
            <Button to="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
