
// service section animation
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.service === '1') {
            entry.target.classList.add('service-card-end');
            entry.target.classList.remove('service-card-start');
          } else if (entry.target.dataset.service === '2') {
            entry.target.classList.add('service-card-end-2');
            entry.target.classList.remove('service-card-start-2');
          }
        } else {
          if (entry.target.dataset.service === '1') {
            entry.target.classList.remove('service-card-end');
            entry.target.classList.add('service-card-start');
          } else if (entry.target.dataset.service === '2') {
            entry.target.classList.remove('service-card-end-2');
            entry.target.classList.add('service-card-start-2');
          }
        }
    });
  });
  const services = document.querySelectorAll('.service-card');
  
  services.forEach((el) => serviceObserver.observe(el));