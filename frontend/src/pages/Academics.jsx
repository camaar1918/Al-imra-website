import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { faculties, courses, academicCalendar } from '../data/siteData';

const tabs = ['Faculties', 'Departments', 'Courses', 'Calendar', 'Learning'];

export default function Academics() {
  const [tab, setTab] = useState('Faculties');
  const [facultyFilter, setFacultyFilter] = useState('All');

  const allDepartments = faculties.flatMap((f) =>
    f.departments.map((d) => ({ name: d, faculty: f.name }))
  );

  const filteredCourses =
    facultyFilter === 'All'
      ? courses
      : courses.filter((c) => c.faculty.includes(facultyFilter.split(' ')[0]));

  return (
    <div className="page-enter">
      <PageHero badge="Academics" title="Academic Excellence" subtitle="Rigorous programs, world-class faculty, and an internationally recognized curriculum." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  tab === t ? 'bg-aiu-green text-white shadow-lg shadow-aiu-green/30' : 'glass text-theme-secondary hover:text-theme'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Faculties' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculties.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass rounded-2xl p-6">
                  <h3 className="font-display text-xl text-aiu-gold">{f.name}</h3>
                  <p className="mt-2 text-sm text-theme-muted">{f.programs} Programs</p>
                  <p className="mt-1 text-sm text-aiu-green">Dean: {f.dean}</p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {f.departments.slice(0, 2).map((d) => (
                      <span key={d} className="text-xs rounded-full bg-aiu-blue/15 text-aiu-blue px-2 py-0.5">{d}</span>
                    ))}
                    {f.departments.length > 2 && <span className="text-xs text-theme-muted">+{f.departments.length - 2} more</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'Departments' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allDepartments.map((d, i) => (
                <motion.div key={d.name + d.faculty} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-4 hover:border-aiu-green/40 border border-transparent transition-colors">
                  <h4 className="font-semibold text-theme">{d.name}</h4>
                  <p className="text-xs text-theme-muted mt-1">{d.faculty}</p>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'Courses' && (
            <>
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {['All', 'Computer', 'Health', 'Business', 'Engineering', 'Law'].map((f) => (
                  <button key={f} onClick={() => setFacultyFilter(f)} className={`rounded-full px-4 py-1.5 text-xs ${facultyFilter === f ? 'bg-aiu-blue text-white' : 'glass text-theme-muted'}`}>{f}</button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((c) => (
                  <div key={c.code} className="glass rounded-xl p-5 flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-aiu-green">{c.code}</span>
                      <h4 className="font-medium text-theme mt-1">{c.name}</h4>
                      <p className="text-xs text-theme-muted">{c.faculty}</p>
                    </div>
                    <span className="text-sm font-bold text-aiu-gold">{c.credits} cr</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'Calendar' && (
            <div className="max-w-2xl mx-auto space-y-4">
              {academicCalendar.map((term) => (
                <div key={term.term} className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h4 className="font-display text-lg text-aiu-blue">{term.term}</h4>
                  <p className="text-theme-secondary">{term.start} — {term.end}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'Learning' && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Blended Learning', desc: 'Combine in-person lectures with cutting-edge online modules and virtual labs.', icon: '💻' },
                { title: 'Research-Led Teaching', desc: 'Learn from faculty actively publishing in top international journals.', icon: '📚' },
                { title: 'Industry Partnerships', desc: 'Internships and capstone projects with Microsoft, Google, WHO, and more.', icon: '🤝' },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-8 text-center">
                  <span className="text-4xl">{item.icon}</span>
                  <h4 className="mt-4 font-display text-lg text-aiu-green">{item.title}</h4>
                  <p className="mt-2 text-sm text-theme-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-theme-secondary/50">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Programs" title="Explore Degree Programs" subtitle="48+ programs across undergraduate and postgraduate levels." />
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/undergraduate" className="glass rounded-full px-8 py-3 text-aiu-green font-medium hover:glow-green transition-shadow">Undergraduate →</a>
            <a href="/postgraduate" className="glass rounded-full px-8 py-3 text-aiu-blue font-medium hover:glow-blue transition-shadow">Postgraduate →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
