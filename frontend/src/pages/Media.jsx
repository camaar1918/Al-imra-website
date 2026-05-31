import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Megaphone } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { newsArticles, events, galleryItems, pressReleases } from '../data/siteData';
import api from '../api/client';

const tabs = ['News', 'Events', 'Gallery', 'Videos', 'Press'];

const videos = [
  { title: 'Campus Virtual Tour 2026', duration: '4:32' },
  { title: 'Graduation Highlights 2025', duration: '6:15' },
  { title: 'AI Innovation Hub Launch', duration: '3:48' },
  { title: 'Student Life at AIU', duration: '5:20' },
];

export default function Media() {
  const [tab, setTab] = useState('News');
  const [apiNews, setApiNews] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);

  useEffect(() => {
    api.get('/media/news').then((r) => setApiNews(r.data)).catch(() => {});
    api.get('/media/events').then((r) => setApiEvents(r.data)).catch(() => {});
  }, []);

  const news = apiNews.length ? apiNews.map((n) => ({ title: n.title, excerpt: n.excerpt, date: n.createdAt, category: n.category || 'News' })) : newsArticles;
  const eventList = apiEvents.length ? apiEvents : events.map((e) => ({ title: e.title, description: e.location, startDate: e.date, location: e.location, category: e.type }));

  return (
    <div className="page-enter">
      <PageHero badge="Media" title="News & Media" subtitle="Stay connected with campus announcements, events, and stories." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 ${tab === t ? 'bg-aiu-green text-white' : 'glass text-theme-secondary'}`}>
                {t === 'News' && <Megaphone className="h-4 w-4" />}
                {t === 'Events' && <Calendar className="h-4 w-4" />}
                {t === 'Videos' && <Play className="h-4 w-4" />}
                {t}
              </button>
            ))}
          </div>

          {tab === 'News' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n, i) => (
                <motion.article key={n.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl overflow-hidden hover:glow-blue transition-shadow">
                  {n.image && (
                    <div className="h-44 overflow-hidden">
                      <img src={`/${n.image}`} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-aiu-gold uppercase">{n.category}</span>
                    <h3 className="mt-2 font-display text-lg text-theme">{n.title}</h3>
                    <p className="mt-2 text-sm text-theme-muted line-clamp-3">{n.excerpt}</p>
                    <p className="mt-3 text-xs text-theme-muted">{n.date ? new Date(n.date).toLocaleDateString() : ''}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {tab === 'Events' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {eventList.map((e, i) => (
                <motion.div key={e.title || i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5 flex gap-4 items-center">
                  <div className="rounded-xl bg-aiu-blue/20 px-4 py-3 text-center min-w-[72px]">
                    <p className="text-xl font-bold text-aiu-gold">{new Date(e.startDate || e.date).getDate()}</p>
                    <p className="text-[10px] uppercase text-theme-muted">{new Date(e.startDate || e.date).toLocaleString('default', { month: 'short' })}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-theme">{e.title}</h4>
                    <p className="text-sm text-theme-muted">{e.description || e.location}</p>
                    <span className="text-xs text-aiu-green mt-1 inline-block">{e.category || e.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'Gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((g, i) => (
                <motion.div key={g.title} whileHover={{ y: -6 }} className="glass rounded-3xl overflow-hidden shadow-xl">
                  <div className="relative h-72 overflow-hidden">
                    <img src={`/${g.image}`} alt={g.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-aiu-green/90 px-3 py-1 text-[11px] font-semibold uppercase text-white">{g.category}</span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-lg font-semibold text-white leading-snug">{g.title}</p>
                      <p className="mt-2 text-xs text-white/80">{g.description}</p>
                      {g.year && (
                        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/80">Class of {g.year}</p>
                      )}
                      {g.venue && (
                        <p className="mt-1 text-[11px] text-white/80">Venue: {g.venue}</p>
                      )}
                      {g.graduates && (
                        <p className="mt-1 text-[11px] text-white/80">Graduates: {g.graduates}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'Videos' && (
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((v) => (
                <div key={v.title} className="glass rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-aiu-dark to-aiu-blue/40 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <Play className="h-14 w-14 text-white relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-4 flex justify-between">
                    <h4 className="font-medium text-theme">{v.title}</h4>
                    <span className="text-xs text-theme-muted">{v.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Press' && (
            <div className="max-w-2xl mx-auto space-y-4">
              {pressReleases.map((pr) => (
                <div key={pr.title} className="glass rounded-xl p-5 border-l-4 border-aiu-gold">
                  <h4 className="font-medium text-theme">{pr.title}</h4>
                  <p className="text-xs text-theme-muted mt-2">{new Date(pr.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-3xl text-center glass rounded-3xl p-10">
          <SectionHeading title="Announcements" subtitle="Subscribe to receive official AIU announcements directly to your inbox." />
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="input-theme flex-1 rounded-full px-5 py-3" />
            <button type="submit" className="rounded-full bg-aiu-green px-6 py-3 text-white font-medium hover:brightness-110">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
