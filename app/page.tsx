"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type NodePoint = {
  position: [number, number, number];
  speed: number;
};

type Project = {
  kicker: string;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
  imageAlt: string;
  problem: string;
  solution: string;
  url: string;
};

const profileLinks = {
  email: "mailto:tarunyenduri12@gmail.com",
  phone: "tel:+919392157226",
  github: "https://github.com/TarunYenduri",
  linkedin: "https://linkedin.com/in/tarun-yenduri-dev",
  googleSkills: "https://www.skills.google/public_profiles/1ea27089-2c7a-4d3e-940d-607fe5fb998b",
  resume: "/Tarun-Resume.pdf"
};

const projects: Project[] = [
  {
    kicker: "PROJECT 01",
    title: "CrowdShield AI",
    subtitle: "Real-Time Crowd Risk Detection System",
    features: ["AI crowd monitoring", "Risk prediction", "Computer vision", "Emergency detection", "3D crowd visualization"],
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Large crowd at a live event viewed under dramatic stage lighting",
    problem: "Crowded public spaces can become dangerous quickly when density rises, movement patterns shift, or emergency signals are missed by human monitoring teams.",
    solution: "CrowdShield AI is designed as a real-time intelligence layer that observes crowd behavior, detects risk patterns, and converts visual signals into early warnings for safer event operations.",
    url: profileLinks.github
  },
  {
    kicker: "PROJECT 02",
    title: "Customer Churn Prediction System",
    subtitle: "Retention intelligence powered by classification models",
    features: ["Classification models", "Feature engineering", "Customer retention insights", "Interactive analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Analytics dashboard with charts and customer data visualizations",
    problem: "Businesses lose revenue when they identify dissatisfied customers too late, after usage drops and the relationship is already at risk.",
    solution: "The system uses customer behavior data, preprocessing, feature engineering, and classification models to flag churn risk early and support targeted retention decisions.",
    url: "https://github.com/TarunYenduri/customer-churn-prediction"
  },
  {
    kicker: "PROJECT 03",
    title: "Scam Risk Analyzer",
    subtitle: "Real-time fraud signal detection from text",
    features: ["Text analysis", "Fraud detection", "Machine learning classification", "Real-time prediction"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Cybersecurity analyst working with digital threat intelligence screens",
    problem: "Scam messages often appear harmless at first glance, and users need quick support before they click links, share personal data, or respond to fraud attempts.",
    solution: "Scam Risk Analyzer reads message text, extracts suspicious language patterns, and applies machine learning classification to return an immediate risk prediction.",
    url: "https://github.com/TarunYenduri/scam-risk-analyzer"
  },
  {
    kicker: "PROJECT 04",
    title: "AI-Powered Dropout Prediction & Counseling System",
    subtitle: "Early intervention intelligence for academic risk",
    features: ["Student risk prediction", "Early intervention", "Academic analytics", "Counseling recommendations"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Students studying together on a college campus",
    problem: "Students who are academically or personally at risk may not receive help until attendance, performance, or engagement has already declined.",
    solution: "This system analyzes academic indicators to identify dropout risk earlier and recommends counseling support so institutions can intervene before the student disconnects.",
    url: profileLinks.github
  },
  {
    kicker: "PROJECT 05",
    title: "Customer Purchase Prediction App",
    subtitle: "Predictive intelligence for buying behavior",
    features: ["Behavior analytics", "Purchase forecasting", "Predictive intelligence", "Customer segmentation"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Customer using a digital payment card for an online purchase",
    problem: "Sales and product teams need to understand which customers are most likely to purchase, but raw behavior data is difficult to convert into action manually.",
    solution: "The app transforms customer signals into purchase probability insights using classification models, segmentation logic, and an interactive prediction interface.",
    url: "https://github.com/TarunYenduri/customer-purchase-prediction-app"
  }
];

const certifications = [
  {
    title: "India AI Impact Summit Buildathon",
    url: "https://www.guvi.in/share-certificate/71Gg06U7b7u22t4717"
  },
  {
    title: "ATF 2025 Stage 2 Candidate",
    url: "https://d3uam8jk4sa4y4.cloudfront.net/static/certificates/atf_stage_1_25/yenduri.-tarun-siva-krishna.png"
  },
  {
    title: "Google AI Studio Applications",
    url: "https://www.guvi.in/verify-certificate.html?id=Qt10hK48GUW9787771&course=buildingdeployingapplicationswithgoogleaistudio"
  },
  {
    title: "Python Zero To Hero",
    url: "http://www.guvi.in/certificate?id=3R1x86ven56472wT87"
  }
];

const experience = [
  [
    "2026",
    "AI Agents & Agent Engineering Intern",
    "Data Valley",
    "Building agentic AI workflows, tool-using assistants, automation chains, and applied AI systems with production-oriented orchestration."
  ],
  [
    "2026",
    "Machine Learning Intern",
    "Enginow",
    "Developed ML workflows, built predictive models, performed data analysis, and integrated machine learning systems."
  ],
  [
    "2025",
    "India AI Impact Summit Buildathon",
    "ATF Stage 2 Candidate",
    "AI projects development with a focus on high-impact applied intelligence."
  ],
  [
    "2024",
    "Started B.Tech in Artificial Intelligence & Machine Learning",
    "Academic Foundation",
    "Beginning the formal AIML path with a builder's orientation."
  ]
];

const events = [
  {
    name: "Hack Aura 1.0",
    type: "Hackathon",
    detail: "Participated in a competitive build environment focused on rapid problem solving, product thinking, and technical execution."
  },
  {
    name: "Tata Crucible Campus Quiz 2025",
    type: "Campus Quiz",
    detail: "Competed in a national-level campus quiz experience that tested business awareness, analytical thinking, and decision speed."
  },
  {
    name: "Kharagpur Data Science Hackathon",
    type: "Data Science Hackathon",
    detail: "Participated in the hackathon organized by Kharagpur Data Analytics Group at IIT Kharagpur, centered on data-driven problem solving."
  },
  {
    name: "Aignite 2.0 Hackathon",
    type: "AI Hackathon",
    detail: "Built and explored AI-first ideas in a hackathon format focused on innovation, applied intelligence, and prototype execution."
  },
  {
    name: "Avishkar 2026",
    type: "Hackathon",
    detail: "Participated in a future-facing technology hackathon environment with emphasis on ideation, implementation, and presentation."
  },
  {
    name: "Student Development Program",
    type: "Three-Day Program",
    detail: "Completed a three-day student development program organized by Brainovision, focused on technical growth and career readiness."
  },
  {
    name: "Next Gen AI Hackathon",
    type: "AI Hackathon",
    detail: "Participated in an AI-focused hackathon exploring next-generation applications, automation, and intelligent system design."
  },
  {
    name: "AI Agent Workshop",
    type: "Workshop",
    detail: "Participated in hands-on learning around AI agents, agent workflows, and the foundations of autonomous AI systems."
  }
];

const expertise = [
  "Machine Learning",
  "Predictive Analytics",
  "Classification Systems",
  "Feature Engineering",
  "Python Development",
  "AI Applications",
  "Data Analysis",
  "Model Evaluation",
  "Workflow Automation",
  "Interactive Dashboards"
];

const tech = [
  "Python",
  "Java",
  "Scikit-Learn",
  "Pandas",
  "NumPy",
  "Streamlit",
  "Git",
  "Jupyter Notebook",
  "Machine Learning",
  "Classification",
  "Feature Engineering",
  "Predictive Modeling"
];

function NeuralField() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo<NodePoint[]>(
    () =>
      Array.from({ length: 92 }, (_, index) => {
        const radius = 2.4 + (index % 9) * 0.19;
        const angle = index * 1.91;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(index * 0.63) * 1.9,
            Math.sin(angle) * radius
          ],
          speed: 0.18 + (index % 7) * 0.018
        };
      }),
    []
  );

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < points.length; i += 1) {
      const a = new THREE.Vector3(...points[i].position);
      for (let j = i + 1; j < points.length; j += 11) {
        const b = new THREE.Vector3(...points[j % points.length].position);
        if (a.distanceTo(b) < 2.2) {
          positions.push(...a.toArray(), ...b.toArray());
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.16;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.08 - pointer.y * 0.08;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.18} />
      </lineSegments>
      {points.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[index % 8 === 0 ? 0.055 : 0.032, 12, 12]} />
          <meshBasicMaterial color={index % 8 === 0 ? "#ffffff" : "#3B82F6"} transparent opacity={0.78} />
        </mesh>
      ))}
    </group>
  );
}

