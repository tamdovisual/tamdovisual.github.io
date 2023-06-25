// Creating animation ===============================

var scrollToExplore = document.getElementById('scrollToExplore');

var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: scrollToExplore,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: scrollToExploreJson,
});

// fallingImageSection ============================================

let oldX = 0, oldY = 0;

//reusable function
function removeElement(element) {
  if (typeof(element) === "string") {
    element = document.querySelector(element);
  }
  return function() {
    element.parentNode.removeChild(element);
  };
}

document.getElementById('fallingImageSection').addEventListener('mousemove', mouseInFallingImgSection,false);

function mouseInFallingImgSection(event){
  var container = document.getElementById('fallingImageSection').getBoundingClientRect();
  if(Math.abs(event.clientX - oldX) > 15 || Math.abs(event.clientY - oldY) > 15){
    showFallingImg(Math.floor( Math.random() * numberOfImage ), '#fallingImageSection', event.clientX + container.left, event.clientY - container.top, container.width/2, container.height);
  }
  oldX = event.clientX;
  oldY = event.clientY;
}

function showFallingImg(imgIndex, elementParent, mousePositionX, mousePositionY, moveToX, moveToY) {
	var img = document.createElement("img");
	img.setAttribute('src', imageList[imgIndex].path + '');
	img.style.backgroundSize = 'contain';
	img.style.backgroundPosition = 'center';
    img.style.position = 'absolute';
    img.style.height = '300px';
    img.style.width = 'auto';
    img.style.zIndex = '100';

    const tl = new TimelineMax();

    gsap.fromTo(img, {
        transform: 'translate(-50%, -50%)',
        left: mousePositionX,
        scale: 1,
        },{
        transform: 'translate(0%, 0%)',
        left: moveToX,
        scale: 0,
        duration: 2.5,
        transformOrigin: 'top top',
        ease: 'Power4.easeOut',
      });

    tl.fromTo(img, {
        top: mousePositionY,
        },{
        top: moveToY,
        transformOrigin: 'top top',
        duration: 2,
        delay: 0.5,
        ease: 'Bounce.easeOut',
      }).call(removeElement(img));

	$(elementParent)[0].appendChild(img);
}

// gsap.fromTo('.char', {
//   x: 0,
//   scale: 1,
//   y: 0,
// }, {
//   scrollTrigger: {
//     trigger: '#fallingImageSection',
//     start: 'bottom bottom',
//     end: 'bottom top',
//     scrub: true, // cái này sẽ chạy animate theo cuộn chuột, bỏ đi thì sẽ tự động chạy khi cuộn.
//     toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
//     markers: true
//   },
//   duration: 3,
//   // x: (this.getBoundingClientRect().left + this.getBoundingClientRect().width/2 - Math.round(window.innerWidth/2)),
//   y: '80vh',
//   scale: 30,
//   ease: "Power1.easeOut",
// });

// var animateTextWidthChars = gsap.utils.toArray('.char');

gsap.utils.toArray('.char').forEach((element) => {
  
  gsap.fromTo(element, {
    x: 0,
    y: 0,
    scale: 1,
  }, {
    scrollTrigger: {
      trigger: '#fallingImageSection',
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: true, // cái này sẽ chạy animate theo cuộn chuột, bỏ đi thì sẽ tự động chạy khi cuộn.
      toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
      // markers: true,
    },
    duration: 3,
    x: 35*(element.getBoundingClientRect().left + element.getBoundingClientRect().width/2 - Math.round(window.innerWidth/2)),
    y: '50vh',
    // pin: true,
    scale: 15,
    // scale: i => 1 - (i * 0.1),
    ease: "Power1.easeOut",
  });
})


gsap.to('#scrollToExplore, #fallingImageSection .CTA', {
  scrollTrigger: {
    trigger: '#fallingImageSection',
    start: 'bottom 96%',
    end: 'bottom top',
    // scrub: true, // cái này sẽ chạy animate theo cuộn chuột, bỏ đi thì sẽ tự động chạy khi cuộn.
    toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
    // markers: true,
  },
  duration: 0.5,
  opacity: 0,
  ease: "Power2.inOut",
})


// gsap.fromTo('#landscape-section',{
//   y: '-45vh',
//   // scale: 0,
// }, {
//   scrollTrigger: {
//     trigger: '#fallingImageSection',
//     start: 'center 40%',
//     end: 'bottom 70%',
//     scrub: true,
//     toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
//     markers: true,
//   },
//   y: 0,
//   duration: 1,
//   transformOrigin: 'top center',
//   // stagger: 0.05,
//   ease: "Power1.easeIn",
//   // ease: 'Bounce.easeOut',
// });


gsap.fromTo('#landscape-section',{
  y: '-45vh',
  opacity: 0,
  scale: 0,
}, {
  scrollTrigger: {
    trigger: '#fallingImageSection',
    start: 'center 40%',
    end: 'center 0%',
    scrub: true,
    toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
    // markers: true
  },
  scale: 1,
  opacity: 1,
  y: '-20vh',
  // duration: 1.5,
  transformOrigin: 'top center',
  // stagger: 0.05,
  ease: "Power1.inOut",
});


gsap.fromTo('#landscape-section-title, .landscape-section .CTA',{
  opacity: 0,
}, {
  scrollTrigger: {
    trigger: '#fallingImageSection',
    start: 'bottom center',
    end: 'bottom 45%',
    toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
    // markers: true,
  },
  opacity: 1,
  duration: 1,
  transformOrigin: 'top center',
  // stagger: 0.05,
  ease: "Power1.inOut",
});