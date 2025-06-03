// Smooth scrolling with Lenis
const lenis = new Lenis();
lenis.on('scroll', (e) => {
  console.log(e);
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// LOADING ANIMATION WITH OVERLAY HIDE
const loadingTimeline = gsap.timeline({
  onComplete: () => {
    // Fade out and hide overlay
    gsap.to(".loading", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".loading .logo").style.display = "none";
        document.querySelector(".loading .overlay").style.display = "none";
        document.body.className = "scroll"; // Enable scroll after loading
      }
    });
  }
});

loadingTimeline
  .to(".loading .logo", { opacity: 0.5, duration: 0.5 })
  .to(".loading .logo", { opacity: 1, duration: 0.5 })
  .to(".loading .logo", { opacity: 0.5, duration: 0.5 })
  .to(".loading .logo", { opacity: 1, duration: 0.5 })
  .to(".loading .logo", { opacity: 0, duration: 1.5 })
  .to(".bar", {
    height: 0,
    duration: 1.5,
    delay: 1.5,
    stagger: { amount: 0.5 },
    ease: "power4.inOut"
  });

// SPLIT TEXT ANIMATION FOR HERO TITLE
const myText = new SplitType("#hero_title");
gsap.to(".char", {
  y: 0,
  stagger: 0.05,
  delay: 4.5,
  duration: 0.1
});

// SPLIT TEXT ON SCROLL
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char) => {
  const text = new SplitType(char, { types: "chars" });

  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: "top 80%",
      end: "top 50%",
      scrub: true,
      markers: false
    },
    opacity: 0.2,
    stagger: 0.1
  });
});

// HIGHLIGHT SCROLL ANIMATION
gsap.from(".highlight", {
  scrollTrigger: {
    trigger: ".highlight",
    start: "top 50%",
    end: "top 10%",
    scrub: true,
    markers: false
  },
  width: 0
});

// OVERLAPPING GALLERY FUNCTION
function ShowcaseOverlapping() {
  gsap.utils.toArray(".overlapping-gallery").forEach((pinnedGallery) => {
    const pinnedImages = pinnedGallery.querySelectorAll(".overlapping-image");

    function setImagesProperties() {
      gsap.set(pinnedImages, { height: window.innerHeight });
    }

    setImagesProperties();

    pinnedImages.forEach((pImage, i, arr) => {
      if (i < arr.length - 1) {
        const durationMultiplier = arr.length - i - 1;

        ScrollTrigger.create({
          trigger: pImage,
          start: () => {
            const centerPin =
              (window.innerHeight -
                pImage.querySelector(".overlapping-image-inner").offsetHeight) /
              2;
            return "top +=" + centerPin;
          },
          end: () => {
            const durationHeight =
              pImage.offsetHeight * durationMultiplier +
              (pImage.offsetHeight -
                pImage.querySelector(".overlapping-image-inner").offsetHeight) /
                2;
            return "+=" + durationHeight;
          },
          pin: true,
          pinSpacing: false,
          scrub: true
        });

        const animationProperties = {
          scale: 0.75,
          opacity: 1,
          zIndex: 0,
          duration: 1,
          ease: Linear.easeNone
        };

        ScrollTrigger.create({
          trigger: pImage,
          start: () => {
            const centerPin =
              (window.innerHeight -
                pImage.querySelector(".overlapping-image-inner").offsetHeight) /
              2;
            return "top +=" + centerPin;
          },
          end: () => {
            const durationHeight =
              pImage.offsetHeight +
              (pImage.offsetHeight -
                pImage.querySelector(".overlapping-image-inner").offsetHeight) /
                2;
            return "+=" + durationHeight;
          },
          scrub: true,
          animation: gsap.to(
            pImage.querySelector(".overlapping-image-inner"),
            animationProperties
          )
        });
      }
    });
  });
}
ShowcaseOverlapping();

// MAGNETIC EFFECT
const magnets = document.querySelectorAll(".magnetic");

const activateMagnet = (event) => {
  const magnet = event.currentTarget;
  const magnetic_text = magnet.querySelector(".text");
  const boundBox = magnet.getBoundingClientRect();
  const newX = (event.clientX - boundBox.left) / magnet.offsetWidth - 0.5;
  const newY = (event.clientY - boundBox.top) / magnet.offsetHeight - 0.5;
  const magnet_strength = 50;
  const magnetic_text_strength = 100;

  gsap.to(magnet, {
    duration: 1,
    x: newX * magnet_strength,
    y: newY * magnet_strength,
    ease: "power4.out"
  });

  gsap.to(magnetic_text, {
    duration: 1,
    x: newX * magnetic_text_strength,
    y: newY * magnetic_text_strength,
    ease: "power4.out"
  });
};

const resetMagnet = (event) => {
  const magnet = event.currentTarget;
  const magnetic_text = magnet.querySelector(".text");

  gsap.to(magnet, {
    duration: 1,
    x: 0,
    y: 0,
    ease: "elastic.out"
  });

  gsap.to(magnetic_text, {
    duration: 1,
    x: 0,
    y: 0,
    ease: "elastic.out"
  });
};

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", activateMagnet);
  magnet.addEventListener("mouseleave", resetMagnet);
});
