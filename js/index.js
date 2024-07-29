document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  const modal = document.querySelector(".modal");
  const closeModalBtn = document.querySelector(".modal__close-btn");
  const playBtns = document.querySelectorAll(".js-play-btn");
  let iframe = document.createElement("iframe");
  let isModelOpen = false;

  // Animations
  let tl = gsap.timeline();

  tl.to(".dot", { scale: 1 })
    .to(".blob", { scale: 1 })
    .from(".text", { opacity: 0, scale: 100, stagger: 0.2 })
    .from(".social-list--hero", { opacity: 0 })
    .set(".hero", {
      backgroundColor: "#2c3535",
    });

  const details = gsap.utils.toArray(".projects-list__item:not(:first-child)");
  const photos = gsap.utils.toArray(".desktop-photo:not(:first-child)");
  gsap.set(photos, { yPercent: 101 });
  const allPhotos = gsap.utils.toArray(".desktop-photo");

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top 10%",
        end: "bottom 80%",
        pin: ".desktop-photos",
        markers: false,
      });

      details.forEach((detail, index) => {
        let headline = detail.querySelector("h2");
        let animation = gsap
          .timeline()
          .to(photos[index], { yPercent: 0 })
          .set(allPhotos[index], { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: headline,
          start: "top 50%",
          end: "top 30%",
          animation: animation,
          scrub: true,
          markers: false,
        });
      });
    },
  });

  [...playBtns].forEach((playBtn) => {
    playBtn.addEventListener("click", function () {
      isModelOpen = true;
      toggleModal();
      // prevent page from scrolling when modal is open
      document.querySelector("body").style.overflow = "hidden";
      // get youtube link
      const video = this.closest(".project").dataset.video;

      iframe.src = video;
      addIframeAtrributes();
      modal.querySelector(".modal__content").append(iframe);
    });
  });

  closeModalBtn.addEventListener("click", function () {
    toggleModal();
    document.querySelector("body").style.overflow = "scroll";
    iframe.src = "";
  });

  // when modal is open, esc key will close the modal
  window.addEventListener("keydown", function (event) {
    if (isModelOpen && event.which === 27) {
      toggleModal();
      document.querySelector("body").style.overflow = "scroll";
      isModelOpen = false;
    }
  });

  function addIframeAtrributes() {
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = 0;
    iframe.allowFullscreen = true;
    iframe.allow = "autoplay; picture-in-picture";
  }
  function toggleModal() {
    modal.classList.toggle("modal--active");
  }
});
