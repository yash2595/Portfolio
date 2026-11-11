export const P = {
  name: "Yash Mishra",
  roleA: "Full Stack Developer",
  roleB: "AI Engineer",
  email: "yashmishra2147@gmail.com",
  phone: "+91 73003 89702",
  // Put your resume PDF at /public/resume.pdf and set this to "/resume.pdf" to show a Download Resume button. "" hides it.
  resume: "",
  github: "https://github.com/yash2595",
  linkedin: "https://linkedin.com/in/yash-mishra-dev",
};

export const HERO = {
  base: "/images/yash.webp",
  reveal: "/images/yash.webp",
  baseFilter: "grayscale(1) contrast(1.15) brightness(.98)",
  revealFilter: "saturate(1.15) contrast(1.04)",
};

export const NAV: [string, string][] = [["About", "#sec-identity"], ["Work", "#sec-showcase"], ["Journey", "#sec-journey"], ["Stack", "#sec-skills"], ["Contact", "#sec-contact"]];

export const METRICS: [number, string, string][] = [[8, "B.Tech CGPA", "8.0"], [4, "Internships", "4"], [900, "Teams beaten as SNU Hackathon finalist", "900+"], [200, "Attendees at GDG events I led", "200+"]];

export const ROLES = ["Full Stack Developer", "AI Engineer", "React · Node · MongoDB", "LLM Product Builder"];

export type Project = { title: string; tag: string; kind: "exam" | "chat" | "chart" | "grid"; hue: number; what: string; points: string[]; stack: string[]; live?: string; code?: string; shot?: string };

