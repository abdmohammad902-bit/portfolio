import Lenis from 'lenis';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* ---------- smooth scroll ---------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -90 });
    })
  );
}

/* ---------- split headings into words ---------- */
document.querySelectorAll('.split').forEach((el) => {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const wm = document.createElement('span'); wm.className = 'wm';
          const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++); w.textContent = part;
          wm.append(w); frag.append(wm);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains('w')) {
        if (n.classList.contains('acc')) {
          // keep the glowing accent word whole
          const wm = document.createElement('span'); wm.className = 'wm';
          n.classList.add('w'); n.style.setProperty('--i', i++);
          n.replaceWith(wm); wm.append(n);
        } else walk(n);
      }
    });
  };
  walk(el);
  // once the last word lands, let glows breathe outside their masks
  el.addEventListener('reveal', () => {
    const sd = parseFloat(getComputedStyle(el).getPropertyValue('--sd')) || 0;
    setTimeout(() => el.classList.add('done'), sd + i * 65 + 1150);
  }, { once: true });
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.dispatchEvent(new CustomEvent('reveal'));
    io.unobserve(e.target);
  }),
  { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
);
let pending = [...document.querySelectorAll('[data-reveal], .split, [data-count], [data-draw]')];
pending.forEach((el) => io.observe(el));
// safety net: fast jumps (anchor links, flick scrolls) can skip the observer
const sweep = () => {
  if (!pending.length) return;
  pending = pending.filter((el) => {
    if (el.classList.contains('in')) return false;
    if (el.getBoundingClientRect().top < innerHeight * 0.95) {
      el.classList.add('in'); el.dispatchEvent(new CustomEvent('reveal')); io.unobserve(el); return false;
    }
    return true;
  });
};

/* ---------- counters (odometer-style ease) ---------- */
document.querySelectorAll('[data-count]').forEach((el) => {
  const to = +el.dataset.count;
  const num = el.querySelector('.n');
  if (reduce) { num.textContent = to; return; }
  num.textContent = '0';
  el.addEventListener('reveal', () => {
    const t0 = performance.now(); const dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      num.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(tick); else el.classList.add('done');
    };
    requestAnimationFrame(tick);
  }, { once: true });
});

/* ---------- nav state + progress bar ---------- */
const nav = document.querySelector('.nav');
const prog = document.querySelector('.prog');
const onScroll = () => {
  const y = scrollY;
  nav?.classList.toggle('scrolled', y > 40);
  const max = document.documentElement.scrollHeight - innerHeight;
  prog?.style.setProperty('--p', max > 0 ? y / max : 0);
  scrollHooks.forEach((fn) => fn(y));
};
const scrollHooks = [sweep];
addEventListener('scroll', onScroll, { passive: true });

/* ---------- typing badge ---------- */
document.querySelectorAll('[data-type]').forEach((el) => {
  if (reduce) return;
  const txt = el.textContent; el.textContent = ''; el.classList.add('typing');
  setTimeout(() => {
    let k = 0;
    const t = setInterval(() => {
      el.textContent = txt.slice(0, ++k);
      if (k >= txt.length) { clearInterval(t); setTimeout(() => el.classList.remove('typing'), 1600); }
    }, 38);
  }, +el.dataset.delay || 0);
});

/* ---------- hero planet drifts up with scroll ---------- */
const hz = document.querySelector('[data-hz]');
if (hz && !reduce) scrollHooks.push((y) => { if (y < innerHeight * 1.5) hz.style.setProperty('--hzy', `${(-y * 0.18).toFixed(1)}px`); });

/* ---------- hero: tilted stage flattens with scroll ---------- */
const stage = document.querySelector('[data-tilt]');
if (stage && !reduce) {
  scrollHooks.push(() => {
    const r = stage.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, 1 - (r.top - innerHeight * 0.25) / (innerHeight * 0.6)));
    stage.style.setProperty('--tilt', `${(1 - p) * 22}deg`);
    stage.style.setProperty('--ts', 0.92 + p * 0.08);
  });
}

/* ---------- mouse parallax + spotlight ---------- */
if (fine && !reduce) {
  const pars = document.querySelectorAll('[data-dep]');
  const glowEl = document.querySelector('.mglow');
  addEventListener('pointermove', (e) => {
    const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
    pars.forEach((el) => {
      const d = +el.dataset.dep;
      el.style.transform = `translate3d(${px * d}px, ${py * d}px, 0)`;
    });
    if (glowEl) glowEl.style.transform = `translate(${e.clientX}px, ${e.clientY + scrollY}px)`;
  }, { passive: true });
  // magnetic buttons
  document.querySelectorAll('.mag').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width, dy = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  document.querySelectorAll('.spot').forEach((el) =>
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    })
  );
}

/* ---------- process arc draws with scroll ---------- */
const arc = document.querySelector('[data-arc]');
if (arc) {
  const path = arc.querySelector('.draw');
  const nodes = [...document.querySelectorAll('.step')];
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  const update = () => {
    const r = arc.getBoundingClientRect();
    const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25)));
    path.style.strokeDashoffset = len * (1 - p);
    nodes.forEach((n) => n.classList.toggle('lit', p >= +n.dataset.t - 0.02));
  };
  scrollHooks.push(update); update();
}

/* ---------- experience line fills ---------- */
const tl = document.querySelector('[data-timeline]');
if (tl) {
  scrollHooks.push(() => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    tl.style.setProperty('--fill', p);
  });
}

/* ---------- work filter (sliding pill + fade) ---------- */
const tabs = document.querySelector('[data-tabs]');
if (tabs) {
  const pill = tabs.querySelector('.pill');
  const btns = [...tabs.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('[data-cats]')];
  const move = (b) => { pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft - 5}px)`; };
  const select = (b) => {
    btns.forEach((x) => x.setAttribute('aria-selected', x === b));
    move(b);
    const cat = b.dataset.cat;
    cards.forEach((c) => {
      const show = cat === 'all' || c.dataset.cats.split(' ').includes(cat);
      c.classList.toggle('out', !show);
      c.setAttribute('aria-hidden', !show);
      c.classList.remove('pop'); void c.offsetWidth;
      if (show) c.classList.add('pop');
    });
    document.querySelector('.work-grid')?.setAttribute('data-filter', cat);
  };
  btns.forEach((b) => b.addEventListener('click', () => select(b)));
  addEventListener('resize', () => move(btns.find((b) => b.getAttribute('aria-selected') === 'true')));
  requestAnimationFrame(() => move(btns[0]));
}

/* ---------- case study: sticky table of contents ---------- */
const toc = document.querySelector('[data-toc]');
if (toc) {
  const links = [...toc.querySelectorAll('a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href')));
  const bar = toc.querySelector('.toc-bar i');
  const pct = toc.querySelector('.toc-pct');
  const body = document.querySelector('.story');
  scrollHooks.push(() => {
    let cur = 0;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
    if (body) {
      const r = body.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      bar.style.transform = `scaleX(${p})`;
      pct.textContent = `${Math.round(p * 100)}%`;
    }
  });
}

/* ---------- landing preview auto-scrolls on hover ---------- */
document.querySelectorAll('[data-autoscroll]').forEach((box) => {
  const img = box.querySelector('img');
  const go = () => { const d = img.offsetHeight - box.clientHeight; img.style.transform = `translateY(${-Math.max(0, d)}px)`; };
  const back = () => { img.style.transform = 'translateY(0)'; };
  box.addEventListener('pointerenter', go); box.addEventListener('pointerleave', back);
  box.addEventListener('focus', go); box.addEventListener('blur', back);
});

onScroll();
