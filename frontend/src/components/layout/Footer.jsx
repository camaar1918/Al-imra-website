import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const links = {
  Academics: [
    { to: '/academics', label: 'Faculties' },
    { to: '/undergraduate', label: 'Undergraduate' },
    { to: '/postgraduate', label: 'Postgraduate' },
  ],
  Admissions: [
    { to: '/admissions', label: 'How to Apply' },
    { to: '/program-fees', label: 'Fees' },
    { to: '/apply', label: 'Apply Now' },
  ],
  Resources: [
    { to: '/research', label: 'Research' },
    { to: '/verify-certificate', label: 'Verify Certificate' },
    { to: '/portal', label: 'Student Portal' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-color)] bg-theme-secondary pt-16 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-aiu-green/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src="/aiu-logo.png" alt="AIU" className="h-14 w-14" />
              <div>
                <p className="font-display font-bold text-theme">Al-Imra International University</p>
                <p className="text-sm text-aiu-gold">Excellence • Innovation • Impact</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-theme-muted">
              Shaping global leaders through world-class education, groundbreaking research, and transformative community engagement.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="rounded-full border border-[var(--border-color)] p-2 text-theme-muted hover:border-aiu-green hover:text-aiu-green transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-aiu-gold">{title}</h4>
              <ul className="space-y-2">
                {items.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-theme-muted hover:text-aiu-green transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 font-semibold text-aiu-gold">Contact</h4>
            <ul className="space-y-3 text-sm text-theme-muted">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-aiu-green" /> Mogadishu, Somalia</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-aiu-green" /> +252 61 6655636</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-aiu-green" /> info@aiu.so | admissions@aiu.so</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-color)] pt-8 text-sm text-theme-muted md:flex-row">
          <p>© {new Date().getFullYear()} Al-Imra International University. All rights reserved.</p>
          <p>Developed by Qalin Coders</p>
        </div>
      </div>
    </footer>
  );
}
