import type { Experience, Education, Project, Award, Certification, Camp, Language } from "./types";

export const DEFAULT_EXPERIENCES: Experience[] = [
  { title: "Development Intern", meta: "December 2025 – Present · INDMoney · Remote", body: "Working on automating the role of a personal finance manager, explaining a financial report to a customer and providing actionable next steps through n8n workflows and AI agents." },
  { title: "Prefect & Student Council", meta: "September 2021 – May 2025 · Member of Student Governments @ DIA", body: "Initiating school-wide projects and events, raising $2000+ for local non-profits. Policies revision of the student code and ensuring compliance with attendance rules. Conflict resolution & fostering community spirit." },
  { title: "President & Mentor", meta: "September 2021 – August 2024 · Matheletes & RAP Program @ DIA", body: "Provided student mentorship and support—one-on-one mentorship to struggling students. Organized inter-school and outside school math competitions, coordinating logistics and engaging over 200 participants. Led interactive workshops on combinatorics, calculus, and number theory, engaging 50+ students per session." },
  { title: "Intern", meta: "June 2023 · Dubai International Academy", body: "Independently designing, conducting, and writing reports on physics, chemistry and biology experiments, enhancing scientific problem-solving skills." },
];

export const DEFAULT_EDUCATION: Education[] = [
  { title: "Bachelor of Engineering in Computer Science", meta: "September 2025 – Present · The Hong Kong University of Science and Technology", body: "Rising Freshman." },
  { title: "Diploma Program & Middle Years Program", meta: "September 2021 – May 2025 · Dubai International Academy", body: "Math AA HL, Physics HL, Chemistry HL, Digital Society HL, English Language and Literature SL, Spanish Ab Initio SL, Computer Science EE, & Theory of Knowledge." },
];

export const DEFAULT_PROJECTS: Project[] = [
  { title: "Financial Homomorphic Lattice Encryptor (FHLE)", date: "November 2023 – January 2025", subtitle: null, desc: "Lattice cryptography (SVP), homomorphic encryption for secure data transmission and computation.", img: "/images/projects/fhle.avif", link: "https://fhle.us/", cta: "Website", ctaHref: "https://sharma2007.github.io/FHLE/" },
  { title: "Safe and Secure Concerts (SSC)", date: "December 2023 – Feb 2024", subtitle: "Location & Vitals Tracking Band", desc: "Armband with RPi Zero 2W: BLE location tracking, vital signs, relay to central server via SOCKETS, real-time visualization.", img: "/images/projects/SSC.avif", link: null, cta: "Engineering Notebook", ctaHref: "https://drive.google.com/file/d/1uhaSlFYNLlDF_aEa95Xfuwy7jyIPm3VH/view?usp=sharing" },
  { title: "AI-Reparo", date: "December 2022 – March 2023", subtitle: "AI for Leading Edge Erosion (LEE)", desc: "AI-powered drones for detection and repair; Image Binarization + YOLO-v8; Unsaturated Polyester for blade repair.", img: "/images/projects/AI_Reparo.avif", link: null, cta: "Engineering Notebook", ctaHref: "https://drive.google.com/file/d/1MxfMhiraAbqJw_yqO5KkoPEZ7JrerQm2/view?usp=sharing" },
  { title: "Project Poseidon", date: "October 2021 – January 2022", subtitle: "Robotic System To Combat Eutrophication", desc: "Centralized robotic system for testing and treating eutrophicated water to restore natural equilibrium.", img: "/images/projects/posiden.avif", link: null, cta: "Deliverables & Presentation", ctaHref: "https://drive.google.com/drive/folders/1U9SuEk5wSFR7QIyxNRTSXn-Vcp8W67qo?usp=sharing" },
  { title: "GMailCrypt", date: "June 2021", subtitle: "Encrypting Emails Locally", desc: "CLI tool: RSA encryption, image-to-CSV, digital signatures.", img: "/images/projects/GMailCrypt.avif", link: null, cta: null, ctaHref: null },
];

