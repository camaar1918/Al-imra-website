import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { feePlans } from '../data/siteData';

export default function ProgramFees() {
  return (
    <>
      <PageHero badge="Fees" title="Program Fees" subtitle="Transparent, competitive tuition with scholarship opportunities." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(feePlans).map(([key, plan]) => (
              <div key={key} className="glass rounded-3xl p-8 text-center hover:glow-green transition-shadow gradient-border">
                <h3 className="font-display text-2xl text-aiu-gold">{plan.label}</h3>
                <p className="mt-6 text-4xl font-bold">${plan.semester}<span className="text-lg text-white/50">/semester</span></p>
                <p className="mt-2 text-white/60">Registration: ${plan.registration}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/60 text-left">
                  <li>✓ Library & lab access</li>
                  <li>✓ Student support services</li>
                  <li>✓ Career counseling</li>
                </ul>
                <Button to="/apply" className="mt-8 w-full">Apply Now</Button>
              </div>
            ))}
          </div>
          <div className="mt-16 glass rounded-3xl p-8">
            <SectionHeading title="Payment & Scholarships" center={false} />
            <div className="grid md:grid-cols-2 gap-8 text-white/70">
              <div>
                <h4 className="font-semibold text-aiu-green mb-2">Payment Methods</h4>
                <p>Bank transfer, mobile money, credit card, and installment plans available.</p>
              </div>
              <div>
                <h4 className="font-semibold text-aiu-gold mb-2">Scholarships</h4>
                <p>Merit scholarships (up to 50%), need-based aid, and sports/academic excellence awards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
