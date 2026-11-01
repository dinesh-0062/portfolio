export const profile = {
  email: "dineshjangra0062@gmail.com",
  linkedin: "https://www.linkedin.com/in/dinesh-jangra-web",
  github: "https://github.com/dinesh-0062",
  leetcode: "https://leetcode.com/u/Dineshjangra/",
  resume: "/resume.pdf", // apna PDF public/resume.pdf mein rakho
};

export const services = [
  { icon: "</>", title: "Full stack web apps", text: "I build React and Next.js frontends and connect them to Node.js or FastAPI backends." },
  { icon: "AI", title: "AI features", text: "Resume analysis, image search and other AI features that live inside a real product." },
  { icon: "API", title: "Secure REST APIs", text: "JWT auth, clean endpoints, and SQL or MongoDB underneath." },
  { icon: "Edu", title: "Training and mentoring", text: "I teach students at Indixpert and explain the why behind the code, not just the syntax." },
];

export const skillGroups = [
  { title: "Frontend", items: ["React.js", "Next.js", "JavaScript", "Bootstrap", "Sass"] },
  { title: "Backend", items: ["Python", "FastAPI", "Node.js", "Express.js"] },
  { title: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "SQL Server"] },
  { title: "Tools and cloud", items: ["Git", "GitHub", "Postman", "GCP", "Vercel"] },
  { title: "Low-code", items: ["Mendix", "Microflows", "Domain models", "Pages and layouts"] },
  // 10 tools ki jagah woh 4 jo aap roz use karte ho (badal sakte ho)
  { title: "AI in my workflow", items: ["Claude Code", "GitHub Copilot", "Cursor", "ChatGPT"] },
];

// AI tools group ke neeche ek line dikhane ke liye (Skills.jsx mein)
export const aiNote =
  "I use AI tools to move faster, then read, test and own every line that ships.";

export const projects = [
  {
    code: "AK",
    title: "AI Klarity",
    tagline: "Understand. Prepare. Grow.",
    text: "Upload a resume and see how it reads, where your skills fall short, and practice for the interview.",
    role: "", // yahan likho aapne kya banaya, jaise "I built the resume parser and the auth flow."
    tags: ["React.js", "FastAPI", "AI", "MongoDB"],
    live: "", // deployed link
    code: "", // GitHub repo link
  },
  {
    code: "KM",
    title: "KMAR",
    tagline: "A clearer view of every stay.",
    text: "A hotel management dashboard with charts for bookings, revenue and daily operations.",
    role: "",
    tags: ["Next.js", "ApexCharts", "Dashboard"],
    live: "",
    repo: "",
  },
  {
    code: "EC",
    title: "E-commerce Analytics Dashboard",
    tagline: "Every store number in one place.",
    text: "An admin dashboard for a store: revenue, orders, visitors, device reports, sales forecast and bestsellers.",
    role: "",
    tags: ["React.js", "Bootstrap", "ApexCharts", "Analytics"],
    live: "",
    repo: "",
  },
];

export const timeline = [
  { title: "Full Stack Engineer, Indixpert", when: "March 2026 to now", text: "Building end-to-end products with React, FastAPI and PostgreSQL, with JWT auth and optimized SQL." },
  { title: "Full Stack Developer apprentice, Indixpert", when: "March 2025 to May 2026", text: "Frontend with React and Next.js, backend with Node.js, and my first steps into cloud deployment." },
];

// Sirf asli posts. "url" mein us post ka LinkedIn link paste karo.
export const posts = [
  { tag: "Security", title: "How does login actually work?", text: "JWTs, signed tokens, and why HttpOnly cookies beat localStorage.", url: "" },
  { tag: "Web basics", title: "What happens when you type google.com?", text: "DNS, TCP, HTTP and rendering, in six simple steps.", url: "" },
  { tag: "AI", title: "MCP finally clicked", text: "What the Model Context Protocol is and why it matters for AI apps.", url: "" },
];

export const exploring = ["MCP", "RAG", "GCP", "AWS", "System design"];