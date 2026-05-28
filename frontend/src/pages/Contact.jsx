import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero badge="Contact" title="Get in Touch" subtitle="We would love to hear from you." />
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Address', value: 'AIU Main Campus, Mogadishu, Somalia' },
              { icon: Phone, label: 'Phone', value: '+252 61 6655636' },
              { icon: Mail, label: 'Email', value: 'info@aiu.som | admissions@aiu.so' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-6 flex gap-4">
                <Icon className="h-6 w-6 text-aiu-green shrink-0" />
                <div>
                  <p className="text-sm text-white/50">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass rounded-3xl p-8 space-y-4"
          >
            <input required placeholder="Your Name" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-aiu-green" />
            <input required type="email" placeholder="Email" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-aiu-green" />
            <input placeholder="Subject" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-aiu-green" />
            <textarea required rows={5} placeholder="Message" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-aiu-green" />
            {sent ? (
              <p className="text-aiu-green text-center">Message sent! We will respond within 48 hours.</p>
            ) : (
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aiu-green to-aiu-blue py-3 font-medium">
                <Send className="h-4 w-4" /> Send Message
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
