import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import Button from '../ui/Button';
import AnimatedCounter from '../ui/AnimatedCounter';
import Particles from '../ui/Particles';


const VIDEOS = [
  '/assets/SAX AL IMRA.mp4',
];

const headlines = ['Excellence', 'Innovation', 'Global Impact'];

export default function CinematicHero({ stats }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => setHeadlineIdx((i) => (i + 1) % headlines.length), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnd = () => setVideoIndex((i) => (i + 1) % VIDEOS.length);
    vid.addEventListener('ended', onEnd);
    return () => vid.removeEventListener('ended', onEnd);
  }, [videoIndex]);

  useEffect(() => {
    gsap.from('.hero-stat', { opacity: 0, y: 40, stagger: 0.15, duration: 1, delay: 0.8, ease: 'power3.out' });
  }, []);

  const displayStats = stats || [
    { label: 'Students', value: 12500, suffix: '+' },
    { label: 'Programs', value: 48, suffix: '+' },
    { label: 'Faculty', value: 320, suffix: '+' },
    { label: 'Countries', value: 42, suffix: '' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={videoIndex}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover scale-105"
          src={VIDEOS[videoIndex]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay)] via-[var(--hero-overlay)] to-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-aiu-dark/80 via-transparent to-aiu-dark/60 dark:from-aiu-dark/80 light:from-white/70" />
      </motion.div>

      <Particles count={35} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_75%)] z-[1]" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-36 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-aiu-green/40 bg-aiu-green/15 px-4 py-2 text-sm font-medium text-aiu-green mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aiu-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aiu-green" />
              </span>
              Admissions Open 2026–2027
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-7xl text-theme"
            >
              Where{' '}
              <motion.span
                key={headlineIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="gradient-text inline-block"
              >
                {headlines[headlineIdx]}
              </motion.span>
              <br />
              <span className="text-aiu-gold">Begins at AIU</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 text-lg md:text-xl text-theme-secondary max-w-xl leading-relaxed"
            >
              Al-Imra International University — a cinematic journey through world-class education, cutting-edge research labs, and a vibrant global campus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button to="/apply">Apply Now <ArrowRight className="h-4 w-4" /></Button>
              <Button to="/about" variant="outline">
                <Play className="h-4 w-4" /> Virtual Tour
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 80 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative animate-float">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-aiu-green via-aiu-blue to-aiu-gold blur-3xl opacity-50" />
              <div className="relative glass-strong rounded-full p-6 glow-green">
                <img src="/aiu-logo.png" alt="AIU" className="h-48 w-48 md:h-64 md:w-64" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayStats.map((s) => (
            <div key={s.label} className="hero-stat glass rounded-2xl p-5 text-center border border-aiu-green/20">
              <p className="text-2xl md:text-3xl font-bold text-aiu-gold">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-theme-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-theme-muted"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-6 rounded-full border-2 border-aiu-green/50 flex justify-center pt-2">
          <div className="h-2 w-1 rounded-full bg-aiu-green animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
