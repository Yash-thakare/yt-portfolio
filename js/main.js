'use strict';
/* ---------- DATA (edit here to update the whole site) ---------- */
const JOBS = [
  { id: 'cmots', role: 'Software Developer', org: 'CMOTS Internet Technologies Pvt. Ltd.', place: 'Mumbai', when: 'Feb 2026 to present', points: [
    'Architected a full-stack HR Portal with Laravel 10/11 and React.js, managing employee records and attendance for 100+ active users.',
    'Built bidirectional real-time messaging over WebSocket and tuned Laravel Queues, cutting end-user support response time by 40%.',
    'Engineered a secure OTP-based login using Eloquent ORM and database migrations, strengthening platform authentication.',
    'Developed responsive UI components with Blade and React.js, reducing frontend bug reports by 25% through standardized design patterns.' ] },
  { id: 'jain', role: 'Junior Backend Developer', org: 'Jain Irrigation System Pvt. Ltd.', place: 'Jalgaon', when: 'Jul 2024 to Feb 2026', points: [
    'Resolved 50+ critical production defects across PHP/Laravel and WordPress platforms, reducing total system downtime by 30%.',
    'Optimized complex MySQL queries with indexing strategies, improving page load by 35% on mission-critical agriculture modules.',
    'Integrated 10+ third-party RESTful APIs for automated reporting, payment processing and notifications.',
    'Maintained and scaled core backend architecture supporting 1,000+ concurrent users across India.' ] }
];
const SKILLS = [
  ['Backend','PHP (Core/OOP)'],['Backend','Laravel 10/11'],['Backend','RESTful API Development'],['Backend','WebSocket'],['Backend','Database Optimization'],
  ['Frontend','React.js'],['Frontend','JavaScript (ES6+)'],
  ['Data','MySQL'],
  ['Cloud & AI','AWS (EC2, S3, IAM)'],['Cloud & AI','RAG fundamentals'],
  ['Workflow','Git & GitHub'],['Workflow','Agile/Scrum']
];
const PROJECTS = [
  { name: 'HR Portal & Chat Connect', text: 'Full-stack HR system with real-time one-to-one chat, OTP login and attendance tracking.', tags: ['Laravel','React.js','WebSocket','AWS'] },
  { name: 'Blog Application', text: 'Real-time blogging platform with full CRUD operations and 95% live data-sync accuracy.', tags: ['React.js','Laravel'] },
  { name: 'E-Commerce Platform', text: 'Online store with secure authentication, product search and Stripe payments.', tags: ['Laravel MVC','Stripe'] }
];
const CHUNKS = [
  { s: 'Summary', t: 'Yashwant is a result-oriented Full Stack Developer with 2+ years of experience building high-performance web applications and scalable REST APIs with Laravel, React.js and AWS. He is open to relocation to the UAE.' },
  { s: 'CMOTS', t: 'At CMOTS Internet Technologies in Mumbai he architected an HR Portal with Laravel 10/11 and React.js used by 100+ active employees for records and attendance.' },
  { s: 'CMOTS', t: 'He implemented real-time messaging with WebSocket and optimized Laravel Queues, which reduced support response time by 40%.' },
  { s: 'CMOTS', t: 'He built a secure OTP-based authentication system with Eloquent ORM and database migrations, and cut frontend bug reports by 25% with standardized React and Blade components.' },
  { s: 'Jain Irrigation', t: 'At Jain Irrigation System he fixed 50+ critical production defects in PHP, Laravel and WordPress, reducing system downtime by 30%.' },
  { s: 'Jain Irrigation', t: 'He optimized MySQL queries with indexing, improving page load performance by 35%, and tuned database performance for agriculture modules.' },
  { s: 'Jain Irrigation', t: 'He integrated 10+ third-party REST APIs for reporting, payments and notifications and scaled backend architecture for 1,000+ concurrent users across India.' },
  { s: 'Skills', t: 'Core skills: PHP, Laravel, React.js, JavaScript ES6+, MySQL, REST API development, WebSocket, Git and GitHub, Agile and Scrum.' },
  { s: 'Cloud', t: 'On AWS he works with EC2, S3 and IAM, deployed his HR Portal on AWS, and is preparing for the AWS Certified Solutions Architect exam with Network Kings.' },
  { s: 'AI & RAG', t: 'He completed Introduction to RAG from Great Learning and Introduction to Artificial Intelligence from Simplilearn in 2025, and is applying retrieval-augmented generation ideas to his web projects.' },
  { s: 'Education', t: 'He holds a PG Diploma in Advanced Computing (PG-DAC) from C-DAC Bengaluru, 2023, and a Bachelor of Technology, 2019 to 2022.' },
  { s: 'Projects', t: 'Projects include the HR Portal and Chat Connect with real-time chat on AWS, a Blog Application with 95% live sync accuracy, and an E-Commerce Platform with Stripe payments built on Laravel MVC.' },
  { s: 'Contact', t: 'He is based in Mumbai, India. Email yashwantthakare4444@gmail.com or call +91 880-642-0045. He is open to relocating to the UAE.' }
];
const SUGGESTIONS = ['What AWS experience does he have?','Has he worked with RAG or AI?','How did he improve performance?','Is he open to relocating?','What projects has he built?'];

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- Counters ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  const end = +e.target.dataset.count; if (reduce) { e.target.textContent = end; return; }
  const t0 = performance.now();
  (function tick(t) { const p = Math.min((t - t0) / 1100, 1); e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => io.observe(el));

/* ---------- RAG demo: TF-IDF retrieval ---------- */
const STOP = new Set('a an the and or of to in on for with is are was were be has have had he his him does do did what how which who why when yashwant any at by as it that this from about'.split(' '));
const SYN = { aws: ['cloud','ec2','s3','iam'], ai: ['rag','artificial','intelligence'], relocate: ['relocation','uae'], relocating: ['relocation','uae'], perf: ['performance'], improve: ['optimized','reduced','improving'], improved: ['optimized','reduced','improving'], faster: ['reduced','improving'], built: ['architected','developed','engineered'], experience: ['years'], contact: ['email','call'], reach: ['email','call'], study: ['education','diploma'], degree: ['diploma','bachelor'] };
const tok = s => s.toLowerCase().replace(/[^a-z0-9+.# ]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)).flatMap(w => [w, ...(SYN[w] || [])]);
const docs = CHUNKS.map(c => tok(c.s + ' ' + c.t));
const df = {}; docs.forEach(d => new Set(d).forEach(w => df[w] = (df[w] || 0) + 1));
const idf = w => Math.log(1 + CHUNKS.length / (1 + (df[w] || 0)));
function retrieve(q) {
  const qs = tok(q); if (!qs.length) return [];
  return docs.map((d, i) => {
    let s = 0; qs.forEach(w => { const tf = d.filter(x => x === w).length; if (tf) s += (1 + Math.log(tf)) * idf(w); });
    return { i, s: s / Math.sqrt(d.length) };
  }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
}
let typing;
function ask(q) {
  q = q.trim(); if (!q) return;
  const hits = retrieve(q), list = $('#chunks'), ans = $('#answer');
  clearInterval(typing);
  if (!hits.length) {
    list.innerHTML = '<li class="text-slate-400">No matching chunks found.</li>';
    ans.textContent = "I couldn't find that in the resume. Try asking about AWS, Laravel, React, projects, education or relocation.";
    return;
  }
  const max = hits[0].s;
  list.innerHTML = hits.map(h => `<li class="bg-[#0B1424] border border-slate-700 rounded-lg p-3">
    <div class="flex justify-between font-mono text-xs text-slate-400"><span>${esc(CHUNKS[h.i].s)}</span><span>${(h.s / max).toFixed(2)}</span></div>
    <div class="h-1 bg-slate-700 rounded mt-2"><div class="bar h-1 bg-mint rounded" style="width:0" data-w="${Math.round(h.s / max * 100)}"></div></div>
    <p class="mt-2 text-slate-300">${esc(CHUNKS[h.i].t.slice(0, 110))}…</p></li>`).join('');
  requestAnimationFrame(() => list.querySelectorAll('.bar').forEach(b => b.style.width = b.dataset.w + '%'));
  const text = hits.slice(0, 2).map(h => CHUNKS[h.i].t).join(' ');
  if (reduce) { ans.classList.remove('caret'); ans.textContent = text; return; }
  ans.textContent = ''; ans.classList.add('caret'); let n = 0;
  typing = setInterval(() => { ans.textContent = text.slice(0, n += 3); if (n >= text.length) { clearInterval(typing); ans.classList.remove('caret'); } }, 14);
}
$('#suggestions').innerHTML = SUGGESTIONS.map(s => `<button class="chip text-sm border border-slate-600 rounded-full px-3 py-1.5 hover:border-mint hover:text-mint">${esc(s)}</button>`).join('');
$('#suggestions').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { $('#q').value = b.textContent; ask(b.textContent); } });
$('#askBtn').onclick = () => ask($('#q').value);
$('#q').addEventListener('keydown', e => { if (e.key === 'Enter') ask(e.target.value); });

/* ---------- Experience tabs ---------- */
function showJob(id) {
  const j = JOBS.find(x => x.id === id);
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
  document.querySelectorAll('#tabs button').forEach(b => b.className = 'text-left px-4 py-3 rounded-lg border text-sm font-semibold ' + (b.dataset.id === id ? 'bg-ink text-white border-ink' : 'bg-white border-line hover:border-ink'));
  $('#job').innerHTML = `<h3 class="font-display font-bold text-2xl">${j.role}</h3>
    <p class="text-mute mt-1">${j.org}, ${j.place} · ${j.when}</p>
    <ul class="mt-5 space-y-3 leading-relaxed">${j.points.map(p => `<li class="pl-4 border-l-2 border-indigoX">${p}</li>`).join('')}</ul>`;
}
$('#tabs').innerHTML = JOBS.map(j => `<button role="tab" data-id="${j.id}">${j.org.split(' ').slice(0, 2).join(' ')}<span class="block font-normal opacity-70">${j.when}</span></button>`).join('');
$('#tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) showJob(b.dataset.id); });
showJob(JOBS[0].id);

/* ---------- Skills filter ---------- */
const groups = ['All', ...new Set(SKILLS.map(s => s[0]))];
function renderSkills(g) {
  $('#skillFilters').innerHTML = groups.map(x => `<button class="chip text-sm font-medium border border-line rounded-full px-4 py-1.5 bg-paper" aria-pressed="${x === g}" data-g="${x}">${x}</button>`).join('');
  $('#skillList').innerHTML = SKILLS.filter(s => g === 'All' || s[0] === g).map(s => `<li class="border border-line bg-paper rounded-full px-4 py-2 text-sm">${s[1]}</li>`).join('');
}
$('#skillFilters').addEventListener('click', e => { const b = e.target.closest('button'); if (b) renderSkills(b.dataset.g); });
renderSkills('All');

/* ---------- Projects ---------- */
$('#projectGrid').innerHTML = PROJECTS.map(p => `<article class="bg-white border border-line rounded-xl p-6 flex flex-col">
  <h3 class="font-display font-bold text-xl">${p.name}</h3>
  <p class="mt-3 text-mute leading-relaxed flex-1">${p.text}</p>
  <ul class="mt-5 flex flex-wrap gap-2">${p.tags.map(t => `<li class="font-mono text-xs bg-paper border border-line rounded px-2 py-1">${t}</li>`).join('')}</ul></article>`).join('');

/* ---------- Misc ---------- */
$('#yr').textContent = new Date().getFullYear();
$('#copyMail').onclick = async e => {
  try { await navigator.clipboard.writeText('yashwantthakare4444@gmail.com'); e.target.textContent = 'Copied'; } catch { e.target.textContent = 'Copy failed'; }
  setTimeout(() => e.target.textContent = 'Copy email', 1800);
};
