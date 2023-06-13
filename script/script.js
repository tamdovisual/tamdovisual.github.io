var cursor;


// Creating animation ===============================

var logoAnimation = document.getElementById('logoAnimation');
var scrollToExplore = document.getElementById('scrollToExplore');

var logoAnimationItem = bodymovin.loadAnimation({
  wrapper: logoAnimation,
  animType: 'svg',
  loop: false,
  autoplay: true,
  animationData: logoJson,
});

var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: scrollToExplore,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: scrollToExploreJson,
});

function changeHeaderBlur(){
  var body = document.getElementsByTagName('body')[0];
  var position = body.getBoundingClientRect();
  var header = document.getElementById('header');
  var x = window.matchMedia("(min-width: 1120px)");
  // if (x.matches && position.top < -80) <--- only apply blur header when scroll for laptop
  if (position.top < -80) {
      header.classList.add('scolled-header', 'blur-background');
  } else{
      header.classList.remove('scolled-header', 'blur-background');
    }
}

function openHeaderMenu(){
  $('#header-menu-icon').hide();
  $('#header-menu-icon-close').show();
  $('#mobile-menu').show();
  document.getElementsByTagName('html')[0].style.overflowY = "hidden";
}

function closeHeaderMenu(){
  $('#header-menu-icon').show();
  $('#header-menu-icon-close').hide();
  $('#mobile-menu').hide();
  // $('body').css("overflow", "auto");
  document.getElementsByTagName('html')[0].style.overflowY = "auto";
}

// Check if element is scrolled to the view port ===============================

window.addEventListener('scroll', function() {
  changeHeaderBlur();
});





// Custom cursor =========================================
// Add cursor div into page

document.addEventListener("DOMContentLoaded", function(event) {

  // add custom cursor div element into page
  var img = document.createElement("div");
  img.className = "custom-cursor";
  $('body')[0].appendChild(img);

  cursor = document.querySelector(".custom-cursor");
  var links = document.querySelectorAll("a");
  var clickableElements = $('body *').toArray().filter(function(el) { return $(el).attr('onclick') });
  
  var initCursor = false;

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function() {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function() {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  for (var i = 0; i < clickableElements.length; i++) {
    var selfLink = clickableElements[i];

    selfLink.addEventListener("mouseover", function() {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function() {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  window.onmousemove = function(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px"
    });
  };

  window.onmouseout = function(e) {
    TweenLite.to(cursor, 0.3, {
      opacity: 0
    });
    initCursor = false;
  };
});




// logoAnimation.addEventListener("mouseenter", function () {
//   animItem.play();
// });

// logoAnimation.addEventListener("mouseleave", function () {
//   animItem.goToAndStop(0);
// });


// Setting speed of animation by scrolling speed ========================================


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
