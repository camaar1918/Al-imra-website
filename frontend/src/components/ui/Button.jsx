import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-aiu-green to-aiu-blue text-white hover:shadow-lg hover:shadow-aiu-green/30',
  gold: 'bg-aiu-gold text-aiu-dark font-semibold hover:brightness-110',
  outline: 'border border-[var(--border-color)] text-theme hover:bg-aiu-green/10 hover:border-aiu-green/50',
  ghost: 'text-aiu-green hover:bg-aiu-green/10',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${variants[variant]} ${className}`;

  const MotionComp = motion.div;
  const wrap = (node) => (
    <MotionComp whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
      {node}
    </MotionComp>
  );

  if (to) return wrap(<Link to={to} className={cls}>{children}</Link>);
  if (href) return wrap(<a href={href} className={cls} target="_blank" rel="noreferrer">{children}</a>);
  return wrap(
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
