import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-aiu-dark">
      <motion.img
        src="/aiu-logo.png"
        alt="AIU"
        className="h-24 w-24"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-aiu-green via-aiu-blue to-aiu-gold"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '50%' }}
        />
      </motion.div>
      <p className="mt-4 text-sm text-white/50">Loading excellence...</p>
    </div>
  );
}
