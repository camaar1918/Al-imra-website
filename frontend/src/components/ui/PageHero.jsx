import { motion } from 'framer-motion';
import Particles from './Particles';

export default function PageHero({ title, subtitle, badge }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 hero-gradient">
      <Particles count={20} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-aiu-gold/40 bg-aiu-gold/10 px-4 py-1 text-sm font-medium text-aiu-gold"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl font-bold md:text-6xl text-theme"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-theme-secondary"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
