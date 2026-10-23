import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Send,
  Loader2,
  Layers,
  Cpu,
  Smartphone,
  Rocket,
} from 'lucide-react';
import { CodiargLogo3D } from './components/CodiargLogo3D';
import { AgencyProjectsShowcase } from './components/AgencyProjectsShowcase';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { REAL_PROJECTS, Project } from './data/projectsData';

const SERVICES_LIST = [
  {
    index: '01',
    title: 'Web Apps & Plataformas SaaS',
    subtitle: 'Sistemas rápidos, escalables y hechos 100% para tu negocio.',
    marqueeText:
      'REACT • NEXT.JS • ARQUITECTURA CLOUD • TIEMPO REAL • SAAS A MEDIDA •',
    tags: ['React & Next.js', 'Tiempo Real', 'Arquitectura Cloud'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    icon: Layers,
  },
  {
    index: '02',
    title: 'Ecosistemas Mobile iOS & Android',
    subtitle: 'Experiencias móviles fluidas a 120fps que enamoran al usuario.',
    marqueeText:
      'IOS & ANDROID • FLUIDEZ 120FPS • BIOMETRÍA • PAGOS INTEGRADOS •',
    tags: ['iOS & Android', 'UI/UX Futurista', 'Biometría & Pagos'],
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
    icon: Smartphone,
  },
  {
    index: '03',
    title: 'Inteligencia Artificial & Agentes',
    subtitle: 'Automatizamos procesos complejos con IA conectada a tus datos.',
    marqueeText:
      'AGENTES IA • AUTOMATIZACIÓN 24/7 • MODELOS PROPIOS • RAG •',
    tags: ['Agentes Autónomos', 'Chatbots Propios', 'Análisis Predictivo'],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    icon: Cpu,
  },
  {
    index: '04',
    title: 'MVPs & Startups desde Cero',
    subtitle: 'Convertimos tu idea en un producto real listo para escalar.',
    marqueeText:
      'DE CERO A MERCADO • PROPIEDAD 100% TUYA • ESCALABLE •',
    tags: ['De 0 a Mercado', 'Código 100% Tuyo', 'Listo para Inversores'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
    icon: Rocket,
  },
];

const STACKING_STEPS = [
  {
    step: '01',
    label: 'FASE 01 — INMERSIÓN',
    title: 'Aterrizamos tu visión y la potenciamos.',
    description:
      'No tomamos pedidos a ciegas. Nos sentamos con vos para entender tu idea a fondo, definir qué funcionalidades generan más valor y trazar una hoja de ruta clara.',
    highlight: 'Blueprint completo en la Semana 1',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-[#0096F6]/30 to-transparent',
  },
  {
    step: '02',
    label: 'FASE 02 — DISEÑO INTERACTIVO',
    title: 'Vemos y probamos tu producto antes de programarlo.',
    description:
      'Diseñamos cada pantalla y cada animación con estética futurista de primer nivel. Vas a poder navegar un prototipo idéntico al producto final antes de escribir código.',
    highlight: 'Diseño UI/UX de nivel internacional',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-[#58CC02]/25 to-transparent',
  },
  {
    step: '03',
    label: 'FASE 03 — INGENIERÍA A MEDIDA',
    title: 'Programamos desde cero. Cero plantillas lentas.',
    description:
      'Construimos tu software con código limpio, rápido y seguro, pensado específicamente para tu modelo de negocio. Ves avances funcionales reales todas las semanas.',
    highlight: '100% propiedad intelectual tuya',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-[#0096F6]/30 to-transparent',
  },
  {
    step: '04',
    label: 'FASE 04 — LANZAMIENTO Y ESCALA',
    title: 'Salimos al mercado listos para dominar.',
    description:
      'Desplegamos tu plataforma en servidores de alta velocidad preparada para recibir miles de usuarios simultáneos y evolucionar junto a tu empresa.',
    highlight: 'Soporte y evolución continua',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-[#0096F6]/30 to-[#58CC02]/20',
  },
];

/* ==========================================================================
   REACT BITS SIGNATURE COMPONENTS (CODIARG CERULEAN + NAVY + WHITE + LEAF PALETTE)
   ========================================================================== */

/**
 * 1. React Bits <AuroraWavesBackground /> + Logo Glyphs
 * Uses the exact palette from the Codiarg logo image:
 * - Vibrant Cerulean Blue (#0096F6 / #0074D9)
 * - Deep Midnight Navy (#061B33)
 * - Crisp Pure White (#FFFFFF) & Ice Cyan (#BAE6FD) floating code glyphs (A, o, d, +, E, r, t, y)
 * - Organic Leaf Green (#58CC02 / #84CC16)
 */
const AuroraWavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating holographic glyphs extracted directly from the Codiarg logo ring
    const glyphChars = ['A', 'o', 'd', '+', 'E', 'r', 't', 'y', 'J', 'q', '·'];
    const glyphs = Array.from({ length: 22 }, (_, i) => ({
      char: glyphChars[i % glyphChars.length],
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -0.25 - Math.random() * 0.35,
      alpha: 0.12 + Math.random() * 0.22,
      size: 12 + Math.floor(Math.random() * 8),
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.008;

      // Base Gradient matching the Codiarg logo background (#0088E8 top glow -> #051B34 deep navy)
      const baseGrad = ctx.createRadialGradient(
        width * 0.5,
        0,
        width * 0.05,
        width * 0.5,
        height * 0.45,
        width * 0.95
      );
      baseGrad.addColorStop(0, '#0088E8');
      baseGrad.addColorStop(0.45, '#0056A3');
      baseGrad.addColorStop(1, '#051B34');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Volumetric Cerulean, Ice White & Leaf Green Aurora Waves
      const waveConfigs = [
        {
          colorStart: 'rgba(0, 150, 246, 0.35)',
          colorEnd: 'rgba(5, 27, 52, 0.0)',
          yOffset: height * 0.3,
          amplitude: 65,
          freq: 0.0018,
          speed: 1.0,
        },
        {
          colorStart: 'rgba(88, 204, 2, 0.18)',
          colorEnd: 'rgba(5, 27, 52, 0.0)',
          yOffset: height * 0.56,
          amplitude: 75,
          freq: 0.0014,
          speed: -0.85,
        },
        {
          colorStart: 'rgba(186, 230, 253, 0.2)',
          colorEnd: 'rgba(0, 116, 217, 0.0)',
          yOffset: height * 0.78,
          amplitude: 50,
          freq: 0.0022,
          speed: 1.25,
        },
      ];

      waveConfigs.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 24) {
          const y =
            w.yOffset +
            Math.sin(x * w.freq + time * w.speed) * w.amplitude +
            Math.cos(x * w.freq * 0.6 - time * 0.7) * (w.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, w.yOffset - 120, 0, height);
        grad.addColorStop(0, w.colorStart);
        grad.addColorStop(1, w.colorEnd);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 2. Floating Holographic Glyphs from the Codiarg Logo
      ctx.font = '600 13px "JetBrains Mono", monospace';
      glyphs.forEach((g) => {
        g.y += g.vy;
        if (g.y < -20) {
          g.y = height + 20;
          g.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(224, 242, 254, ${g.alpha})`;
        ctx.fillText(g.char, g.x, g.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

/**
 * 2. React Bits <DecryptedText />
 */
const DecryptedText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+<>/{}[]';

  const triggerDecrypt = () => {
    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        window.clearInterval(interval);
        setDisplayText(text);
      }
    }, 24);
  };

  useEffect(() => {
    if (isInView) {
      triggerDecrypt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, text]);

  return (
    <span
      ref={ref}
      onMouseEnter={triggerDecrypt}
      className={`inline-block font-mono ${className}`}
    >
      {displayText}
    </span>
  );
};

/**
 * 3. React Bits <ShinyText />
 */
const ShinyText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => (
  <span
    className={`inline-block bg-[linear-gradient(110deg,#BAE6FD,40%,#FFFFFF,50%,#84CC16,60%,#BAE6FD)] bg-clip-text text-transparent animate-shine ${className}`}
  >
    {text}
  </span>
);

/**
 * 4. React Bits <TiltedCard />
 */
export const TiltedCard: React.FC<{
  children: React.ReactNode;
  floatingBadge?: React.ReactNode;
  className?: string;
}> = ({ children, floatingBadge, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 20,
  });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 20,
  });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className="perspective-1400 w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY }}
        className={`relative preserve-3d ${className}`}
      >
        <motion.div
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[2rem]"
        />
        {children}
        {floatingBadge && (
          <div
            style={{ transform: 'translateZ(55px)' }}
            className="hidden sm:block absolute -bottom-6 -right-6 z-30"
          >
            {floatingBadge}
          </div>
        )}
      </motion.div>
    </div>
  );
};

/**
 * 5. React Bits <StarBorderButton /> + <Magnet />
 */
const StarBorderButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}> = ({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const innerContent = (
    <span
      className={`relative inline-flex rounded-full p-[2px] overflow-hidden group shadow-[0_10px_35px_rgba(6,27,51,0.45)] ${
        disabled ? 'opacity-65 cursor-not-allowed' : ''
      }`}
    >
      <span className="absolute inset-[-100%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#061B33_0%,#FFFFFF_30%,#58CC02_65%,#0096F6_100%)]" />
      <span
        className={`relative inline-flex items-center justify-center gap-3 rounded-full bg-[#061B33] group-hover:bg-[#0A2542] px-7 py-3.5 text-sm sm:text-base font-bold text-white transition-all ${className}`}
      >
        {children}
      </span>
    </span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className="focus:outline-none">
          {innerContent}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className="focus:outline-none disabled:cursor-not-allowed"
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
};

/**
 * StackingProcessStage: Sticky Spatial 3D Card Stacking in Codiarg Navy + White Rim + Leaf Green
 */
const StackingProcessStage: React.FC<{
  item: (typeof STACKING_STEPS)[0];
  index: number;
  total: number;
}> = ({ item, index, total }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.5, 0.95],
    [1, 1 - (total - index) * 0.03]
  );

  return (
    <div
      ref={stageRef}
      style={{ top: `${96 + index * 28}px` }}
      className="sticky mb-16 last:mb-0"
    >
      <motion.div
        style={{ scale }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[#061B33]/95 backdrop-blur-2xl border-2 border-white/25 shadow-[0_-20px_80px_rgba(5,27,52,0.85)]"
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-8 sm:p-12 lg:p-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl sm:text-6xl font-bold text-[#0096F6]">
                {item.step}
              </span>
              <span className="h-[2px] w-12 bg-white/30" />
              <DecryptedText
                text={item.label}
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#58CC02]"
              />
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white leading-[1.08]">
              {item.title}
            </h3>

            <p className="text-base sm:text-xl text-[#E0F2FE] leading-relaxed">
              {item.description}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-5 py-2 text-xs sm:text-sm font-bold text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[#58CC02]" />
                <ShinyText text={item.highlight} />
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061B33]/75 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ==========================================================================
   MAIN LANDING PAGE
   ========================================================================== */

export const App: React.FC = () => {
  // Expanding Portal ClipPath on Hero Scroll
  const portalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: portalProgress } = useScroll({
    target: portalRef,
    offset: ['start 85%', 'center center'],
  });
  const clipInset = useTransform(
    portalProgress,
    [0, 1],
    [
      'inset(10% 12% 10% 12% round 40px)',
      'inset(0% 0% 0% 0% round 0px)',
    ]
  );
  const portalImageScale = useTransform(portalProgress, [0, 1], [1.18, 1]);

  // Interactive Projects Showcase State & Dedicated Full-Page View
  const [selectedDetailProject, setSelectedDetailProject] =
    useState<Project | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#proyecto-')) {
        const id = hash.replace('#proyecto-', '');
        const found = REAL_PROJECTS.find((p) => p.id === id);
        if (found) {
          setSelectedDetailProject(found);
          return;
        }
      }
      if (
        hash === '' ||
        hash === '#proyectos' ||
        hash === '#cotizar' ||
        hash === '#servicios' ||
        hash === '#proceso'
      ) {
        setSelectedDetailProject(null);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const handleOpenDetail = (proj: Project) => {
    setSelectedDetailProject(proj);
    window.history.pushState(null, '', `#proyecto-${proj.id}`);
  };

  const handleBackToLanding = () => {
    setSelectedDetailProject(null);
    window.history.pushState(null, '', '#proyectos');
  };

  const handleConsultType = (type: string) => {
    setSelectedType(type);
    setSelectedDetailProject(null);
    window.history.pushState(null, '', '#cotizar');
    setTimeout(() => {
      const formElement = document.getElementById('cotizar');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // React Bits FlowingMenu + Floating Cursor Image Follower in Services Section
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const serviceCursorX = useMotionValue(0);
  const serviceCursorY = useMotionValue(0);
  const smoothServiceX = useSpring(serviceCursorX, {
    stiffness: 160,
    damping: 18,
  });
  const smoothServiceY = useSpring(serviceCursorY, {
    stiffness: 160,
    damping: 18,
  });

  const handleServicesMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!servicesSectionRef.current) return;
    const rect = servicesSectionRef.current.getBoundingClientRect();
    serviceCursorX.set(e.clientX - rect.left);
    serviceCursorY.set(e.clientY - rect.top);
  };

  // Simple Transparent Conversion Form State
  const [selectedType, setSelectedType] = useState('Web App / SaaS');
  const [contactChannel, setContactChannel] = useState<'WhatsApp' | 'Email'>(
    'WhatsApp'
  );
  const [clientName, setClientName] = useState('');
  const [ideaText, setIdeaText] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/jpmedinagomez1@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Nueva idea de proyecto en Codiarg - ${clientName} (${selectedType})`,
            _captcha: 'false',
            _template: 'table',
            Nombre: clientName,
            'Tipo de Proyecto': selectedType,
            'Canal Preferido': contactChannel,
            Contacto: email,
            'Idea / Mensaje': ideaText,
          }),
        }
      );

      const result = await response.json();
      if (
        response.ok &&
        (result.success === 'true' || result.success === true)
      ) {
        setSent(true);
      } else {
        throw new Error(result.message || 'Error al procesar el envío');
      }
    } catch (err) {
      console.error('Error enviando consulta:', err);
      setSubmitError(
        'Ocurrió un error al enviar el formulario. Por favor intentá de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dedicated Full-Page View for Project Deep Dive
  if (selectedDetailProject) {
    return (
      <ProjectDetailPage
        project={selectedDetailProject}
        onBack={handleBackToLanding}
        onSelectProject={(p) => handleOpenDetail(p)}
        onConsult={handleConsultType}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#051B34] text-white selection:bg-[#58CC02] selection:text-[#061B33]">
      {/* React Bits Aurora + Waves + Glyphs in Codiarg Cerulean/Navy/Leaf Palette */}
      <AuroraWavesBackground />

      {/* ====================================================================
          FLOATING NAVBAR WITH WHITE PORTHOLE ACCENT & CODIARG LOGO
          ==================================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="flex items-center justify-between gap-6 w-full max-w-6xl rounded-full bg-[#061B33]/90 backdrop-blur-2xl border-2 border-white/30 px-5 py-2.5 shadow-[0_15px_45px_rgba(6,27,51,0.55)]"
        >
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0096F6] border-2 border-white p-0.5 shadow-[0_0_20px_rgba(0,150,246,0.5)] group-hover:scale-105 transition-transform">
              <img
                src="/codiarg-logo.png"
                alt="Codiarg Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  CODIARG
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#58CC02]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#BAE6FD] -mt-1 hidden sm:block">
                BESPOKE SOFTWARE LAB
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#E0F2FE]">
            <a
              href="#proyectos"
              className="hover:text-[#58CC02] transition-colors"
            >
              Proyectos
            </a>
            <a
              href="#servicios"
              className="hover:text-[#58CC02] transition-colors"
            >
              Qué Creamos
            </a>
            <a
              href="#proceso"
              className="hover:text-[#58CC02] transition-colors"
            >
              El Proceso
            </a>
          </div>

          <StarBorderButton
            href="#cotizar"
            className="!px-5 !py-2 !text-xs sm:!text-sm"
          >
            <span>Cotizar Idea</span>
            <ArrowUpRight className="h-4 w-4 text-[#58CC02]" />
          </StarBorderButton>
        </motion.nav>
      </header>

      {/* ====================================================================
          PHASE 1: HERO WITH MONUMENTAL TYPOGRAPHY (LEFT) + 3D MASCOT (RIGHT)
          ==================================================================== */}
      <section className="relative z-10 pt-28 lg:pt-36 pb-12 overflow-x-clip">
        <div className="mx-auto max-w-[1520px] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
            {/* LEFT COLUMN: EDITORIAL MANIFESTO & CTAS */}
            <div className="lg:col-span-6 space-y-6 relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/30 px-5 py-2 backdrop-blur-xl shadow-lg"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#58CC02] animate-ping" />
                <DecryptedText
                  text="INGENIERÍA DE SOFTWARE A MEDIDA"
                  className="text-xs sm:text-sm font-bold tracking-wider text-white"
                />
              </motion.div>

              <div className="space-y-1 sm:space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(2.5rem,5.4vw,5.6rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(6,27,51,0.45)]"
                >
                  TU IDEA, HECHA
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[clamp(2.5rem,5.4vw,5.6rem)] font-bold leading-[0.95] text-stroke-white cursor-default select-none"
                >
                  TECNOLOGÍA
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.16,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[clamp(2.5rem,5.4vw,5.6rem)] font-bold leading-[0.95] bg-gradient-to-r from-white via-[#BAE6FD] to-[#58CC02] bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(6,27,51,0.4)]"
                >
                  QUE DOMINA.
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.24 }}
                className="max-w-xl text-base sm:text-xl text-[#E0F2FE] font-medium leading-relaxed"
              >
                Transformamos tu visión en software a medida de alto impacto:
                creamos soluciones únicas basadas{' '}
                <span className="text-[#58CC02] font-bold">
                  exactamente en tu idea
                </span>
                .
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <StarBorderButton href="#cotizar">
                  <span>Hacer realidad mi idea</span>
                  <ArrowUpRight className="h-5 w-5 text-[#58CC02]" />
                </StarBorderButton>

                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-white/10 hover:bg-white hover:text-[#061B33] px-7 py-3.5 text-sm sm:text-base font-bold text-white transition-all"
                >
                  <span>Explorar proyectos</span>
                </a>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE 3D CODIARG MASCOT TRACKING THE MOUSE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              <CodiargLogo3D />
            </motion.div>
          </div>
        </div>

        {/* Expanding Scroll Portal Showreel */}
        <div
          ref={portalRef}
          className="mt-14 sm:mt-20 h-[75vh] sm:h-[90vh] w-full"
        >
          <motion.div
            style={{ clipPath: clipInset }}
            className="relative h-full w-full overflow-hidden bg-[#061B33] border-y-2 border-white/30"
          >
            <motion.img
              style={{ scale: portalImageScale }}
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=85"
              alt="Codiarg Bespoke Software Portal"
              className="h-full w-full object-cover brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061B33] via-[#061B33]/35 to-transparent" />

            <div className="absolute inset-x-6 bottom-8 sm:inset-x-16 sm:bottom-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#061B33]/90 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 text-xs font-bold text-white mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-[#58CC02]" />
                  <ShinyText text="CERO PLANTILLAS • 100% CÓDIGO A MEDIDA" />
                </span>
                <h2 className="font-display text-2xl sm:text-5xl font-bold text-white leading-tight">
                  Diseñamos el futuro digital de tu empresa desde cero.
                </h2>
              </div>

              <div className="flex gap-8 rounded-3xl bg-[#061B33]/90 backdrop-blur-2xl border-2 border-white/30 px-8 py-5 shadow-2xl">
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#58CC02]">
                    100%
                  </div>
                  <div className="text-xs font-medium text-[#BAE6FD]">
                    Propiedad tuya
                  </div>
                </div>
                <div className="w-[1px] bg-white/20" />
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#0096F6]">
                    10x
                  </div>
                  <div className="text-xs font-medium text-[#BAE6FD]">
                    Más velocidad
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          PHASE 2: CINEMATIC AGENCY-GRADE WORK SHOWCASE (METALAB / LINEAR INSPIRED)
          ==================================================================== */}
      <section
        id="proyectos"
        className="relative z-10 py-24 sm:py-36 px-6 sm:px-12 border-t border-white/15 overflow-hidden"
      >
        <div className="mx-auto max-w-[1480px]">
          {/* Section Editorial Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-18 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#58CC02] animate-ping" />
                <DecryptedText
                  text="TRABAJO SELECCIONADO // CASOS DE ÉXITO REALES"
                  className="text-xs font-bold uppercase tracking-[0.28em] text-[#58CC02]"
                />
              </div>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.98]">
                Ingeniería que genera{' '}
                <span className="bg-gradient-to-r from-white via-[#BAE6FD] to-[#58CC02] bg-clip-text text-transparent">
                  impacto real.
                </span>
              </h2>
            </div>
            <p className="text-[#E0F2FE]/85 max-w-xl text-base sm:text-lg leading-relaxed">
              Inspirados en los estándares de las mejores firmas de software: productos diseñados, programados y escalados desde cero, con arquitecturas de alta velocidad y código 100% propietario.
            </p>
          </div>

          {/* Cinematic Agency-Grade Projects Showcase */}
          <AgencyProjectsShowcase
            onOpenCaseStudy={handleOpenDetail}
            onConsult={handleConsultType}
          />
        </div>
      </section>

      {/* ====================================================================
          PHASE 4: REACT BITS <FLOWINGMENU /> + FLOATING CURSOR PREVIEW
          ==================================================================== */}
      <section
        id="servicios"
        ref={servicesSectionRef}
        onMouseMove={handleServicesMouseMove}
        onMouseLeave={() => setHoveredService(null)}
        className="relative z-10 py-28 lg:py-40 border-t border-white/20 overflow-hidden"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <DecryptedText
                text="SOLUCIONES A MEDIDA // PASÁ EL CURSOR"
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#58CC02]"
              />
              <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold text-white">
                Qué construimos en Codiarg
              </h2>
            </div>
            <p className="text-[#E0F2FE] max-w-md text-base sm:text-lg">
              Cada solución nace de tu idea. Sin plantillas ni límites técnicos.
            </p>
          </div>

          <div className="divide-y divide-white/20 border-y border-white/20">
            {SERVICES_LIST.map((service, idx) => {
              const active = hoveredService === idx;
              return (
                <div
                  key={service.index}
                  onMouseEnter={() => setHoveredService(idx)}
                  className="group relative py-10 sm:py-14 overflow-hidden cursor-pointer transition-all duration-300"
                >
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="pointer-events-none absolute inset-0 z-0 flex items-center bg-gradient-to-r from-[#061B33] via-[#0074D9]/80 to-[#061B33]"
                      >
                        <motion.div
                          animate={{ x: ['0%', '-50%'] }}
                          transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="flex w-max items-center gap-10 whitespace-nowrap opacity-25"
                        >
                          {[...Array(4)].map((_, i) => (
                            <span
                              key={i}
                              className="font-display text-5xl sm:text-7xl font-bold text-white"
                            >
                              {service.marqueeText}
                            </span>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:px-6">
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="font-mono text-sm sm:text-base font-bold text-[#58CC02]">
                        /{service.index}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-3xl sm:text-5xl lg:text-6xl font-bold transition-all duration-300 ${
                            active
                              ? 'text-white translate-x-2'
                              : 'text-[#BAE6FD] group-hover:text-white'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-lg text-[#E0F2FE] max-w-xl">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pl-12 lg:pl-0">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#061B33]/85 border border-white/35 px-4 py-1.5 text-xs font-bold text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Spring Image Window that Follows the Cursor */}
        <motion.div
          style={{
            x: smoothServiceX,
            y: smoothServiceY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: hoveredService !== null ? 1 : 0,
            opacity: hoveredService !== null ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden lg:block w-96 aspect-[16/10] rounded-3xl overflow-hidden border-4 border-white shadow-[0_25px_70px_rgba(6,27,51,0.75)] bg-[#061B33]"
        >
          {hoveredService !== null && (
            <img
              src={SERVICES_LIST[hoveredService].image}
              alt={SERVICES_LIST[hoveredService].title}
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </section>

      {/* ====================================================================
          PHASE 3: "DE TU MENTE AL MERCADO" — STICKY 3D CARD STACKING
          ==================================================================== */}
      <section
        id="proceso"
        className="relative z-10 py-28 lg:py-36 px-6 sm:px-12 border-t border-white/20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <DecryptedText
              text="DE TU MENTE AL MERCADO // PASO A PASO"
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#58CC02]"
            />
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold text-white">
              Cómo transformamos tu idea en realidad
            </h2>
          </div>

          <div className="relative">
            {STACKING_STEPS.map((item, index) => (
              <StackingProcessStage
                key={item.step}
                item={item}
                index={index}
                total={STACKING_STEPS.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PHASE 5: TRANSPARENT & SIMPLE CLIENT CONVERSION PORTAL
          ==================================================================== */}
      <section
        id="cotizar"
        className="relative z-10 py-28 lg:py-36 px-6 sm:px-12 border-t border-white/15 overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-1.5 text-xs font-bold text-[#58CC02] mb-6">
              <span className="h-2 w-2 rounded-full bg-[#58CC02] animate-pulse" />
              DISPONIBLES PARA NUEVOS PROYECTOS
            </span>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.98] tracking-tight">
              ¿Tenés una idea?{' '}
              <span className="bg-gradient-to-r from-white via-[#BAE6FD] to-[#58CC02] bg-clip-text text-transparent">
                Hagámosla realidad.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-xl text-white/80 max-w-xl mx-auto">
              Completá estos 3 datos simples y en menos de 24 horas te
              escribimos con una propuesta a medida.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="simple-transparent-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="rounded-[2.5rem] bg-white/[0.04] backdrop-blur-xl border border-white/25 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)] space-y-8"
              >
                {/* 1. Qué querés crear (Píldoras simples transparentes) */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/70 mb-3.5 text-center sm:text-left">
                    1. ¿Qué querés crear?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'Web App / SaaS', icon: Layers },
                      { id: 'App Mobile', icon: Smartphone },
                      { id: 'Sistema con IA', icon: Cpu },
                      { id: 'MVP desde Cero', icon: Rocket },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = selectedType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedType(item.id)}
                          className={`flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-bold transition-all border ${
                            active
                              ? 'bg-white text-[#061B33] border-white shadow-[0_10px_25px_rgba(255,255,255,0.2)] scale-[1.02]'
                              : 'bg-transparent text-white border-white/25 hover:bg-white/10 hover:border-white/50'
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              active ? 'text-[#58CC02]' : 'text-white/70'
                            }`}
                          />
                          <span>{item.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Nombre + WhatsApp/Email en una sola fila limpia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
                      2. Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="¿Cómo te llamás?"
                      className="w-full rounded-2xl bg-white/[0.05] border border-white/25 px-5 py-4 text-base text-white placeholder:text-white/45 focus:border-white focus:bg-white/[0.09] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/70">
                        3. Tu {contactChannel}
                      </label>
                      <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/20">
                        {(['WhatsApp', 'Email'] as const).map((ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => setContactChannel(ch)}
                            className={`px-3 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                              contactChannel === ch
                                ? 'bg-white text-[#061B33]'
                                : 'text-white/75 hover:text-white'
                            }`}
                          >
                            {ch}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        contactChannel === 'WhatsApp'
                          ? 'Ej: +54 9 11 2345-6789'
                          : 'Ej: tu@correo.com'
                      }
                      className="w-full rounded-2xl bg-white/[0.05] border border-white/25 px-5 py-4 text-base text-white placeholder:text-white/45 focus:border-white focus:bg-white/[0.09] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 3. Contanos tu idea */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
                    4. Contanos brevemente tu idea
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                    placeholder="Ej: Quiero crear una plataforma o app para..."
                    className="w-full rounded-2xl bg-white/[0.05] border border-white/25 p-5 text-base text-white placeholder:text-white/45 focus:border-white focus:bg-white/[0.09] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-center text-sm font-medium text-red-200">
                    {submitError}
                  </div>
                )}

                {/* Submit + Garantías simples */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#58CC02]" />
                      Respuesta en &lt; 24hs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#58CC02]" />
                      Asesoría inicial sin cargo
                    </span>
                  </div>

                  <StarBorderButton
                    type="submit"
                    disabled={isSubmitting}
                    className="!px-10 !py-4 !text-base sm:!text-lg"
                  >
                    <span>
                      {isSubmitting ? 'Enviando idea...' : 'Enviar mi idea'}
                    </span>
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin text-[#58CC02]" />
                    ) : (
                      <Send className="h-5 w-5 text-[#58CC02]" />
                    )}
                  </StarBorderButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="portal-sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-xl py-12 space-y-5 rounded-[2.5rem] bg-white/[0.06] backdrop-blur-xl border border-white/30 p-8 sm:p-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#58CC02]/20 text-[#58CC02] border-2 border-[#58CC02]">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">
                  ¡Recibido{clientName ? `, ${clientName}` : ''}!
                </h3>
                <p className="text-white/85 text-base sm:text-lg">
                  Ya tenemos tu idea para{' '}
                  <span className="text-white font-bold">{selectedType}</span>.
                  Te escribimos por{' '}
                  <span className="text-[#58CC02] font-bold">
                    {contactChannel} ({email})
                  </span>{' '}
                  en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setIdeaText('');
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-2.5 text-sm font-bold text-white transition-all"
                >
                  Enviar otra consulta →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ====================================================================
          MINIMALIST FOOTER WITH OFFICIAL LOGO
          ==================================================================== */}
      <footer className="relative z-10 border-t border-white/20 bg-[#061B33]/90 py-10 px-6 sm:px-12">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#BAE6FD]">
          <div className="flex items-center gap-3">
            <img
              src="/codiarg-logo.png"
              alt="Codiarg Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-bold text-white">CODIARG</span>
            <span>— Software a medida de alto impacto.</span>
          </div>
          <div>© {new Date().getFullYear()} Codiarg Studio.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