export const DEFAULT_AWARDS: Award[] = [
  { title: "Fermat Contest", sub: "Certificate of Distinction (Top 25%) – May 2024", img: "/images/awards/Fermat.avif", alt: "Fermat Certificate" },
  { title: "Purple Math Comet", sub: "UAE No. 1 & Top 5.5% Worldwide – April 2024", img: "/images/awards/purple_math.avif", alt: "Purple Math Certificate" },
  { title: "Conrad Innovator", sub: "Conrad Foundation – February 2024", img: "/images/awards/Conrad.avif", alt: "Conrad Certificate" },
  { title: "FLL Abu Dhabi Regional Round", sub: "Champion's Runner Up – February 2024", img: "/images/awards/FLL_AD.avif", alt: "FLL Abu Dhabi" },
  { title: "National IOI Qualifier", sub: "UAE Rank 3 – January 2024", img: "/images/awards/IOIq.avif", alt: "IOI Qualifier" },
  { title: "Cayley Contest", sub: "Certificate of Distinction (Top 25%) – May 2023", img: "/images/awards/Cayley.avif", alt: "Cayley Certificate" },
  { title: "FLL UAE National Round", sub: "Core Values Award – March 2023", img: "/images/awards/FLL_DU_C.avif", alt: "FLL National" },
  { title: "FLL Dubai Regional Round", sub: "Champion's Runner Up – February 2023", img: "/images/awards/FLL DU.avif", alt: "FLL Dubai" },
  { title: "Bronze Honor", sub: "International Youth Math Challenge – December 2022", img: "/images/awards/IYMC.avif", alt: "IYMC" },
  { title: "Bebras Challenge", sub: "National Rank 44 – December 2022", img: "/images/awards/bebras.avif", alt: "Bebras" },
];

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  { title: "Learn Intermediate C++ Course", meta: "Codecademy – July 2025", img: "/images/certifications/Learn%20Intermediate%20C++%20Course.avif", alt: "Intermediate C++", skills: "Variable Scope & Storage Classes · Memory Management · Encapsulation · Inheritance · Polymorphism · Abstraction" },
  { title: "Learn C++ Course", meta: "Codecademy – July 2025", img: "/images/certifications/Learn%20C++%20Course.avif", alt: "C++", skills: "Variables · Conditionals & Logic · Loops · Vectors · Functions" },
  { title: "Learn Python & Ethical Hacking From Scratch", meta: "zSecurity – July 2023", img: "/images/certifications/p_h.avif", alt: "Python & Ethical Hacking", skills: null },
  { title: "Introduction to Quantum Computing", meta: "The Coding School – April 2023", img: "/images/certifications/quantum.avif", alt: "Quantum Computing", skills: null },
  { title: "The Complete Java Development Bootcamp", meta: "Udemy – May 2022", img: "/images/certifications/java.avif", alt: "Java Bootcamp", skills: null },
  { title: "100 Days of Code: Python Pro Bootcamp", meta: "London App Brewery – April 2022", img: "/images/certifications/python_100.avif", alt: "Python 100 Days", skills: null },
];

export const DEFAULT_CAMPS: Camp[] = [
  { title: "DexSchool of Leadership", meta: "August 2024 – June 2025", body: "India's first school of leadership and entrepreneurship for teenagers. Forbes highlights it as equipping young people to solve 21st-century problems. Chosen from a vast pool of applications for the DexSchool class of 2025.", img: "/images/camps/DexSchool.avif", alt: "DexSchool", flip: false },
  { title: "Proofs Camp", meta: "Mumbai, India – August 2024", body: "The Method of Contradiction; Fermat's Method of Infinite Descent; Modular Arithmetic; The Principle of Mathematical Induction; The Pigeon Hole Principle; Proof by Contrapositive.", img: "/images/camps/proofs_camp.avif", alt: "Proofs Camp", flip: true },
  { title: "Math.Biz", meta: "Hyderabad, India – June 2023", body: "Bonds, inflation, cashflows, insurance; Agency theory; unconventional assets (NFTs, patents); Elasticity of Demand; Cost Functions, Calculus, Mathematics in Demography; bond valuation, foreign exchange; variance, covariance, correlation.", img: "/images/camps/math_biz.avif", alt: "Math.Biz", flip: false },
  { title: "ISAKx Exploring Leadership", meta: "Society & Politics – September 2021 – June 2022", body: "Analyzed global issues (climate change, social justice, technology). Participated in workshops on emotional intelligence, systems thinking, and creative problem-solving.", img: "/images/camps/isakx.avif", alt: "ISAKx", flip: true },
];

export const DEFAULT_LANGUAGES: Language[] = [
  { name: "Hindi", level: "Mother Tongue", fill: 100 },
  { name: "English", level: "C1", fill: 90 },
  { name: "French", level: "A2", fill: 35 },
  { name: "Spanish", level: "A2", fill: 35 },
];
