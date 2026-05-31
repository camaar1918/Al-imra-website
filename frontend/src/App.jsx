import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const Admissions = lazy(() => import('./pages/Admissions'));
const AdmissionRequirements = lazy(() => import('./pages/AdmissionRequirements'));
const ProgramFees = lazy(() => import('./pages/ProgramFees'));
const Apply = lazy(() => import('./pages/Apply'));
const Research = lazy(() => import('./pages/Research'));
const Publications = lazy(() => import('./pages/Publications'));
const Conferences = lazy(() => import('./pages/Conferences'));
const Centers = lazy(() => import('./pages/Centers'));
const StudentPortal = lazy(() => import('./pages/StudentPortal'));
const Media = lazy(() => import('./pages/Media'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="undergraduate" element={<ProgramsPage level="UNDERGRADUATE" title="Undergraduate Programs" subtitle="Bachelor degrees across six faculties." />} />
          <Route path="postgraduate" element={<ProgramsPage level="POSTGRADUATE" title="Postgraduate Programs" subtitle="Master's and doctoral pathways for advanced scholars." />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="admission-requirements" element={<AdmissionRequirements />} />
          <Route path="program-fees" element={<ProgramFees />} />
          <Route path="apply" element={<Apply />} />
          <Route path="research" element={<Research />} />
          <Route path="publications" element={<Publications />} />
          <Route path="conferences" element={<Conferences />} />
          <Route path="centers" element={<Centers />} />
          <Route path="portal" element={<StudentPortal />} />
          <Route path="media" element={<Media />} />
          <Route path="verify-certificate" element={<VerifyCertificate />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
