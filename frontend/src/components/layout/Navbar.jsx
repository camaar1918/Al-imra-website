import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    label: 'Academics',
    children: [
      { to: '/academics', label: 'Overview' },
      { to: '/undergraduate', label: 'Undergraduate' },
      { to: '/postgraduate', label: 'Postgraduate' },
    ],
  },
  {
    label: 'Admissions',
    children: [
      { to: '/admissions', label: 'Overview' },
      { to: '/admission-requirements', label: 'Requirements' },
      { to: '/program-fees', label: 'Program Fees' },
      { to: '/apply', label: 'Apply Now' },
    ],
  },
  {
    label: 'Research',
    children: [
      { to: '/research', label: 'Research' },
      { to: '/publications', label: 'Publications' },
      { to: '/conferences', label: 'Conferences' },
      { to: '/centers', label: 'Centers' },
    ],
  },
  { to: '/media', label: 'Media' },
  { to: '/verify-certificate', label: 'Verify' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const lastYRef = useRef(0);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastYRef.current;
      setScrolled(currentY > 10);
      setHidden(goingDown && currentY > 70);
      lastYRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong py-2 shadow-lg' : 'bg-transparent py-4'
      } ${hidden && !open ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/aiu-logo.png" alt="AIU Logo" className="h-12 w-12" width={48} height={48} loading="eager" />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-theme">Al-Imra</p>
            <p className="text-[10px] uppercase tracking-wider text-aiu-gold">International University</p>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-theme-secondary hover:bg-aiu-green/10 hover:text-theme">
                  {item.label} <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {dropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-full min-w-[200px] rounded-xl glass-strong p-2 shadow-xl"
                    >
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className="block rounded-lg px-4 py-2 text-sm text-theme-secondary hover:bg-aiu-green/20 hover:text-theme"
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive ? 'text-aiu-green' : 'text-theme-secondary hover:text-theme'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-theme-secondary hover:bg-aiu-green/10 hover:text-aiu-green"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button to="/portal" variant="gold" className="hidden sm:inline-flex !py-2 !px-4 text-xs">
            Student Portal
          </Button>
          <button className="lg:hidden rounded-lg p-2 hover:bg-white/10" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.flatMap((item) =>
                item.children
                  ? item.children.map((c) => (
                      <NavLink key={c.to} to={c.to} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 hover:bg-white/5">
                        {c.label}
                      </NavLink>
                    ))
                  : [
                      <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 hover:bg-white/5">
                        {item.label}
                      </NavLink>,
                    ]
              )}
              <Button to="/portal" variant="gold" className="mt-2 w-full">
                Student Portal
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
