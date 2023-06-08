// Creating animation ===============================

var logoAnimation = document.getElementById('logoAnimation');
var logoAnimationItem = bodymovin.loadAnimation({
  wrapper: logoAnimation,
  animType: 'svg',
  loop: false,
  autoplay: true,
  animationData: logoJson,
});

var scrollToExplore = document.getElementById('scrollToExplore');
var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: scrollToExplore,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: scrollToExploreJson,
});

// Check if element is scrolled to the view port ===============================

window.addEventListener('scroll', function() {
	var element = document.getElementById('landscape-section');
	var position = element.getBoundingClientRect();

	console.log(position.top)
	if(position.top < 150){
		document.getElementById('header').style.background = "rgba(255, 255, 255, 0.05)";
		document.getElementById('header').style.backdropFilter = "blur(40px)";
	}
	else{
		document.getElementById('header').style.background = "rgba(255, 255, 255, 0.00)";
		document.getElementById('header').style.backdropFilter = "blur(0px)";
	}
});


// logoAnimation.addEventListener("mouseenter", function () {
//   animItem.play();
// });

// logoAnimation.addEventListener("mouseleave", function () {
//   animItem.goToAndStop(0);
// });






// Setting speed of animation by scrolling speed ==========


// var checkScrollSpeed = (function(settings){
//     settings = settings || {};
  
//     var lastPos, newPos, timer, delta, 
//         delay = settings.delay || 500; // in "ms" (higher means lower fidelity )
  
//     function clear() {
//       lastPos = null;
//       delta = 0;
//     }
  
//     clear();
    
//     return function(){
//       newPos = window.scrollY;
//       if ( lastPos != null ){ // && newPos < maxScroll 
//         delta = Math.abs(newPos -  lastPos);
//       }
//       lastPos = newPos;
//       clearTimeout(timer);
//       timer = setTimeout(clear, delay);
//       return delta;
//     };
// })();

// // listen to "scroll" event
// window.onscroll = function(){
//     // console.clear()
//     var speed = checkScrollSpeed();
//     if(speed == 0) {
//         animItem.setSpeed(1);
//         console.log( speed );
//     }
//     else if(speed < 200) {
//         animItem.setSpeed(10);
//         console.log( speed );

//     }
//     else {
//         animItem.setSpeed(20);
//         console.log( speed );

//     }
//     console.log(animItem.playSpeed);
// };


// var timer = null;
// window.addEventListener('scroll', function() {
//     if(timer !== null) {
//         clearTimeout(timer);        
//     }
//     timer = setTimeout(function() {
//           animItem.setSpeed(1);
//     }, 150);
// }, false)