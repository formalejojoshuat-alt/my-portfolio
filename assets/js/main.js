/* Accessible motion enhancement. The site remains usable if animation CDNs do not load. */
(() => {
  'use strict';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  function updateProgress() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (!progress) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0) + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress, {passive:true});

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Open navigation menu');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  }
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const opened = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!opened));
      menuToggle.setAttribute('aria-label', opened ? 'Open navigation menu' : 'Close navigation menu');
      mobileNav.hidden = opened;
      document.body.classList.toggle('menu-open', !opened);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => {if (e.key === 'Escape') closeMenu();});
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMenu();
    });
  }

  // Radial cursor spotlight for the Big Picture panel; no animation required for usability.
  const radial = document.querySelector('.radial-interactive');
  if (radial && window.matchMedia('(pointer:fine)').matches) {
    radial.addEventListener('pointermove', (event) => {
      const rect = radial.getBoundingClientRect();
      radial.style.setProperty('--spot-x', `${((event.clientX-rect.left)/rect.width)*100}%`);
      radial.style.setProperty('--spot-y', `${((event.clientY-rect.top)/rect.height)*100}%`);
    }, {passive:true});
  }
  // Run the zigzag only as it enters the viewport. The arrowhead uses the
  // path tangent every frame, so it travels and turns with the moving tip.
  const manifesto = document.querySelector('.manifesto');
  const growthLine = manifesto?.querySelector('.growth-path');
  const growthHead = manifesto?.querySelector('.growth-moving-head');
  function drawGrowth() {
    if (!growthLine || !growthHead || manifesto.classList.contains('growth-started')) return;
    manifesto.classList.add('growth-started');
    const length = growthLine.getTotalLength();
    const positionHead = (distance) => {
      const p = growthLine.getPointAtLength(distance);
      const before = growthLine.getPointAtLength(Math.max(0, distance - 1.5));
      const after = growthLine.getPointAtLength(Math.min(length, distance + 1.5));
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
      growthHead.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
    };
    if (prefersReducedMotion.matches) {
      growthLine.style.strokeDasharray = String(length);
      growthLine.style.strokeDashoffset = '0';
      positionHead(length);
      growthHead.style.opacity = '1';
      return;
    }
    growthLine.style.strokeDasharray = String(length);
    growthLine.style.strokeDashoffset = String(length);
    positionHead(0);
    growthHead.style.opacity = '1';
    const duration = 2350;
    let started = null;
    function frame(now) {
      if (started === null) started = now;
      const t = Math.min(1, (now - started) / duration);
      // Gentle ease-out, maintaining smooth directional changes at each bend.
      const progress = 1 - Math.pow(1 - t, 2.2);
      const distance = progress * length;
      growthLine.style.strokeDashoffset = String(length - distance);
      positionHead(distance);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (manifesto && growthLine && growthHead) {
    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      drawGrowth();
    } else {
      const growthObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          drawGrowth(); growthObserver.disconnect();
        }
      }, {threshold:0.28, rootMargin:'0px 0px -8% 0px'});
      growthObserver.observe(manifesto);
    }
  }
  document.querySelectorAll('[data-copy-email]').forEach(button => button.addEventListener('click', async () => {
    const original = button.innerHTML;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(button.dataset.copyEmail);
      else {
        const helper = document.createElement('textarea'); helper.value=button.dataset.copyEmail;
        helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);
        helper.select(); const success=document.execCommand('copy'); helper.remove();
        if (!success) throw Error('Copy unavailable');
      }
      button.textContent='Email address copied ✓';
      window.setTimeout(()=>button.innerHTML=original,2200);
    } catch {button.textContent='Select and copy the email above';window.setTimeout(()=>button.innerHTML=original,3000);}
  }));

  // Native viewport activation ensures each animation begins when genuinely seen.
  // Do not initialize hidden states until JS is ready: content remains visible
  // when scripts are disabled or reduced motion is preferred.
  const revealItems = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveals');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    revealItems.forEach(item => revealObserver.observe(item));
  }
  if (prefersReducedMotion.matches) return;

  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const mm = gsap.matchMedia();
    if (document.querySelector('.hero h1')) {
    gsap.fromTo('.hero-kicker, .hero h1, .hero-lede, .hero-actions, .hero-bottom-line',
      {y:30,opacity:0},
      {y:0,opacity:1,stagger:0.12,duration:1.05,ease:'power3.out',delay:0.13,clearProps:'transform,opacity'});
    gsap.fromTo('.hero-art-frame', {scale:.93,opacity:0,y:38}, {scale:1,opacity:1,y:0,duration:1.25,ease:'power3.out',delay:.29,clearProps:'opacity'});
    gsap.fromTo('.floating-note, .orbit-stamp', {opacity:0,scale:.8,y:20}, {opacity:1,scale:1,y:0,stagger:.15,duration:.85,delay:.85,ease:'back.out(1.3)',clearProps:'opacity'});
    }
    mm.add('(min-width: 701px)', () => {
      gsap.to('.hero-photo', {y:-28,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.1}});
      document.querySelectorAll('.project-cover-image img').forEach((image) => {
        gsap.fromTo(image, {scale:1.14}, {scale:1, ease:'none',scrollTrigger:{trigger:image.closest('.project-cover'),start:'top bottom',end:'bottom top',scrub:1.1}});
      });
      if(document.querySelector('.manifesto-symbol')) {
        gsap.fromTo('.manifesto-symbol',{x:55,rotate:-12},{x:-25,rotate:0,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:1}});
      }
    });
  }
})();
