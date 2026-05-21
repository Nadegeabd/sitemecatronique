/* ═══════════════════════════════════════════
   CONVOYEUR MÉCATRONIQUE — script.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─ LOADER ─────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('done'), 1400);
  }

  /* ─ FOOTER YEAR ────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─ STICKY HEADER ──────────────────────── */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─ MOBILE BURGER ──────────────────────── */
  const burger = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    // Close on nav link click
    navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─ SMOOTH SCROLL ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─ THEME TOGGLE ───────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const applyTheme = (t) => {
      document.documentElement.classList.toggle('light', t === 'light');
      localStorage.setItem('theme', t);
      themeToggle.querySelector('.theme-btn__icon').textContent = t === 'light' ? '◑' : '◐';
    };
    applyTheme(localStorage.getItem('theme') || 'dark');
    themeToggle.addEventListener('click', () => {
      applyTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light');
    });
  }

  /* ─ SCROLL REVEAL ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─ SIMULATOR ──────────────────────────── */
  const simForm = document.getElementById('simForm');
  const simResult = document.getElementById('simResult');
  if (simForm && simResult) {
    simForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const L = parseFloat(document.getElementById('longueur').value) || 1;
      const v = parseFloat(document.getElementById('vitesse').value) || 0.3;
      const m = parseFloat(document.getElementById('charge').value) || 1.0;

      if (L <= 0 || v <= 0 || m <= 0 || m > 2.1) {
        simResult.textContent = '⚠ Entrées invalides — charge max 2 kg.';
        simResult.classList.add('visible');
        return;
      }

      const t = L / v;
      const penalty = Math.min(0.25, Math.max(0, (m - 1) * 0.05));
      const tAdj = t * (1 + penalty);
      const energy = (0.8 * v * m * t * 9.81 / 1000).toFixed(4); // rough Wh

      simResult.innerHTML =
        `✓ Temps estimé : <strong>${tAdj.toFixed(2)} s</strong><br>` +
        `  Charge : ${m.toFixed(2)} kg  |  Vitesse : ${v.toFixed(2)} m/s  |  Distance : ${L.toFixed(2)} m<br>` +
        `  Énergie approx. : ${energy} Wh`;
      simResult.classList.add('visible');
    });
  }

  /* ─ PARALLAX HERO GLOW (subtle) ────────── */
  const glow1 = document.querySelector('.hero__glow--1');
  const glow2 = document.querySelector('.hero__glow--2');
  if (glow1 && glow2) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      glow1.style.transform = `translate(${x}px, ${y}px)`;
      glow2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    }, { passive: true });
  }

});
