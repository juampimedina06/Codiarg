import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Project, REAL_PROJECTS } from '../data/projectsData';

interface AgencyProjectsShowcaseProps {
  onOpenCaseStudy: (project: Project) => void;
  onConsult: (type: string) => void;
}

export const AgencyProjectsShowcase: React.FC<AgencyProjectsShowcaseProps> = ({
  onOpenCaseStudy,
  onConsult: _onConsult,
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>('el-pequeno-hong-kong');
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);

  const activeProject =
    REAL_PROJECTS.find((p) => p.id === activeProjectId) || REAL_PROJECTS[0];

  useEffect(() => {
    setActiveScreenshotIdx(0);
  }, [activeProjectId]);

  const handleNextScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveScreenshotIdx((prev) => (prev + 1) % activeProject.gallery.length);
  };

  const handlePrevScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveScreenshotIdx((prev) =>
      prev === 0 ? activeProject.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-16">
      {/* ====================================================================
          1. OPEN EDITORIAL PROJECT SWITCHER (No cards, pure typography)
          ==================================================================== */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-white/15 pb-6">
        {REAL_PROJECTS.map((proj, idx) => {
          const isActive = activeProjectId === proj.id;
          return (
            <button
              key={proj.id}
              type="button"
              onClick={() => setActiveProjectId(proj.id)}
              className="group relative pb-2 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs font-bold transition-colors ${
                    isActive ? 'text-[#58CC02]' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span
                  className={`font-display text-lg sm:text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                  }`}
                >
                  {proj.title}
                </span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="editorialTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58CC02] to-[#0096F6]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ====================================================================
          2. BORDERLESS CINEMATIC STAGE (No outer card, pure open canvas)
          ==================================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* LEFT: EDITORIAL STORYTELLING */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#58CC02] uppercase tracking-[0.2em]">
                <span>/{activeProject.number}</span>
                <span className="h-2.5 w-[1px] bg-white/25" />
                <span className="text-[#BAE6FD]">{activeProject.category}</span>
                <span className="h-2.5 w-[1px] bg-white/25" />
                <span className="text-white/60">{activeProject.year}</span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[0.98]">
                {activeProject.title}
              </h3>

              <div className="text-lg sm:text-xl font-bold text-[#BAE6FD]">
                {activeProject.subtitle}
              </div>
            </div>

            <p className="text-base text-white/80 leading-relaxed font-normal">
              {activeProject.shortDescription}
            </p>

            {/* Typographic Stats (NO CARD BOXES, clean typographic columns) */}
            <div className="grid grid-cols-3 gap-6 pt-2 border-y border-white/10 py-5">
              {activeProject.metrics.map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#58CC02] leading-none">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-[#BAE6FD] leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech deliverables chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-white/70">
              {activeProject.techStack.map((tech, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="text-white font-medium">{tech.name}</span>
                  {idx < activeProject.techStack.length - 1 && (
                    <span className="text-white/25">•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Direct Action Link */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => onOpenCaseStudy(activeProject)}
                className="group inline-flex items-center gap-3 rounded-full bg-white text-[#061B33] hover:bg-[#58CC02] hover:text-[#061B33] px-8 py-4 text-sm font-bold transition-all shadow-[0_10px_35px_rgba(255,255,255,0.2)]"
              >
                <span>Ver proyecto en detalle ({activeProject.gallery.length} pantallas)</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT: BORDERLESS VISUAL STAGE */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Soft Ambient Brand Glow Behind Image */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl blur-3xl opacity-30 transition-all duration-700"
                style={{
                  background:
                    activeProject.id === 'el-pequeno-hong-kong'
                      ? 'radial-gradient(circle, #58CC02 0%, transparent 70%)'
                      : activeProject.id === 'tomas-fotografia'
                      ? 'radial-gradient(circle, #0096F6 0%, transparent 70%)'
                      : 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
                }}
              />

              {/* Main Image Stage */}
              <div
                onClick={() => onOpenCaseStudy(activeProject)}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/25 bg-[#030d1a] shadow-[0_25px_70px_rgba(0,0,0,0.85)] cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProject.gallery[activeScreenshotIdx]?.url}
                    src={activeProject.gallery[activeScreenshotIdx]?.url}
                    alt={activeProject.gallery[activeScreenshotIdx]?.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </AnimatePresence>

                {/* Floating Arrows */}
                <button
                  type="button"
                  onClick={handlePrevScreenshot}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#061B33]/85 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-[#061B33] transition-all shadow-xl z-20"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextScreenshot}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#061B33]/85 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-[#061B33] transition-all shadow-xl z-20"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030d1a] via-[#030d1a]/85 to-transparent p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm sm:text-base font-bold text-white">
                      {activeProject.gallery[activeScreenshotIdx]?.title}
                    </div>
                    <div className="text-xs text-[#BAE6FD]">
                      {activeProject.gallery[activeScreenshotIdx]?.caption}
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-3 py-1 text-xs font-mono font-bold text-white">
                    <Maximize2 className="h-3.5 w-3.5 text-[#58CC02]" />
                    <span>{activeScreenshotIdx + 1} / {activeProject.gallery.length}</span>
                  </span>
                </div>
              </div>

              {/* Minimalist Thumbnails Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-thin">
                {activeProject.gallery.map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveScreenshotIdx(i);
                    }}
                    className={`relative shrink-0 w-16 sm:w-20 aspect-[16/10] overflow-hidden rounded-lg border transition-all ${
                      activeScreenshotIdx === i
                        ? 'border-[#58CC02] ring-2 ring-[#58CC02]/40 scale-105'
                        : 'border-white/15 opacity-50 hover:opacity-100 hover:border-white/40'
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
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ====================================================================
          3. OPEN EDITORIAL PROJECT DIRECTORY (Linear / Apple row list, NO CARDS)
          ==================================================================== */}
      <div className="border-t border-white/15 pt-10">
        <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#58CC02] mb-6 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>ÍNDICE DE CASOS DE ESTUDIO // SELECCIONÁ PARA EXPLORAR</span>
        </div>

        <div className="divide-y divide-white/10">
          {REAL_PROJECTS.map((project, idx) => {
            const isSelected = activeProjectId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`group py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  isSelected ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span
                    className={`font-mono text-sm sm:text-base font-bold ${
                      isSelected ? 'text-[#58CC02]' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div>
                    <h4
                      className={`font-display text-2xl sm:text-3xl font-bold transition-transform duration-300 ${
                        isSelected ? 'text-white translate-x-2' : 'group-hover:translate-x-1'
                      }`}
                    >
                      {project.title}
                    </h4>
                    <div className="mt-1 text-xs sm:text-sm text-[#BAE6FD]/80">
                      {project.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-10 pl-12 md:pl-0">
                  <div className="hidden sm:block text-right">
                    <div className="text-xs font-mono text-[#58CC02] font-bold">
                      {project.metrics[0].value}
                    </div>
                    <div className="text-[11px] text-white/50">
                      {project.metrics[0].label}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 text-xs font-bold font-mono px-4 py-2 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#58CC02] text-[#061B33] border-[#58CC02]'
                        : 'border-white/20 text-white/80 group-hover:border-white group-hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Activo en escenario' : 'Ver caso'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgencyProjectsShowcase;
