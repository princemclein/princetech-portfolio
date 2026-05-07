const modeBtn = document.querySelector('.mode-btn');

if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    modeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('mode', isLight ? 'light' : 'dark');
  });
}

if (localStorage.getItem('mode') === 'light') {
  document.body.classList.add('light');
  if (modeBtn) modeBtn.textContent = '☀️';
}

// Certificate Modal
(function () {
  document.querySelectorAll('.cert-item, .cert-card').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      if (!src) return;

      // Overlay
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        zIndex: '999999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      });

      // Wrapper — close btn on top, image below
      const wrapper = document.createElement('div');
      Object.assign(wrapper.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        maxWidth: '90vw',
      });

      // Close button — outside and above the image
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      Object.assign(closeBtn.style, {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        background: '#ffffff',
        color: '#111',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        flexShrink: '0',
      });
      closeBtn.setAttribute('aria-label', 'Close');

      // Image
      const img = document.createElement('img');
      img.src = src;
      Object.assign(img.style, {
        maxWidth: '90vw',
        maxHeight: window.innerWidth <= 480 ? '70vh' : '85vh',
        borderRadius: '12px',
        display: 'block',
        objectFit: 'contain',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      });

      wrapper.appendChild(closeBtn);
      wrapper.appendChild(img);
      overlay.appendChild(wrapper);

      // Close handlers
      function close() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }

      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
      });

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    });
  });
})();

// Scroll to Top Button
(function () {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

// Beyond the Screen Carousel
(function () {
  const track = document.querySelector('.beyond-track');
  if (!track) return;
 
  const imgs = track.querySelectorAll('.beyond-img');
  const total = imgs.length;
  if (total <= 3) return; // no need to scroll if 3 or fewer

  const visibleCount = 3;
  let current = 0;

  // Clone first few images for seamless looping
  for (let i = 0; i < visibleCount; i++) {
    track.appendChild(imgs[i].cloneNode(true));
  }

  function getSlideWidth() {
    const img = track.querySelector('.beyond-img');
    return img.offsetWidth + 6; // width + gap
  }

  function next() {
    current++;
    const slideWidth = getSlideWidth();
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${current * slideWidth}px)`;

    // Reset silently when we've scrolled past original items
    if (current >= total) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        current = 0;
      }, 500);
    }
  }

  setInterval(next, 2500);
})();

// Recommendations Carousel
(function () {
  const slides = document.querySelectorAll('.rec-slide');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    const prev = slides[current];
    const next = slides[index];

    prev.style.opacity = '0';
    prev.style.transform = 'translateX(-40px)';
    setTimeout(() => {
      prev.classList.remove('active');
      prev.style.transform = 'translateX(40px)';

      next.classList.add('active');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.style.opacity = '1';
          next.style.transform = 'translateX(0)';
        });
      });
    }, 350);

    current = index;
  }

  setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 4000);
})();

// Gallery Image Lightbox
(function () {
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.querySelector('img')?.src;
      const desc = card.querySelector('.gallery-card-desc')?.textContent;
      if (!src) return;

      // Overlay
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        zIndex: '999999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      });

      // Wrapper
      const wrapper = document.createElement('div');
      Object.assign(wrapper.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        maxWidth: '90vw',
      });

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      Object.assign(closeBtn.style, {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        background: '#ffffff',
        color: '#111',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        flexShrink: '0',
      });
      closeBtn.setAttribute('aria-label', 'Close');

      // Image
      const img = document.createElement('img');
      img.src = src;
      Object.assign(img.style, {
        maxWidth: '90vw',
        maxHeight: window.innerWidth <= 480 ? '65vh' : '80vh',
        borderRadius: '12px 12px 0 0',
        display: 'block',
        objectFit: 'contain',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      });

      // Description below image
      const caption = document.createElement('div');
      caption.textContent = desc;
      Object.assign(caption.style, {
        background: '#1a1a1e',
        color: '#D3D3D3',
        fontSize: '13px',
        lineHeight: '1.6',
        padding: '12px 16px',
        borderRadius: '0 0 12px 12px',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      });

      wrapper.appendChild(closeBtn);
      wrapper.appendChild(img);
      wrapper.appendChild(caption);
      overlay.appendChild(wrapper);

      // Close handlers
      function close() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }

      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
      });

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    });
  });
})();