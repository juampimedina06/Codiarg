import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Maximize2,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { Project } from '../data/projectsData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
  onConsult: (consultType: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  onConsult,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Keyboard controls (Esc to close, Left/Right for gallery)
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev === 0 ? project.gallery.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentGalleryItem = project.gallery[activeImageIndex] || project.gallery[0];
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030e1d]/85 backdrop-blur-xl"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative z-10 flex flex-col w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[2.2rem] bg-[#061B33]/95 border-2 border-white/25 shadow-[0_30px_100px_rgba(0,0,0,0.85)]"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/15 bg-[#061B33]/90 backdrop-blur-md px-6 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#58CC02]">
                /{project.number}
              </span>
              <span className="h-4 w-[1px] bg-white/20" />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {project.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#58CC02]/15 border border-[#58CC02]/30 px-3 py-0.5 text-[11px] font-bold text-[#58CC02]">
                <span className="h-2 w-2 rounded-full bg-[#58CC02] animate-pulse" />
                {project.statusBadge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#061B33] text-white transition-all border border-white/20"
                aria-label="Cerrar detalle"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable Content */}
          <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-10">
            {/* Project Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-lg sm:text-2xl font-medium text-[#BAE6FD]">
                {project.subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/80 max-w-4xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* INTERACTIVE SCREENSHOT GALLERY CAROUSEL */}
            <div className="space-y-4 rounded-3xl bg-[#031326]/90 border border-white/20 p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#BAE6FD]">
                  <Maximize2 className="h-3.5 w-3.5 text-[#58CC02]" />
                  <span>GALERÍA INTERACTIVA DE PANTALLAS</span>
                </div>
                <div className="text-xs font-mono font-bold text-white/60">
                  {activeImageIndex + 1} / {project.gallery.length}
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-white/20 bg-[#020b15] shadow-inner flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentGalleryItem.url}
                    src={currentGalleryItem.url}
                    alt={currentGalleryItem.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full object-contain sm:object-cover"
                  />
                </AnimatePresence>

                {/* Prev / Next Floating Arrows */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#061B33]/85 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-[#061B33] transition-all shadow-xl"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#061B33]/85 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-[#061B33] transition-all shadow-xl"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Bottom Image Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061B33] via-[#061B33]/80 to-transparent p-4 sm:p-5">
                  <div className="font-display text-base sm:text-lg font-bold text-white">
                    {currentGalleryItem.title}
                  </div>
                  <div className="text-xs sm:text-sm text-[#BAE6FD]">
                    {currentGalleryItem.caption}
                  </div>
                </div>
              </div>

              {/* Horizontal Thumbnail Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {project.gallery.map((item, idx) => (
                  <button
                    key={item.url + idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-20 sm:w-28 aspect-[16/10] overflow-hidden rounded-xl border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#58CC02] ring-2 ring-[#58CC02]/40 scale-105'
                        : 'border-white/20 opacity-55 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* KEY METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/20 bg-white/[0.04] p-5 backdrop-blur-md"
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#58CC02]">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-medium text-[#BAE6FD]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CHALLENGE & SOLUTION BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Challenge */}
              <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0096F6]/20 text-[#0096F6] border border-[#0096F6]/30">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0096F6] font-bold">
                      EL DESAFÍO
                    </span>
                    <h4 className="font-display text-xl font-bold text-white">
                      El Reto del Cliente
                    </h4>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="rounded-3xl border border-[#58CC02]/30 bg-[#58CC02]/[0.05] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#58CC02]/20 text-[#58CC02] border border-[#58CC02]/30">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#58CC02] font-bold">
                      INGENIERÍA CODIARG
                    </span>
                    <h4 className="font-display text-xl font-bold text-white">
                      Nuestra Solución a Medida
                    </h4>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* KEY FEATURES */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#58CC02]" />
                <h4 className="font-display text-xl font-bold text-white">
                  Capacidades y Arquitectura de la Solución
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-white/[0.04] border border-white/15 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#58CC02] mt-0.5" />
                    <span className="text-sm text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK CHIPS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-[#0096F6]" />
                <h4 className="font-display text-xl font-bold text-white">
                  Stack Tecnológico & Decisiones de Ingeniería
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {project.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl bg-[#061B33] border border-white/20 p-3.5"
                  >
                    <span className="font-display text-sm font-bold text-white">
                      {tech.name}
                    </span>
                    <span className="mt-1 text-[11px] font-mono text-[#BAE6FD]">
                      {tech.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODAL FOOTER & CTAS */}
            <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Previous / Next Project Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white hover:text-[#061B33] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Anterior: {prevProject.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white hover:text-[#061B33] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all"
                >
                  <span>Siguiente: {nextProject.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Direct CTA */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onConsult(project.consultType);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#58CC02] hover:bg-[#4cb302] text-[#061B33] px-8 py-3.5 text-sm sm:text-base font-bold transition-all shadow-[0_10px_30px_rgba(88,204,2,0.4)]"
              >
                <span>Cotizar un proyecto similar</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
