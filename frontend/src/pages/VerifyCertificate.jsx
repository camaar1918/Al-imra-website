import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldX, Search, Sparkles } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import api from '../api/client';

export default function VerifyCertificate() {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/certificates/verify', { studentId: studentId.trim() });
      setResult(data);
    } catch {
      setResult({ verified: false, status: 'ERROR', message: 'Verification service unavailable' });
    } finally {
      setLoading(false);
    }
  };

  const verified = result?.verified;
  const student = result?.student;
  const cert = result?.certificate;

  return (
    <>
      <PageHero
        badge="Official Verification"
        title="Certificate Verification"
        subtitle="Enter your Student ID or National ID to instantly verify your AIU certificate."
      />
      <section className="py-20 px-4 bg-theme-secondary/30">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleVerify} className="glass rounded-3xl p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <img src="/aiu-logo.png" alt="AIU" className="h-16 w-16" />
            </div>
            <h3 className="font-display text-xl text-center text-theme mb-2">Verify Your Certificate</h3>
            <p className="text-center text-sm text-theme-muted mb-8">
              One field — we retrieve all details automatically from our secure registry.
            </p>

            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Student ID / National ID
            </label>
            <input
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="input-theme w-full rounded-2xl px-5 py-4 text-lg text-center font-mono tracking-wider"
              placeholder="e.g. 135792"
              autoComplete="off"
            />
            <p className="mt-2 text-xs text-center text-theme-muted">Demo ID: <span className="text-aiu-green font-semibold">135792</span></p>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aiu-green to-aiu-blue py-4 font-semibold text-white hover:shadow-lg hover:shadow-aiu-green/40 disabled:opacity-50 transition-all"
            >
              <Search className="h-5 w-5" />
              {loading ? 'Verifying...' : 'Verify Certificate'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={verified ? 'ok' : 'fail'}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={`mt-10 rounded-3xl p-8 border-2 ${
                  verified ? 'border-aiu-green bg-aiu-green/10 glow-green' : 'border-red-400/60 bg-red-500/10'
                }`}
              >
                <div className="flex flex-col items-center mb-8">
                  {verified ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-aiu-green/30 blur-xl animate-pulse" />
                        <ShieldCheck className="relative h-16 w-16 text-aiu-green" />
                        <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-aiu-gold animate-pulse" />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-3xl font-bold tracking-widest text-aiu-green"
                      >
                        ✅ VERIFIED
                      </motion.span>
                      <span className="mt-1 text-sm font-semibold uppercase tracking-wider text-aiu-gold">
                        {result.status}
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldX className="h-14 w-14 text-red-400" />
                      <span className="mt-3 text-xl font-semibold text-red-400">Not Verified</span>
                    </>
                  )}
                </div>

                <p className="text-center text-theme-secondary mb-6">{result.message}</p>

                {verified && student && cert && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-2xl p-6 md:p-8 border border-aiu-gold/30 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aiu-green via-aiu-blue to-aiu-gold" />
                    <div className="flex justify-center mb-4">
                      <img src="/aiu-logo.svg" alt="AIU" className="h-14 w-14" />
                    </div>
                    <h4 className="font-display text-center text-lg text-aiu-gold">Al-Imra International University</h4>
                    <p className="text-center text-xs text-theme-muted mt-1 uppercase tracking-widest">Official Certificate Record</p>
                    <hr className="my-5 border-[var(--border-color)]" />
                    <dl className="space-y-3 text-sm">
                      {[
                        ['Student Name', student.fullName],
                        ['Faculty', student.faculty || cert.faculty],
                        ['Department', student.department || cert.department],
                        ['HEMIS Number', student.hemisNumber],
                        ['Certificate Number', cert.certificateNumber],
                        ['Degree', cert.degree],
                        ['Graduation Year', cert.graduationYear],
                        ['Verification Status', result.status],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4 border-b border-[var(--border-color)] pb-2 last:border-0">
                          <dt className="text-theme-muted shrink-0">{label}</dt>
                          <dd className="font-medium text-theme text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
