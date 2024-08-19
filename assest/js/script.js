// Slider

$('.slickSlider').slick({
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
        }
      }
    ],
});

// Sidebar / mobile menu

function sidebar() {
  if ($("body").hasClass("sidebar-active")) {
    $("body").removeClass("sidebar-active");
  } else {
    $("body").addClass("sidebar-active");
  }
}
$('#sidebar').click(function () {
  event.stopPropagation();
});



// Business-stats-number counters

// Sayma işlevi
function countUp(element, start, end, duration) {
  let startTime = null;

  function animateCount(currentTime) {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.innerText = Math.floor(progress * (end - start) + start);

      if (progress < 1) {
          requestAnimationFrame(animateCount);
      }
  }

  requestAnimationFrame(animateCount);
}

// Intersection Observer ile sayma işlevini tetikleme
function observeCounters() {
  const counters = document.querySelectorAll('.counter'); // Sayıların bulunduğu elemanları seçin

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target;
              const endValue = parseInt(counter.getAttribute('data-count'));
              countUp(counter, 0, endValue, 2000); // 2000 milisaniye (2 saniye) süresince sayar
              observer.unobserve(counter); // Saydırma işlemi tamamlandıktan sonra tekrar saymasını engeller
          }
      });
  }, {
      threshold: 0.5 // Elemanın en az %50'si göründüğünde tetiklenir
  });

  counters.forEach(counter => {
      observer.observe(counter);
  });
}

// DOM yüklendikten sonra başlat
document.addEventListener('DOMContentLoaded', observeCounters);

  