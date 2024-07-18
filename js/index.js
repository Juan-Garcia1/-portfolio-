document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".modal__close-btn");
    const playBtns = document.querySelectorAll(".js-play-btn");
    let iframe = document.createElement("iframe");
    let isModelOpen = false;

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

  let wipeAnimation = new TimelineMax({
    onStart: function () {
      document.querySelector("body").style.overflowY = "hidden";
    },
    onComplete: function () {
      document.querySelector("body").style.overflowY = "auto";
    },
  });

  wipeAnimation
    .fromTo(
      ".panel-1",
      1.5,
      { x: "-100%" },
      { x: "100%", ease: Linear.easeNone }
    )
    .fromTo(
      ".panel-2",
      1.5,
      { x: "-100%" },
      { x: "100%", ease: Linear.easeNone },
      "-=0.9"
    )
    .fromTo(
      [".hero", ".projects-section", "#mid-section"],
      1.5,
      {
        opacity: 0,
      },
      { opacity: 1 }
    );
});
