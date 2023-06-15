var cursor;

// $('.hero-banner').ripples({
// 	resolution: 48,
// 	dropRadius: 120,
// 	perturbance: 0.005,
// });

// Creating animation ===============================

var logoAnimation = document.getElementById('logoAnimation');
var scrollToExplore = document.getElementById('scrollToExplore');
var starMovingContainer = document.getElementById('starMovingContainer')

var mobileMenuIcon = document.getElementById('mobileMenuIcon');

var mobileMenuIconItem = bodymovin.loadAnimation({
  wrapper: mobileMenuIcon,
  animType: 'svg',
  loop: false,
  autoplay: false,
  animationData: mobileMenuIconJson,
});

var menuClose = 1;
mobileMenuIcon.addEventListener('click', (e) => {
  if(menuClose== 1){
    openHeaderMenu()
  }
  else{closeHeaderMenu()}
  mobileMenuIconItem.setDirection(menuClose);
  mobileMenuIconItem.play();
  menuClose = -menuClose;
});

var logoAnimationItem = bodymovin.loadAnimation({
  wrapper: logoAnimation,
  animType: 'svg',
  loop: false,
  autoplay: true,
  animationData: logoJson,
});

logoAnimationItem.addEventListener("complete", function(){
  console.log('logo is animated');
});

var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: scrollToExplore,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: scrollToExploreJson,
});

var scrollToExploreItem = bodymovin.loadAnimation({
  wrapper: starMovingContainer,
  animType: 'svg',
  loop: true,
  autoplay: true,
  animationData: starMovingJson,
});

// initial functions ===============================

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
  $('#mobile-menu').fadeIn();
  document.getElementsByTagName('html')[0].style.overflowY = "hidden";
}

function closeHeaderMenu(){
  $('#header-menu-icon').show();
  $('#header-menu-icon-close').hide();
  $('#mobile-menu').fadeOut();
  // $('body').css("overflow", "auto");
  document.getElementsByTagName('html')[0].style.overflowY = "auto";
}

// Check if element is scrolled to the view port ===============================

window.addEventListener('scroll', function() {
  changeHeaderBlur();
});

// Custom cursor =========================================

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


// page transition ========================================
$(window).on("load",function(){
  $(".loader-wrapper").fadeOut("slow");
});


// Lazy loading image in the gallery ========================================
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll(".lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.scrollY;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.style.background = img.dataset.src;
              img.style.backgroundSize = 'cover';
              img.style.backgroundPosition = 'center';
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  lazyload();
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});


// check mouse movement direction ============================================================================
// let oldX = 0, oldY = 0;

// function captureMouseMove($event){
//      let directionX = 0, directionY = 0, diffX = 0, diffY = 0;
//      if ($event.pageX < oldX) {
//          directionX = "left"
//          diffX = oldX - $event.pageX;
//      } else if ($event.pageX > oldX) {
//          directionX = "right"
//          diffX = $event.pageX - oldX;
//      }

//      if ($event.pageY < oldY) {
//          directionY = "top"
//          diffY = oldY - $event.pageY;
//      } else if ($event.pageY > oldY) {
//          directionY = "bottom";
//          diffY = $event.pageY - oldY;
//      }

//      oldX = $event.pageX;
//      oldY = $event.pageY;
//  }

//  window.addEventListener('mousemove', captureMouseMove);