import { useState, useEffect } from 'react';
import PageHero from '../components/ui/PageHero';
import api from '../api/client';

export default function Apply() {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({ programId: '', fullName: '', email: '', phone: '', nationalId: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/programs').then((r) => setPrograms(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/applications', form);
      setStatus({ type: 'success', msg: 'Application submitted successfully! We will contact you soon.' });
      setForm({ programId: '', fullName: '', email: '', phone: '', nationalId: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero badge="Apply" title="Online Application" subtitle="Complete the form below to begin your admission process." />
      <section className="py-20 px-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl glass rounded-3xl p-8 space-y-5">
          <div>
            <label className="block text-sm text-white/60 mb-1">Program *</label>
            <select required value={form.programId} onChange={(e) => setForm({ ...form, programId: e.target.value })} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-aiu-green outline-none">
              <option value="">Select program</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          {['fullName', 'email', 'phone', 'nationalId'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-white/60 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')} {field === 'fullName' || field === 'email' ? '*' : ''}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                required={field === 'fullName' || field === 'email'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-aiu-green outline-none"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-white/60 mb-1">Message</label>
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-aiu-green outline-none" />
          </div>
          {status && (
            <p className={`text-sm ${status.type === 'success' ? 'text-aiu-green' : 'text-red-400'}`}>{status.msg}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-aiu-green to-aiu-blue py-3 font-medium hover:shadow-lg hover:shadow-aiu-green/30 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </section>
    </>
  );
}
