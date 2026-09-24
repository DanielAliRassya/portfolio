/**
 * Daniel Ali Rassya - Portfolio JavaScript
 * Modern, lightweight, and interactive
 */

(function () {
  'use strict';

  /* === DOM Ready === */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initTypewriter();
    initScrollReveal();
    initSmoothScroll();
    initActiveNav();
    initYear();
  });

  /* === Navbar Scroll Effect === */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu on link click
      navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
  }

  /* === Typewriter Effect === */
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
      'Full-Stack Developer',
      'Web Enthusiast',
      'Content Creator',
      'Tech Explorer',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseEnd = 2000;
    let pauseStart = 300;
    let typeSpeed = 80;
    let deleteSpeed = 40;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        speed = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        speed = pauseStart;
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, pauseStart);
  }

  /* === Scroll Reveal Animation === */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* === Smooth Scroll for Anchor Links === */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /* === Active Nav Link on Scroll === */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* === Update Year === */
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();
