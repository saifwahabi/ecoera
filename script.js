const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
gsap.registerPlugin(ScrollTrigger)

gsap.to(".loading .logo", 0.5, {
    opacity: 0.5,
})
gsap.to(".loading .logo", 0.5, {
    opacity: 1,
    delay: 0.5,
})
gsap.to(".loading .logo", 0.5, {
    opacity: 0.5,
    delay: 1,
})
gsap.to(".loading .logo", 0.5, {
    opacity: 1,
    delay: 1.5,
})
gsap.to(".loading .logo", 1.5, {
    opacity: 0,
    delay: 2,
})
gsap.to(".bar", 1.5, {
    delay: 3.5,
    height: 0,
    stagger: {
        amount: 0.5
    },
    ease: "power4.inOut"
})
const myText = new SplitType("#hero_title")

gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 4.5,
    duration: .1
})


const splitTypes = document.querySelectorAll(".reveal-type")
splitTypes.forEach((char, i) => {
    const text = new SplitType(char, {
        types : "chars"
    })
    
    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: "top 50%",
            scrub: true,
            markers: false
        },
        opacity: 0.2,
        stagger: 0.1
    })


})
    gsap.from(".highlight", {
        scrollTrigger: {
            trigger: ".highlight",
            start: 'top 50%',
            end: "top 10%",
            scrub: true,
            markers: false
        },
        width: 0
    })
setTimeout(() => {
    document.body.className = "scroll"
}, 5000)

ShowcaseOverlapping();		


/*--------------------------------------------------
Function Showcase Overlapping Gallery
---------------------------------------------------*/
	
	function ShowcaseOverlapping() {
				gsap.utils.toArray('.overlapping-gallery').forEach((pinnedGallery) => {
					
					const pinnedImages = pinnedGallery.querySelectorAll('.overlapping-image');
					
						function setImagesProperties() {								
							gsap.set(pinnedImages, { height: window.innerHeight});						
						}
						
						setImagesProperties();
					
				
					pinnedImages.forEach((pImage, i, arr) => {
						if (i < arr.length - 1) {
							const durationMultiplier = arr.length - i - 1;
							
							
							
							ScrollTrigger.create({
								trigger: pImage,
								start: function() {
									const centerPin = (window.innerHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "top +=" + centerPin;
								},
								end: function() {
									const durationHeight = pImage.offsetHeight * durationMultiplier + (pImage.offsetHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight)/2;
									return "+=" + durationHeight;
								},
								pin: true,
								pinSpacing: false,
								scrub: true,
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
								start: function() {
									const centerPin = (window.innerHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "top +=" + centerPin;
								},
								end: function() {
									const durationHeight = pImage.offsetHeight + (pImage.offsetHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "+=" + durationHeight;
								},
								scrub: true,
								animation: gsap.to(pImage.querySelector('.overlapping-image-inner'), animationProperties),
							});

						}
					});
				
				});
	
			
		} //End Overlapping Gallery