// `shot` = real screenshot path in /public (e.g. "/images/projects/mylat.webp"). Without it, live sites auto-load a live preview, else an animated illustration.
// Set `live` on DAM AI Guardian and Raah Setu once you have their deployed URLs; buttons appear automatically.
export const PROJECTS: Project[] = [
  {
    title: "MyLAT", tag: "Launched product · Ed-tech", kind: "exam", hue: 222, live: "https://mylatindia.com/",
    what: "Level Assessment Test platform. A student takes one 60-minute test, gets a verified Level 1–5 and a QR-verifiable certificate, then is matched to placement opportunities.",
    points: ["100-question timed exam with server-side timer and autosave", "Registration, payment and weekend slot booking", "QR-verifiable certificates and candidate dashboard"],
    stack: ["Full Stack", "Auth", "Payments", "QR Certificates"],
  },
  {
    title: "MantraSetu · Saarthi AI", tag: "Live product · AI", kind: "chat", hue: 24, live: "https://saarthi-mantrasetu.vercel.app/",
    what: "Spiritual AI platform to discover pujas and connect with pandits. Saarthi, the conversational assistant, understands what the user needs and guides them.",
    points: ["Intent-aware chat assistant (LLMs + NLP)", "Browse pujas and connect with pandits", "Tested end to end with Playwright, deployed on Vercel"],
    stack: ["Python", "LLMs", "NLP", "Node.js"],
  },
  {
    title: "DAM AI Guardian", tag: "Live project · Monitoring", kind: "chart", hue: 188, live: "https://dam-ai-guardian-sx3t.vercel.app/login", code: P.github,
    what: "Full-stack dam safety monitoring app. A real-time dashboard tracks incoming data continuously and raises alerts. Deployed on Vercel with a login-protected dashboard.",
    points: ["Real-time dashboard and alerting", "REST API with MongoDB storage"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Raah Setu", tag: "Project · Community", kind: "grid", hue: 262, code: P.github,
    what: "Community resource-sharing platform where listings are organised into clear categories, with MongoDB queries tuned through indexing.",
    points: ["Categorised resource listings", "Index-tuned queries for faster reads"],
    stack: ["HTML/CSS", "JavaScript", "Express", "MongoDB"],
  },
];

// start/end are months since Nov 2024 (used to draw the timeline). Axis runs to Dec 2026 (JOURNEY_SPAN).
export const JOURNEY_SPAN = 26;
export const JOURNEY_NOW = 24.35; // ~11 Nov 2026
export type Job = { org: string; via?: string; role: string; when: string; status: "ongoing" | "done"; start: number; end: number; points: string[]; stack: string[] };
// TODO: add your real Internboot responsibilities (points) so this card is specific.
export const JOURNEY: Job[] = [
  { org: "Internboot", role: "Full Stack Intern", when: "19 Aug 2026 – Present", status: "ongoing", start: 21.6, end: JOURNEY_NOW, points: ["Working on full-stack web development tasks as part of the Internboot internship programme"], stack: ["React", "Node.js", "MongoDB"] },
  { org: "MantraSetu", role: "Backend / AI Intern", when: "Jul 2026 – 3 Oct 2026", status: "done", start: 20, end: 23.07, points: ["Built REST APIs with Node.js and Express", "Designed MongoDB schemas for a conversational AI navigation product"], stack: ["Node.js", "Express", "MongoDB"] },
  { org: "AWS Generative AI", via: "AICTE EduSkills", role: "Virtual Intern", when: "Jan – Mar 2026", status: "done", start: 14, end: 17, points: ["10-week programme on generative AI with AWS", "Deployed 3+ cloud-based AI applications using S3 and Lambda"], stack: ["AWS S3", "Lambda", "GenAI"] },
  { org: "Vault of Codes", role: "Web Development Intern", when: "Nov – Dec 2024", status: "done", start: 0, end: 2, points: ["Built responsive React apps and RESTful APIs", "Integrated MongoDB and MySQL to cut query response time"], stack: ["React", "Node.js", "MySQL"] },
];

export const BADGES: [string, string, string][] = [["Node.js", "8%", "12%"], ["React", "70%", "8%"], ["MongoDB", "80%", "46%"], ["LLMs", "66%", "82%"], ["Python", "6%", "70%"], ["AWS", "2%", "40%"]];

export const STACK: [string, string[]][] = [
  ["Frontend", ["React.js", "Next.js", "HTML5", "CSS3", "Responsive design"]],
  ["Backend & databases", ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL"]],
  ["AI engineering", ["LLM integration", "NLP", "Conversational AI", "AWS GenAI", "Python"]],
  ["Cloud & deploy", ["AWS S3 & Lambda", "Vercel"]],
  ["Languages & CS", ["JavaScript", "Python", "Java", "SQL", "DSA", "OOP", "DBMS"]],
  ["Tooling", ["Git & GitHub", "Postman", "Playwright", "VS Code"]],
];

export const SERVICES = [
  { t: "AI-powered products", b: ["LLM chat and guidance flows", "Intent understanding with NLP"], s: ["Python", "LLMs", "Node.js"] },
  { t: "Full-stack applications", b: ["REST APIs with validation", "Schema design and indexing"], s: ["Express", "MongoDB", "MySQL"] },
  { t: "SaaS & business portals", b: ["Auth, dashboards, admin panels", "Deployed and documented"], s: ["React", "Vercel", "AWS"] },
  { t: "Landing pages", b: ["Fast, responsive layouts", "Motion that serves the story"], s: ["Next.js", "GSAP", "Tailwind"] },
];

export const FACTS: [string, string][] = [["Based in", "India (IST)"], ["Right now", "Interning at Internboot"], ["Focus", "Full Stack + AI"], ["Open to", "Full Stack & AI roles"]];

export const ACHIEVE = [
  { n: 900, suffix: "+", dec: 0, title: "SNU Hackathon finalist", d: "Reached the finals out of 900+ competing teams.", icon: "🏆" },
  { n: 200, suffix: "+", dec: 0, title: "GDG events led", d: "Led Google Developer Group events with 200+ attendees.", icon: "🎤" },
  { n: 4, suffix: "", dec: 0, title: "Internships done", d: "Across full stack, backend and generative AI work.", icon: "💼" },
];

export const EDU = { degree: "B.Tech, Computer Science & Engineering", school: "IMS Engineering College, Ghaziabad", cgpa: "8.0", subjects: ["DSA", "OOP", "DBMS", "SQL", "Java"] };

export const WHY = [
  ["Frontend to database, one person", "I build the React or Next.js interface, the Node and Express API, and the MongoDB or MySQL layer behind it."],
  ["AI that actually ships", "LLM and NLP features wired into real products, like the Saarthi assistant on MantraSetu."],
  ["Live, not just local", "MyLAT is launched, and MantraSetu and DAM AI Guardian are deployed and open to try."],
  ["Tested before it ships", "End-to-end testing with Playwright and index-tuned queries to keep things fast."],
];

export const STEPS = [
  { t: "Understand", d: "Start with the goal, the users and the constraints, so the right thing gets built.", tags: ["Requirements", "User flows"] },
  { t: "Design", d: "Plan the data model and API contracts first, then the screens that sit on top.", tags: ["Schema design", "REST APIs"] },
  { t: "Build", d: "React or Next.js frontends, Node and Express backends, and AI features through LLMs.", tags: ["React", "Node.js", "LLMs"] },
  { t: "Ship & improve", d: "Deploy to Vercel or AWS, test end to end, then iterate on real feedback.", tags: ["Vercel", "AWS", "Playwright"] },
];

export const FAQ = [
  ["What roles are you looking for?", "Full Stack Developer and AI Engineer roles, plus project collaborations."],
  ["What is your tech stack?", "React and Next.js on the frontend, Node.js and Express with MongoDB or MySQL on the backend, Python and LLM integration for AI, deployed on Vercel and AWS."],
  ["Have you shipped anything live?", "Yes. MyLAT is a launched ed-tech product, and MantraSetu Saarthi AI and DAM AI Guardian are both live. Links are in the Work section."],
  ["What is the best way to reach you?", "Email or WhatsApp is fastest. The contact section has the form, a Gmail compose button and my phone number."],
  ["Where are you based?", "India, on IST (UTC+5:30)."],
];
