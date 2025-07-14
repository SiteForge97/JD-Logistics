$(document).ready(function() {
  let currentSlide = 0;
  const slides = $(".custom-slide");
  const indicators = $(".custom-indicators span");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.removeClass("active").eq(index).addClass("active");
    indicators.removeClass("active").eq(index).addClass("active");
    currentSlide = index;
  }

  // Auto slide every 5s
  setInterval(function() {
    let next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }, 5000);

  // Indicator click
  indicators.on("click", function() {
    let index = $(this).data("slide");
    showSlide(index);
  });

  // Swipe support
  $("#heroCarousel").swipe({
    swipe: function(event, direction) {
      if (direction === 'left') {
        let next = (currentSlide + 1) % totalSlides;
        showSlide(next);
      }
      if (direction === 'right') {
        let prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
      }
    },
    allowPageScroll: "vertical"
  });

  // Scroll handling
  $(window).on("scroll", function() {
    // If About section is showing, skip scrolled styles
    if ($(".navbar").hasClass("about-open")) {
      $(".navbar").removeClass("scrolled");
      return;
    }

    // Apply scrolled class based on scroll position
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // About/Home link toggle
  $(".nav-link").on("click", function(e) {
    e.preventDefault();
    const linkText = $(this).text().trim();

    if (linkText === "About") {
      $("#heroCarousel, .dummy").hide();
      $("#aboutSection").fadeIn();
      $(".navbar").removeClass("scrolled").addClass("about-open");
      $("#aboutNavItem a").text("Home");
    } 
    else if (linkText === "Home" || linkText === "Dashboard") {
      $("#aboutSection").hide();
      $("#heroCarousel, .dummy").show();
      $(".navbar").removeClass("about-open");

      // Reapply scrolled state if needed
      if ($(window).scrollTop() > 50) {
        $(".navbar").addClass("scrolled");
      }
      $("#aboutNavItem a").text("About");
    }
  });
});
