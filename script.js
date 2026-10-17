/* Interações essenciais do site */
(() => {
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const video = modal.querySelector('video');
    if (video) video.currentTime = 0;
  };
  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.style.display = '';
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
    if (!document.querySelector('.modal.is-open')) document.body.classList.remove('modal-open');
  };
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-modal-open]');
    if (opener) { event.preventDefault(); openModal(opener.getAttribute('data-modal-open')); return; }
    const closer = event.target.closest('[data-modal-close]');
    if (closer) { closeModal(closer.closest('.modal')); return; }
    if (event.target.classList.contains('modal')) closeModal(event.target);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('.modal.is-open').forEach(closeModal);
  });
  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const banner = document.getElementById('cookie-banner');
  const accept = document.getElementById('accept-cookies');
  const reject = document.getElementById('reject-cookies');
  // Sem armazenamento de preferência: evita cookies de terceiros por padrão.
  if (banner) banner.style.display = 'none';
  [accept, reject].forEach(button => button?.addEventListener('click', () => {
    if (banner) banner.style.display = 'none';
  }));
})();
