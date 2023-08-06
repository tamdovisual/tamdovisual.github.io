window.scrollTo(0, 0);


gsap.registerPlugin(ScrollTrigger);

const coolVideo = document.getElementById("scrolling");
const triggerE = document.getElementById("scrollTrigger");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: triggerE,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    // markers: true
  }
});

// wait until video metadata is loaded, so we can grab the proper duration before adding the onscroll animation. Might need to add a loader for loonng videos
coolVideo.onloadedmetadata = function () {
  tl.to(coolVideo, { currentTime: coolVideo.duration });
};

// Dealing with devices
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
if (isTouchDevice()) {
  coolVideo.play();
  coolVideo.pause();
}

let vid = document.getElementById("loading");

function playPrototype(){
    document.getElementById('blocker').style.display = 'none';
    vid.play();
}


document.getElementById('loading').addEventListener('ended',myHandler,false);
function myHandler(e) {
    document.getElementById('loading').style.display = 'none';
}
