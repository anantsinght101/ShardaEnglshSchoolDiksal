function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}

/* Auto-scroll & Pagination for Facilities on Mobile */
document.addEventListener('DOMContentLoaded', () => {
  const facilityGrid = document.querySelector('.facility-grid');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!facilityGrid || !dotsContainer) return;

  const cards = facilityGrid.querySelectorAll('.facility-card');
  const cardCount = cards.length;
  let activeIndex = 0;
  let isPaused = false; // Flag to control auto-scroll

  // Generate Dots
  for (let i = 0; i < cardCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('.dot');

  function updateDots(index) {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function scrollToSlide(index) {
    activeIndex = index;
    const scrollAmount = facilityGrid.scrollWidth / cardCount;
    facilityGrid.scrollTo({
      left: scrollAmount * index,
      behavior: 'smooth'
    });
    updateDots(index);
  }

  // Auto-scroll loop with pause check
  setInterval(() => {
    if (window.innerWidth <= 768 && !isPaused) {
      activeIndex = (activeIndex + 1) % cardCount;
      scrollToSlide(activeIndex);
    }
  }, 3000);

  // Sync dots on manual scroll
  facilityGrid.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      const scrollPosition = facilityGrid.scrollLeft;
      const cardWidth = facilityGrid.scrollWidth / cardCount;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeIndex) {
        activeIndex = index;
        updateDots(activeIndex);
      }
    }
  });

  // Pause on interaction
  facilityGrid.addEventListener('touchstart', () => { isPaused = true; });
  facilityGrid.addEventListener('touchend', () => {
    // Resume after a short delay to allow scroll to settle
    setTimeout(() => { isPaused = false; }, 2000);
  });

  facilityGrid.addEventListener('mouseenter', () => { isPaused = true; });
  facilityGrid.addEventListener('mouseleave', () => { isPaused = false; });

});
