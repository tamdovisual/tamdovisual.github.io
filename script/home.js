// Creating animation ===============================
// import { gsap } from "./libs/gsap/gsap-core";

var scrollToExplore = document.getElementById('scrollToExplore');

var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: scrollToExplore,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: scrollToExploreJson,
});




// fallingImageSection ============================================
// $(document).ready(function() {
//   var bgMusic = document.getElementById("backgroundSound");
//   bgMusic.play();
//   });

var touchDevice = window.matchMedia("(pointer: coarse)");
var isAutoFalling = true;

var bgMusic = document.getElementById("backgroundSound");
bgMusic.addEventListener("ended", function() 
{
  isAutoFalling = false;
});

document.getElementsByTagName('html')[0].style.overflowY = "hidden";

function startExploring(){
	document.getElementsByTagName('html')[0].style.overflowY = "auto";
  bgMusic.play();
  $('#blockForSoundElement').fadeOut();
  var logoShowHide = document.getElementById('logoShowHide');

  var logoShowHideItem = bodymovin.loadAnimation({
    wrapper: logoShowHide,
    animType: 'svg',
    loop: false,
    autoplay: true,
    animationData: logoShowHideJson,
  });
 // detech device using mouse / trackpad
if (!touchDevice.matches) {
  document.getElementById('fallingImageSection').addEventListener('mousemove', mouseInFallingImgSection,false);
  document.getElementById('header').style.opacity = 1;
  document.getElementById('animateLineHomePage').style.opacity = 1;
  document.getElementById('scrollToExplore').style.opacity = 1;
  document.getElementsByClassName('CTA')[0].style.opacity = 1;
}

 // detect touch device
else{

  document.getElementById('header').style.opacity = 0;
  document.getElementById('animateLineHomePage').style.opacity = 0;
  document.getElementById('scrollToExplore').style.opacity = 0;
  document.getElementsByClassName('CTA')[0].style.opacity = 0;

  function autoFallingImage() {
    var fallingImageSectionElement = document.getElementById('fallingImageSection').getBoundingClientRect();
    if(loadedImage.length>3 && isAutoFalling){
      showFallingImg(Math.floor( Math.random() * loadedImage.length), '#fallingImageSection', fallingImageSectionElement.width/2, fallingImageSectionElement.height/2-56, fallingImageSectionElement.width/2, fallingImageSectionElement.height);
    }
    else if(!isAutoFalling){
      clearInterval(autoFallImageInterval);
      document.getElementsByClassName('CTA')[0].style.opacity = 1;
    }
  }

  var autoFallImageInterval;

  logoShowHideItem.addEventListener('complete',()=>{
    // console.log('ready for falling image');
    autoFallImageInterval = setInterval(autoFallingImage, 100);
    document.getElementById('header').style.opacity = 1;
    document.getElementById('animateLineHomePage').style.opacity = 1;
    document.getElementById('scrollToExplore').style.opacity = 1;
  });
  
  logoShowHideItem.addEventListener('enterFrame', () => {
    if(logoShowHideItem.currentFrame >= 298){
    }
  });
}
}

window.addEventListener("scroll", (event) => {
  bgMusic.volume = Math.max(Math.min(document.getElementById('landscape-section').getBoundingClientRect().top, window.innerHeight)/window.innerHeight, 0.1);
});


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


function mouseInFallingImgSection(event){
  var fallingImageSectionElement = document.getElementById('fallingImageSection').getBoundingClientRect();
  if(Math.abs(event.clientX - oldX) > 15 || Math.abs(event.clientY - oldY) > 15){
    if(loadedImage.length > 2){
      showFallingImg(Math.floor( Math.random() * loadedImage.length ), '#fallingImageSection', event.clientX + fallingImageSectionElement.left, event.clientY - fallingImageSectionElement.top, fallingImageSectionElement.width/2, fallingImageSectionElement.height);
    }
  }
  oldX = event.clientX; 
  oldY = event.clientY;
}

function showFallingImg(imgIndex, elementParent, mousePositionX, mousePositionY, moveToX, moveToY) {
	var img = document.createElement("img");
	img.setAttribute('src', loadedImage[imgIndex] + '');
  img.setAttribute('alt', 'falling-image');

	img.style.backgroundSize = 'contain';
	img.style.backgroundPosition = 'center';
    img.style.position = 'absolute';
    img.style.height = '300px';
    img.style.width = 'auto';
    img.style.zIndex = '100';

    const tl = new TimelineMax();

  // gsap.fromTo(img, {
  //   opacity: 0,
  //   },{
  //   opacity: 1,
  //   duration: 0.05,
  //   ease: 'Power2.easeOut',
  // });

  gsap.fromTo(img, {
      transform: 'translate(-50%, -50%)',
      left: mousePositionX,
      scale: 1,
      },{
      transform: 'translate(0%, 0%)',
      left: moveToX,
      scale: 0,
      duration: 1.5,
      transformOrigin: 'top top',
      ease: 'Power2.easeOut',
    });

  tl.fromTo(img, {
      top: mousePositionY,
      },{
      top: moveToY,
      transformOrigin: 'top top',
      duration: 2,
      ease: Bounce.easeOut,
      // ease: 'Power4.easeOut',

    }).call(removeElement(img));
    


	$(elementParent)[0].appendChild(img);
}
gsap.utils.toArray('.char').forEach((element) => {
  
  gsap.fromTo(element, {
    x: 0,
    // y: 0,
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
    // y: '50vh',
    // pin: true,
    scale: 15,
    // scale: i => 1 - (i * 0.1),
    ease: "Power1.easeOut",
  });
})


// Moving Lines =====================================================================

var homepageMovingLines = $('.movingLine');

for(i = 0; i < homepageMovingLines.length; i++ ){

  var lineAnimation = gsap.timeline({
    repeat: -1,
    // yoyo: true,
  });
  
  lineAnimation
  .to(homepageMovingLines[i], {
    strokeWidth: '0.8px',
    opacity: 0.6,
    duration: 3,
    // delay: i/100,
    transform: 'translateY('+ (i+1)*30 +'px) scaleX('+ (1 - i/10) +') scaleY('+ (0.6 - i/15) +')',
    ease: Elastic.easeOut.config(2, 0.5),
  }).to(homepageMovingLines[i], {
    strokeWidth: '1.5px',
    opacity: 0.6,
    duration: 1,
    transform: 'scaleX('+ 1 +') scaleY('+ 0.6 +')',
    ease: 'Power1.easeOut',
    stagger: 0.1,
  });

  lineAnimation.startTime(i/20);

}

gsap.to('#animateLineHomePage',{
  scrollTrigger: {
    trigger: '#fallingImageSection',
    start: 'bottom 95%',
    end: 'bottom 70%',
    stagger: 0.3,
    scrub: true,
    toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
    // markers: true
  },
  // y: -1000,
  transform: 'scaleX(3) scaleY(3)',
  duration: 0.5,
  stagger: 0.01,
  ease: 'Power1.easeOut',
})


// ScrollTrigger scroll down =====================================================================

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
  y: 0,
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
