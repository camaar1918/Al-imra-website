import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {label && (
        <span className="mb-3 inline-block rounded-full border border-aiu-green/40 bg-aiu-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-aiu-green">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl text-theme">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-theme-secondary ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
