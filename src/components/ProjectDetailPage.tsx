import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { Project, REAL_PROJECTS } from '../data/projectsData';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onConsult: (type: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onConsult,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Parallax scroll transforms for mini-logo ribbons
  const { scrollY } = useScroll();
  const tape1X = useTransform(scrollY, [0, 3000], [0, -900]);
  const tape2X = useTransform(scrollY, [0, 3000], [-900, 0]);

  // Scroll to top when entering or switching project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIdx(0);
  }, [project.id]);

  const currentIndex = REAL_PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = REAL_PROJECTS[(currentIndex + 1) % REAL_PROJECTS.length];
  const prevProject =
    REAL_PROJECTS[(currentIndex - 1 + REAL_PROJECTS.length) % REAL_PROJECTS.length];

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative min-h-screen bg-[#030914] text-white selection:bg-[#0096F6] selection:text-white overflow-x-hidden bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]">
      {/* ====================================================================
          BACKGROUND WALLPAPER: GRID OF MINI CODIARG LOGOS (Low opacity)
          ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden opacity-[0.035]"
      >
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-16 sm:gap-24 p-8 w-[140vw] -rotate-6">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <img
                src="/codiarg-logo.png"
                alt=""
                className="h-9 w-9 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          1. STICKY TOP NAVIGATION BAR (Apple / Linear style)
          ==================================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030914]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>VOLVER A CODIARG</span>
          </button>

          {/* Quick project switcher dots */}
          <div className="hidden md:flex items-center gap-3 font-mono text-xs">
            {REAL_PROJECTS.map((p, idx) => {
              const isCurrent = p.id === project.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectProject(p)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-white text-[#061B33] font-bold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden lg:inline">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => {
              onBack();
              setTimeout(() => onConsult(project.consultType), 100);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0096F6] hover:bg-[#0084DE] text-white px-5 py-2 text-xs sm:text-sm font-bold transition-all shadow-[0_0_25px_rgba(0,150,246,0.4)]"
          >
            <span>Cotizar proyecto similar</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ====================================================================
          2. HEGEMONIC HERO (Clean, monumental typography)
          ==================================================================== */}
      <section className="relative pt-16 sm:pt-24 pb-14 px-6 sm:px-12 overflow-hidden">
        {/* Soft Ambient Brand Spotlight (Celeste / Ice Cyan glow) */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[160px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #0096F6 0%, #38BDF8 35%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          {/* Metadata ticker */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-[0.25em]">
            <span>CASO DE ESTUDIO // {project.number}</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="text-[#BAE6FD]">{project.category}</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="text-white/60">{project.year}</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="inline-flex items-center gap-1.5 text-[#38BDF8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
              {project.statusBadge}
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
              {project.title}
            </h1>
            <p className="font-display text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-[#BAE6FD] to-[#38BDF8] bg-clip-text text-transparent leading-tight">
              {project.subtitle}
            </p>
          </div>

          {/* Executive Summary */}
          <p className="text-lg sm:text-2xl text-white/85 max-w-4xl font-normal leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Monolithic Key Stats (Celeste Typographic Stats) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-white/15">
            {project.metrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="font-display text-4xl sm:text-6xl font-bold text-[#38BDF8] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-mono font-medium text-[#BAE6FD] uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SCROLLING MINI LOGO BANNER (Reactivates with scroll, low-opacity tape)
          ==================================================================== */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 space-y-3 backdrop-blur-xs select-none pointer-events-none">
        {/* Track 1: Glides left with scroll */}
        <motion.div
          style={{ x: tape1X }}
          className="flex w-max items-center gap-8 whitespace-nowrap opacity-30"
        >
          {[...Array(16)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <span className="font-mono text-xs font-bold tracking-[0.28em] text-white uppercase">
                  CODIARG
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#0096F6]" />
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <span className="font-mono text-xs font-bold tracking-[0.28em] text-[#58CC02] uppercase">
                  SOFTWARE LABS
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <span className="font-mono text-xs font-bold tracking-[0.28em] text-[#BAE6FD] uppercase">
                  HIGH PERFORMANCE
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#0096F6]" />
            </div>
          ))}
        </motion.div>

        {/* Track 2: Glides right with scroll */}
        <motion.div
          style={{ x: tape2X }}
          className="flex w-max items-center gap-8 whitespace-nowrap opacity-20"
        >
          {[...Array(16)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-5 w-5 object-contain"
                />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#58CC02] uppercase">
                  INGENIERÍA A MEDIDA
                </span>
              </div>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-5 w-5 object-contain"
                />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-white uppercase">
                  CASO DE ÉXITO // {project.number}
                </span>
              </div>
              <span className="h-1 w-1 rounded-full bg-[#0096F6]" />
              <div className="flex items-center gap-2.5">
                <img
                  src="/codiarg-logo.png"
                  alt=""
                  className="h-5 w-5 object-contain"
                />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#BAE6FD] uppercase">
                  DESARROLLO 2026
                </span>
              </div>
              <span className="h-1 w-1 rounded-full bg-white/40" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ====================================================================
          3. FULL-BLEED CINEMATIC IMAGE VIEWER
          ==================================================================== */}
      <section className="relative px-4 sm:px-12 py-8">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Main Visual Stage */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/20 bg-[#02060e] shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.gallery[activeImageIdx]?.url}
                src={project.gallery[activeImageIdx]?.url}
                alt={project.gallery[activeImageIdx]?.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-contain sm:object-cover"
              />
            </AnimatePresence>

            {/* Prev / Next Controls */}
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#030914]/85 text-white border border-white/30 backdrop-blur-xl hover:bg-white hover:text-[#030914] transition-all shadow-2xl z-20"
              aria-label="Captura anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#030914]/85 text-white border border-white/30 backdrop-blur-xl hover:bg-white hover:text-[#030914] transition-all shadow-2xl z-20"
              aria-label="Captura siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Bottom Caption Bar */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#02060e] via-[#02060e]/85 to-transparent p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="font-display text-lg sm:text-2xl font-bold text-white">
                  {project.gallery[activeImageIdx]?.title}
                </div>
                <div className="text-xs sm:text-sm text-[#BAE6FD]">
                  {project.gallery[activeImageIdx]?.caption}
                </div>
              </div>

              <span className="flex items-center gap-2 self-start sm:self-auto rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-mono font-bold text-white">
                <Maximize2 className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>PANTALLA {activeImageIdx + 1} DE {project.gallery.length}</span>
              </span>
            </div>
          </div>

          {/* Horizontal Thumbnails Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 scrollbar-thin">
            {project.gallery.map((img, i) => (
              <button
                key={img.url + i}
                type="button"
                onClick={() => setActiveImageIdx(i)}
                className={`relative shrink-0 w-24 sm:w-32 aspect-[16/10] overflow-hidden rounded-xl border transition-all ${
                  activeImageIdx === i
                    ? 'border-[#0096F6] ring-2 ring-[#0096F6]/50 scale-105'
                    : 'border-white/15 opacity-45 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. EDITORIAL DEEP-DIVE: BRIEF, CHALLENGE & ARCHITECTURE (NO CARDS)
          ==================================================================== */}
      <section className="relative z-10 py-20 px-6 sm:px-12 border-t border-white/10">
        <div className="mx-auto max-w-5xl space-y-20">
          {/* THE CHALLENGE VS THE SOLUTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* The Challenge */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.2em]">
                <Layers className="h-4 w-4" />
                <span>01 // EL DESAFÍO</span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
                El problema de negocio
              </h3>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                <span>02 // INGENIERÍA CODIARG</span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
                Nuestra arquitectura a medida
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* CAPABILITIES & ARCHITECTURE SPECIFICATIONS */}
          <div className="space-y-8 border-t border-white/10 pt-16">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.2em]">
              <ShieldCheck className="h-4 w-4" />
              <span>03 // CAPACIDADES DE LA SOLUCIÓN</span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white">
              Ingeniería y decisiones de software
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-b border-white/10 pb-6"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#38BDF8] shrink-0 mt-1" />
                  <span className="text-base sm:text-lg text-white/90 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TECH STACK TABLE (Apple Tech Specs style, pure typographic list) */}
          <div className="space-y-8 border-t border-white/10 pt-16">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.2em]">
              <Cpu className="h-4 w-4" />
              <span>04 // ESPECIFICACIONES TÉCNICAS</span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white">
              Tecnologías y capas de infraestructura
            </h3>

            <div className="divide-y divide-white/10">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="font-display text-xl sm:text-2xl font-bold text-white">
                    {tech.name}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[#BAE6FD]">
                    {tech.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. NEXT PROJECT HIGH-IMPACT RUNWAY (Apple / Locomotive style)
          ==================================================================== */}
      <section className="relative z-10 border-t border-white/15 py-24 sm:py-32 px-6 sm:px-12 bg-[#02060e]/85 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#38BDF8]">
              SIGUIENTE CASO DE ESTUDIO
            </span>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="group text-left"
            >
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white group-hover:text-[#BAE6FD] transition-colors leading-[0.98]">
                {nextProject.title}
              </h2>
              <div className="mt-2 text-lg text-[#BAE6FD] flex items-center gap-2">
                <span>{nextProject.subtitle}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2 text-[#38BDF8]" />
              </div>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-xs font-mono font-bold text-white transition-all text-center"
            >
              ← Anterior: {prevProject.title}
            </button>

            <button
              type="button"
              onClick={() => {
                onBack();
                setTimeout(() => onConsult(project.consultType), 100);
              }}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#0096F6] hover:text-white text-[#061B33] text-sm font-bold transition-all shadow-xl text-center"
            >
              Iniciar proyecto similar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
