// Scroll-triggered animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Create observer for scroll-reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after revealing to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  scrollRevealElements.forEach(el => observer.observe(el));

  // Smooth scroll for anchor links on the same page
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.includes('#')) return;

      const [pathname, hash] = href.split('#');
      const target = document.querySelector(`#${hash}`);
      if (!target) return;

      const linkPath = pathname ? new URL(pathname, location.href).pathname.replace(/\/+$/, '') : location.pathname.replace(/\/+$/, '');
      const currentPath = location.pathname.replace(/\/+$/, '');

      if (linkPath === currentPath) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const autoplayVideos = document.querySelectorAll('video[data-autoplay]');
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (!(video instanceof HTMLVideoElement)) return;

      if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
        // Always try to load and play when visible
        if (video.readyState < 2) {
          video.load();
        }
        if (video.paused && video.muted) {
          video.play().catch(() => null);
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, {
    root: null,
    threshold: [0.25]
  });

  autoplayVideos.forEach(video => {
    // Immediately show video when it can play
    video.addEventListener('canplay', () => {
      video.style.opacity = '1';
      const poster = video.parentElement?.querySelector('.video-poster');
      if (poster) poster.style.opacity = '0';
    });

    // Hide video on error, show poster
    video.addEventListener('error', () => {
      video.style.display = 'none';
      const poster = video.parentElement?.querySelector('.video-poster');
      if (poster) poster.style.opacity = '1';
    });

    // Start autoplay immediately if already visible
    if (video.muted) {
      video.play().catch(() => null);
    }

    videoObserver.observe(video);
  });

  // Parallax effect for floating elements
  const floatingElements = document.querySelectorAll('.animate-float');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    floatingElements.forEach((el, index) => {
      const speed = 0.05 * (index + 1);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // Pause autoplay videos when the tab is inactive
  const handleVisibilityChange = () => {
    const videos = document.querySelectorAll('video[data-autoplay]');
    if (document.hidden) {
      videos.forEach(video => video.pause());
    } else {
      videos.forEach(video => {
        if (video.muted && video.paused) {
          video.play().catch(() => null);
        }
      });
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  handleVisibilityChange();
});