function BrainCore() {
  const core = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!core.current) return;
    core.current.rotation.y = clock.elapsedTime * 0.22 + pointer.x * 0.2;
    core.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[1.12, 4]} />
        <meshStandardMaterial color="#05080f" roughness={0.28} metalness={0.55} wireframe />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[1.04, 0.018, 220, 12, 2, 5]} />
        <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.006, 8, 170]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function CrowdSimulation() {
  const group = useRef<THREE.Group>(null);
  const agents = useMemo(
    () =>
      Array.from({ length: 75 }, (_, index) => ({
        x: (index % 15) - 7,
        z: Math.floor(index / 15) - 2,
        risk: index % 9 === 0
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.22;
    group.current.children.forEach((child, index) => {
      child.position.y = Math.sin(clock.elapsedTime * 1.7 + index) * 0.06;
    });
  });

  return (
    <group ref={group} scale={0.18} position={[0, -0.7, 0]}>
      {agents.map((agent, index) => (
        <mesh key={index} position={[agent.x * 0.34, 0, agent.z * 0.44]}>
          <capsuleGeometry args={[0.06, 0.18, 4, 8]} />
          <meshStandardMaterial
            color={agent.risk ? "#ffffff" : "#3B82F6"}
            emissive={agent.risk ? "#3B82F6" : "#10245e"}
            emissiveIntensity={agent.risk ? 1.4 : 0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.2], fov: 52 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={2.4} color="#3B82F6" />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#ffffff" />
      <NeuralField />
      <BrainCore />
      <CrowdSimulation />
      <fog attach="fog" args={["#000000", 6, 14]} />
    </Canvas>
  );
}

function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 2100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : "-100%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="relative text-center">
        <motion.div
          className="absolute -inset-20 rounded-full bg-voltage/20 blur-3xl"
          animate={{ scale: [0.75, 1.15, 0.75], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <p className="text-[clamp(4rem,14vw,12rem)] font-black leading-none">TARUN</p>
          <p className="mt-3 text-sm font-semibold tracking-[0.58em] text-voltage">AI ENGINEER</p>
          <div className="mx-auto mt-10 h-px w-72 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-voltage"
              animate={{ x: ["-100%", "120%"] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  primary = false
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  return (
    <a
      className={`magnetic inline-flex min-h-12 items-center gap-3 border px-5 text-sm font-semibold uppercase tracking-[0.18em] ${
        primary
          ? "border-voltage bg-voltage text-white shadow-voltage"
          : "border-white/18 bg-white/[0.035] text-white hover:border-voltage/70"
      }`}
      href={href}
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-voltage">{children}</p>;
}

export default function Home() {
  const main = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "opening">("idle");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -220]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.08]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("opening");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const gmailComposeUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=tarunyenduri12@gmail.com&su=${subject}&body=${body}`;

    window.location.href = gmailComposeUrl;
    window.setTimeout(() => setFormStatus("idle"), 1200);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.86 });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((line) => {
        gsap.to(line, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 82%" }
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-copy").forEach((element) => {
        gsap.to(element, {
          yPercent: -16,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }, main);

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={main} className="relative min-h-screen overflow-hidden bg-ink text-platinum">
      <Loader />
      <div className="fixed inset-0 z-0 opacity-90">
        <Scene />
      </div>
      <div className="luxury-grid fixed inset-0 z-0 opacity-45" />

      <nav className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 md:px-9">
        <a href="#hero" className="max-w-[14rem] text-white md:max-w-none">Tarun Siva Krishna Yenduri</a>
        <div className="hidden gap-7 md:flex">
          <a href="#projects">Projects</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="hero" className="relative z-10 flex min-h-screen items-end px-5 pb-10 pt-28 md:px-10 lg:px-14">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full">
          <div className="mb-10 flex items-center justify-between gap-8">
            <p className="max-w-sm text-sm uppercase tracking-[0.34em] text-graphite">Andhra Pradesh, India</p>
            <p className="hidden max-w-xs text-right text-sm text-graphite md:block">
              Building intelligent AI systems that predict, analyze, and solve real-world problems.
            </p>
          </div>
          <h1 className="text-[clamp(5.2rem,17vw,18.5rem)] font-black leading-[0.75] tracking-luxury">
            TARUN
          </h1>
          <div className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[clamp(2.7rem,8vw,8.6rem)] font-black leading-[0.83] tracking-luxury text-white/95">
                AI ENGINEER
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-graphite md:text-xs">
                <span>Machine Learning Engineer</span>
                <span className="text-voltage">/</span>
                <span>Systems Builder</span>
                <span className="text-voltage">/</span>
                <span>Automation Architect</span>
              </div>
            </div>
            <div className="max-w-xl justify-self-end">
              <p className="text-balance text-xl leading-relaxed text-white/78 md:text-2xl">
                I design intelligent systems, machine learning solutions, and AI-powered applications that solve real-world problems.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="#projects" primary>View Projects</MagneticButton>
                <MagneticButton href="#journey">Explore Journey</MagneticButton>
                <MagneticButton href="#contact">Contact</MagneticButton>
              </div>
            </div>
          </div>
          <a className="mt-14 inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-graphite" href="#about">
            Scroll
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </section>

      <section id="about" className="relative z-10 min-h-screen px-5 py-28 md:px-10 lg:px-14">
        <SectionLabel>About</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <h2 className="reveal-line text-balance text-[clamp(3.2rem,9vw,10rem)] font-black leading-[0.9]">
            Transforming Data Into Intelligent Decisions.
          </h2>
          <div className="parallax-copy self-end">
            <div className="max-w-2xl space-y-6 text-xl leading-relaxed text-graphite md:text-2xl">
              <p>
                I am a Machine Learning Engineer and AI Systems Builder from Andhra Pradesh, focused on turning data,
                models, and automation workflows into practical intelligence products.
              </p>
              <p>
                My work sits at the intersection of predictive modeling, feature engineering, Python development, and
                user-facing AI applications. I build systems that do more than display data: they classify risk, forecast
                behavior, identify weak signals, and help people make better decisions faster.
              </p>
              <p>
                I am currently building a foundation in Artificial Intelligence and Machine Learning through B.Tech AIML,
                internships, buildathons, and project-based execution across computer vision, fraud analysis, customer
                intelligence, academic analytics, and agentic AI workflows.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-px bg-white/10">
              {["8.8 CGPA", "2024-2028 B.Tech AIML", "Machine Learning Intern", "Multiple AI Projects Delivered"].map((metric) => (
                <div key={metric} className="bg-black/70 p-5 backdrop-blur-md md:p-8">
                  <p className="text-xl font-black md:text-3xl">{metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="case-mask flex gap-8 overflow-hidden whitespace-nowrap border-y border-white/10 py-10">
          {[...expertise, ...expertise].map((item, index) => (
            <motion.span
              key={`${item}-${index}`}
              className="text-[clamp(2.6rem,7vw,8rem)] font-black uppercase leading-none text-white"
              animate={{ x: ["0%", "-55%"] }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </section>

      <section id="projects" className="relative z-10 px-5 py-24 md:px-10 lg:px-14">
        <SectionLabel>Featured Projects</SectionLabel>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="reveal-line max-w-5xl text-[clamp(3.5rem,10vw,11rem)] font-black leading-[0.86]">
            Case Studies In Predictive Intelligence.
          </h2>
          <p className="max-w-md text-lg text-graphite">
            Each system is framed as a production-minded AI product: signal, model, decision, and action.
          </p>
        </div>
        <div className="space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="group relative min-h-[62vh] overflow-hidden border border-white/10 bg-white/[0.025] p-6 backdrop-blur-sm md:p-10"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                alt={project.imageAlt}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.24] grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-[0.34]"
                src={project.image}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(59,130,246,0.18),transparent_34rem)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full min-h-[52vh] flex-col justify-between">
                <div className="flex items-start justify-between gap-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.42em] text-voltage">{project.kicker}</p>
                  <span className="text-[clamp(3rem,8vw,8rem)] font-black leading-none text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                  <div>
                    <a
                      className="block max-w-4xl transition duration-300 hover:text-voltage"
                      href={project.url}
                      aria-label={`Open ${project.title} GitHub repository`}
                    >
                      <h3 className="text-[clamp(2.7rem,7vw,7.5rem)] font-black leading-[0.88]">
                      {project.title}
                      </h3>
                    </a>
                    <p className="mt-5 max-w-2xl text-xl text-graphite md:text-2xl">{project.subtitle}</p>
                    <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
                      <div className="border border-white/10 bg-black/45 p-5 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-voltage">Problem</p>
                        <p className="mt-4 text-base leading-relaxed text-white/78">{project.problem}</p>
                      </div>
                      <div className="border border-white/10 bg-black/45 p-5 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-voltage">Solution</p>
                        <p className="mt-4 text-base leading-relaxed text-white/78">{project.solution}</p>
                      </div>
                    </div>
                    <a
                      className="magnetic mt-8 inline-flex min-h-12 items-center gap-3 border border-white/15 bg-white/[0.04] px-5 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:border-voltage/70"
                      href={project.url}
                    >
                      Open GitHub Report
                      <Github size={16} />
                    </a>
                  </div>
                  <div className="grid gap-3">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center justify-between border-b border-white/10 py-3 text-sm uppercase tracking-[0.2em] text-white/80">
                        <span>{feature}</span>
                        <ArrowUpRight className="text-voltage" size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="journey" className="relative z-10 px-5 py-28 md:px-10 lg:px-14">
        <SectionLabel>Experience</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="reveal-line text-[clamp(3.4rem,9vw,10rem)] font-black leading-[0.88]">Signal Over Time.</h2>
          <div className="border-l border-white/15">
            {experience.map(([year, role, org, body]) => (
              <motion.div
                key={`${year}-${role}`}
                className="relative min-h-48 pl-8 md:pl-12"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-voltage shadow-voltage" />
                <p className="text-sm font-semibold tracking-[0.38em] text-voltage">{year}</p>
                <h3 className="mt-3 text-3xl font-black md:text-5xl">{role}</h3>
                <p className="mt-2 text-xl text-white/70">{org}</p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-28 md:px-10 lg:px-14">
        <SectionLabel>Events & Hackathons</SectionLabel>
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <h2 className="reveal-line text-[clamp(3.4rem,9vw,10rem)] font-black leading-[0.88]">
            Built In Public, Tested In Arenas.
          </h2>
          <p className="max-w-xl text-xl leading-relaxed text-graphite">
            Beyond coursework and internships, I actively participate in hackathons, workshops, quizzes, and AI programs
            that sharpen execution speed, technical confidence, teamwork, and real-world problem solving.
          </p>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {events.map((event, index) => (
            <motion.article
              key={event.name}
              className="group min-h-80 bg-black/82 p-6 backdrop-blur-md transition md:p-8"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.65, delay: (index % 4) * 0.06 }}
              whileHover={{ backgroundColor: "rgba(59,130,246,0.08)", y: -4 }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-voltage">{event.type}</p>
                <span className="text-5xl font-black leading-none text-white/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-12 text-3xl font-black leading-[0.95] md:text-4xl">{event.name}</h3>
              <p className="mt-6 text-base leading-relaxed text-graphite">{event.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 min-h-screen px-5 py-28 md:px-10 lg:px-14">
        <SectionLabel>Technology Cloud</SectionLabel>
        <div className="grid min-h-[70vh] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <h2 className="reveal-line text-[clamp(3.3rem,9vw,10rem)] font-black leading-[0.9]">
            Tools For Intelligent Systems.
          </h2>
          <div className="relative min-h-[520px]">
            {tech.map((item, index) => (
              <motion.div
                key={item}
                className="absolute border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur-md"
                style={{
                  left: `${12 + ((index * 23) % 68)}%`,
                  top: `${8 + ((index * 31) % 78)}%`
                }}
                animate={{ y: [0, index % 2 === 0 ? -18 : 18, 0], rotate: [0, index % 2 === 0 ? 2 : -2, 0] }}
                transition={{ duration: 5 + (index % 5), repeat: Infinity, ease: "easeInOut" }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-28 md:px-10 lg:px-14">
        <SectionLabel>Certifications</SectionLabel>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {certifications.map((cert) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              className="min-h-56 bg-black/82 p-7 backdrop-blur-md md:p-10"
              whileHover={{ backgroundColor: "rgba(59,130,246,0.08)", y: -4 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-voltage">Verified Signal</p>
              <h3 className="mt-9 text-3xl font-black md:text-5xl">{cert.title}</h3>
              <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Open Credential
                <ArrowUpRight size={15} />
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 flex min-h-screen items-center px-5 py-28 md:px-10 lg:px-14">
        <div className="w-full">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="reveal-line max-w-6xl text-[clamp(4rem,12vw,14rem)] font-black leading-[0.78]">
            BUILD THE FUTURE WITH AI
          </h2>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4 text-lg text-graphite">
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.email}><Mail size={18} /> tarunyenduri12@gmail.com</a>
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.phone}><Phone size={18} /> +91 9392157226</a>
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.linkedin}><Linkedin size={18} /> LinkedIn</a>
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.github}><Github size={18} /> GitHub</a>
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.googleSkills}><ArrowUpRight size={18} /> Google Skills</a>
              <a className="flex items-center gap-3 text-white transition hover:text-voltage" href={profileLinks.resume}><Download size={18} /> Resume</a>
              <p className="flex items-center gap-3 text-white/70"><MapPin size={18} /> Pedana, Andhra Pradesh, India</p>
            </div>
            <form className="grid gap-4" onSubmit={handleContactSubmit}>
              <input className="min-h-14 border border-white/10 bg-white/[0.035] px-5 text-white outline-none transition focus:border-voltage" name="name" placeholder="Name" required />
              <input className="min-h-14 border border-white/10 bg-white/[0.035] px-5 text-white outline-none transition focus:border-voltage" name="email" placeholder="Email" type="email" required />
              <textarea className="min-h-40 resize-none border border-white/10 bg-white/[0.035] px-5 py-4 text-white outline-none transition focus:border-voltage" name="message" placeholder="Project, collaboration, or AI system idea" required />
              <button className="magnetic inline-flex min-h-14 items-center justify-center gap-3 bg-voltage px-6 text-sm font-black uppercase tracking-[0.24em] text-white disabled:cursor-wait disabled:opacity-60" type="submit" disabled={formStatus === "opening"}>
                {formStatus === "opening" ? "Opening Gmail" : "Send Signal"}
                <Send size={17} />
              </button>
              <p className="text-sm leading-relaxed text-graphite">
                This opens Gmail with your address and the visitor&apos;s message ready to send.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
