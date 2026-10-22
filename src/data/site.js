// Everything you'll want to edit lives in this file.

export const site = {
  name: 'Abdul Rahman',
  fullName: 'Abdul Rahman Mohammad',
  role: 'UI/UX & Product Designer',
  location: 'Sharjah, UAE',
  email: 'abd.mohammad902@gmail.com',
  behance: 'https://www.behance.net/abdalramohamma2',
  linkedin: '#', // TODO: paste your LinkedIn URL
  cv: '/cv.pdf', // TODO: drop your CV into /public/cv.pdf
  available: true,
};

// TODO: replace with your real numbers
export const stats = [
  { value: 3, suffix: '+', label: 'years of experience', sub: 'web, mobile, SaaS & AI', note: 'Since 2023' },
  { value: 25, suffix: '+', label: 'projects delivered', sub: 'case studies, apps & landing pages', note: 'Freelance + Misraj', hot: true },
  { value: 95, suffix: '%', label: 'success rate', sub: 'projects approved & shipped', note: 'Approved by clients' },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'case', label: 'Case studies' },
  { id: 'web', label: 'Websites & landings' },
  { id: 'app', label: 'Mobile apps' },
];

export const projects = [
  {
    slug: 'mushaf-eqraa',
    title: 'Mushaf Eqraa',
    type: 'Case study',
    cats: ['case', 'web'],
    tags: ['Web platform', 'UX research', 'Admin'],
    desc: 'A calm Quran web platform — Mushaf reader, translation & tafsir, AI recitation and an admin dashboard.',
    cover: '/work/cover-mushaf.webp',
    href: '/work/mushaf-eqraa',
    accent: '#2FD39A',
    size: 'wide',
  },
  {
    slug: 'hotello',
    title: 'Hotello',
    type: 'Case study',
    cats: ['case', 'app'],
    tags: ['Mobile app', 'Full case study'],
    desc: 'Hotel booking app — a long, end-to-end process from research to usability testing.',
    cover: '/work/cover-hotello.webp',
    href: 'https://www.behance.net/gallery/255495897/HOTEL-APP-UIUX-CASE-STUDY',
    accent: '#5B7CFF',
    size: 'narrow',
  },
  {
    slug: 'escrow',
    title: 'Escrow App',
    type: 'Case study',
    cats: ['case', 'app'],
    tags: ['Mobile app', 'Fintech', 'Arabic'],
    desc: 'Escrow payments app that keeps both sides of a deal protected until it’s done.',
    cover: '/work/cover-escrow.webp',
    href: 'https://www.behance.net/gallery/253518993/UIUx-Case-Study-Escrow-app',
    accent: '#2AA6D8',
    size: 'narrow',
  },
  {
    slug: 'orbit',
    title: 'Orbit',
    type: 'Landing page',
    cats: ['web'],
    tags: ['SaaS', 'AI', 'Landing page'],
    desc: 'An AI daily-brief SaaS landing — glowing horizon, live dashboard and motion throughout.',
    cover: '/work/cover-orbit.webp',
    href: null, // TODO: link once it's live
    accent: '#3B8BFF',
    size: 'wide',
  },
  {
    slug: 'tadfuq',
    title: 'Tadfuq',
    type: 'Landing page',
    cats: ['web'],
    tags: ['Fintech', 'RTL / LTR', 'AI'],
    desc: 'Arabic-first cash-flow forecasting SaaS with bilingual layouts and live charts.',
    cover: '/work/cover-tadfuq.webp',
    href: null,
    accent: '#2EF5A0',
    size: 'half',
  },
  {
    slug: 'ai-analyst',
    title: 'AI Data Analyst',
    type: 'Landing page',
    cats: ['web'],
    tags: ['Landing page', 'AI'],
    desc: 'Landing page for an AI analyst that turns data into insights, predictions and conversations.',
    cover: '/work/cover-ai-analyst.webp',
    href: 'https://www.behance.net/gallery/252251915/Uiux-data-analysis-landing',
    accent: '#8B7BFF',
    size: 'half',
  },
  {
    slug: 'growth',
    title: 'Growth',
    type: 'Landing page',
    cats: ['web'],
    tags: ['SaaS', 'Landing page'],
    desc: 'A business-growth SaaS landing page — ten sections that tell one story.',
    cover: '/work/cover-growth.webp',
    href: '/work/growth',
    accent: '#3D5BFF',
    size: 'strip',
  },
];

export const process = [
  { n: '01', title: 'Understand', text: 'Interviews, audits and what already exists.', chips: ['Research', 'Audits'] },
  { n: '02', title: 'Define', text: 'Personas, journeys and the real problem.', chips: ['Personas', 'HMW'] },
  { n: '03', title: 'Ideate', text: 'Brainstorms, flows, IA and sketches.', chips: ['Flows', 'IA'], hot: true },
  { n: '04', title: 'Design', text: 'Wireframes → hi-fi UI → design system.', chips: ['UI', 'System'] },
  { n: '05', title: 'Validate', text: 'Prototype, test with users, QA the build.', chips: ['Testing', 'QA'] },
];

export const experience = [
  {
    period: 'Dec 2024 — Jul 2026',
    role: 'UI/UX Designer',
    company: 'Misraj Technology · Remote, Saudi Arabia',
    text: 'Designed web platforms, SaaS dashboards and AI-powered interfaces end to end — research, flows, UI, design systems and design QA with developers.',
    tags: ['Web', 'Dashboards', 'AI'],
    current: true,
  },
  {
    period: 'Before 2024',
    role: 'Freelance UI/UX Designer',
    company: 'Independent',
    text: 'Mobile apps and landing pages for clients across fintech, travel and business growth.',
    tags: ['Mobile', 'Landing pages'],
  },
  {
    period: 'Earlier',
    role: 'Graphic Designer',
    company: 'Independent',
    text: 'Branding, social media campaigns and video editing — where my eye for detail started.',
    tags: ['Branding', 'Social'],
  },
];

export const tools = [
  { name: 'Figma', glyph: 'F', from: '#A259FF', to: '#F24E1E' },
  { name: 'FigJam', glyph: 'J', from: '#9747FF', to: '#FFC700' },
  { name: 'Adobe Suite', glyph: 'Ps Ai', from: '#FF4433', to: '#C0050D' },
  { name: 'Claude Code', glyph: '✳', from: '#D97757', to: '#8A4B32' },
];
