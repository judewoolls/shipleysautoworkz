document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.service-card');
  if (!services.length) return;

  const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          const serviceType = entry.target.dataset.service;

          if (entry.isIntersecting) {
              entry.target.classList.add(
                  serviceType === '1' ? 'service-card-end' : 'service-card-end-2'
              );
              entry.target.classList.remove(
                  serviceType === '1' ? 'service-card-start' : 'service-card-start-2'
              );
          } else {
              entry.target.classList.remove(
                  serviceType === '1' ? 'service-card-end' : 'service-card-end-2'
              );
              entry.target.classList.add(
                  serviceType === '1' ? 'service-card-start' : 'service-card-start-2'
              );
          }
      });
  });

  services.forEach((el) => serviceObserver.observe(el));
});
