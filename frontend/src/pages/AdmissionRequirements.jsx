import PageHero from '../components/ui/PageHero';

const reqs = {
  undergraduate: ['High school diploma or equivalent', 'Minimum GPA 2.5 / 60%', 'English proficiency (IELTS 5.5 or equivalent)', 'National ID / Passport', '2 recommendation letters'],
  postgraduate: ['Bachelor degree from accredited institution', 'Minimum GPA 3.0', 'Research proposal (for thesis programs)', 'CV and statement of purpose', '2 academic references'],
};

export default function AdmissionRequirements() {
  return (
    <>
      <PageHero badge="Requirements" title="Admission Requirements" subtitle="Ensure you meet the criteria before applying." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
          {Object.entries(reqs).map(([key, items]) => (
            <div key={key} className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl capitalize text-aiu-green mb-6">{key}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-white/70">
                    <span className="text-aiu-gold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
