// Configure Collections here =========================================

var collectionAnLac = {
    collectionName: "An Lạc",
    folder: "an-lac",
    numberOfImage: 26,
};
var collectionDiemNhien = {
    collectionName: "Điềm Nhiên",
    folder: "diem-nhien",
    numberOfImage: 52,
};
var collectionSoiSang = {
    collectionName: "Soi Sáng",
    folder: "soi-sang",
    numberOfImage: 42,
};
var collectionDem = {
    collectionName: "Đêm",
    folder: "dem",
    numberOfImage: 23,
};

// Define variables =========================================
var collectionList = [collectionAnLac, collectionDiemNhien, collectionSoiSang, collectionDem];
var numberOfImage = 0;

var imageList = [];

var cursor;
// Load images from collections =========================================
for (var i = 0; i < collectionList.length; i++) {
    for (var j = 0; j < collectionList[i].numberOfImage; j++) {
        imageList.push({ path: 'asset/image/gallery/' + collectionList[i].folder + '/' + collectionList[i].folder + '-' + j + '.webp', collectionName: collectionList[i].folder, collectionThumb: false });
        if (j==0){imageList[imageList.length-1].collectionThumb = true;}
        numberOfImage++;
    }
}

// Load image in sequences ===========================================

var images = [numberOfImage];
var gotResponse = [numberOfImage];
var maxDisplayed = -1;
var loadedImage = [];

function checkImages(index) {
    // Check if previous images have been displayed
    if (maxDisplayed == index - 1) {
        for (i = index; i <= numberOfImage; i++) {
            // Check if we've received a response for this image
            if (gotResponse[i] !== true) {
                break;
            }
            maxDisplayed = i;
            if (images[i] != null) {
                // console.log('Adding image' + i);
                // document.body.appendChild(images[i]);
                loadedImage.push(images[i].src);
                // console.log('image '+ i + ' is already');
            }
        }
    }
}

function imageError(index) {
    // console.log('Error loading image ' + index);
    images[index] = null;
    gotResponse[index] = true;
    checkImages(index);
}

function imageLoaded(index, image) {
    // console.log('Loaded image ' + index);
    images[index] = image;
    gotResponse[index] = true;
    checkImages(index);
}

function sequenceLoadingImages() {
    $.each(imageList, function(index, value) {
        var image = new Image();
        image.onload = function () {
            imageLoaded(index, image);
        }
        image.onerror = function () {
            imageError(index);
        }
        image.src = value.path;
        image.style.width = '300px';
        image.style.height = '300px';
    });
}

sequenceLoadingImages();

// Playing Lottie =========================================
var logoAnimation = document.getElementById('logoAnimation');
var mobileMenuIcon = document.getElementById('mobileMenuIcon');
var starMovingContainer = document.getElementById('starMovingContainer')

var mobileMenuIconItem = bodymovin.loadAnimation({
  wrapper: mobileMenuIcon,
  animType: 'svg',
  loop: false,
  autoplay: false,
  animationData: mobileMenuIconJson,
});

var logoAnimationItem = bodymovin.loadAnimation({
  wrapper: logoAnimation,
  animType: 'svg',
  loop: false,
  autoplay: true,
  animationData: logoJson,
});

logoAnimationItem.addEventListener("complete", function(){
  console.log('Ơ kìa, mò mẫm vào đây làm cái gì đấy? - Tâm said!');
});

var starMovingItem = bodymovin.loadAnimation({
    wrapper: starMovingContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    animationData: starMovingJson,
  });

var menuClose = 1;
mobileMenuIcon.addEventListener('click', toggleHeaderMenu);

function toggleHeaderMenu(e){
    if(menuClose== 1){
        openHeaderMenu();
        var header = document.getElementById('header');
        header.classList.remove('scolled-header', 'blur-background');
    }
    else{
        closeHeaderMenu();
        changeHeaderBlur();
    }
    mobileMenuIconItem.setDirection(menuClose);
    mobileMenuIconItem.play();
    menuClose = -menuClose;
}

// Custom cursor ==================================================================================

document.addEventListener("DOMContentLoaded", function (event) {

    // add custom cursor div element into page
    var img = document.createElement("div");
    img.className = "custom-cursor";
    $('body')[0].appendChild(img);

    cursor = document.querySelector(".custom-cursor");
    var links = document.querySelectorAll("a, .clickable");
    var clickableElements = $('body *').toArray().filter(function (el) { return $(el).attr('onclick') });

    var initCursor = false;

    for (var i = 0; i < links.length; i++) {
        var selfLink = links[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    for (var i = 0; i < clickableElements.length; i++) {
        var selfLink = clickableElements[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    window.onmousemove = function (e) {
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

    window.onmouseout = function (e) {
        TweenLite.to(cursor, 0.3, {
            opacity: 0
        });
        initCursor = false;
    };
});


// initial functions =============================================================================================

function changeHeaderBlur() {
    var body = document.getElementsByTagName('body')[0];
    var position = body.getBoundingClientRect();
    var header = document.getElementById('header');
    var x = window.matchMedia("(min-width: 1120px)");
    // if (x.matches && position.top < -80) <--- only apply blur header when scroll for laptop
    if (position.top < -80) {
        header.classList.add('scolled-header', 'blur-background');
    } else {
        header.classList.remove('scolled-header', 'blur-background');
    }
}

function openHeaderMenu() {
    $('#mobile-menu').fadeIn();
    $('#mobile-menu').css('top', '0px');
    $('#page-title').fadeOut();
    document.getElementsByTagName('html')[0].style.overflowY = "hidden";
}

function closeHeaderMenu() {
    $('#mobile-menu').css('top', '-100%');
    $('#page-title').fadeIn();

    // $('#mobile-menu').fadeOut();
    // $('body').css("overflow", "auto");
    document.getElementsByTagName('html')[0].style.overflowY = "auto";
}

// Check if element is scrolled to the view port ===============================

window.addEventListener('scroll', function () {
    changeHeaderBlur();
});


// page transition ========================================
$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
});


// Lazy loading image in the gallery ========================================
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll(".lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.scrollY;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.style.background = img.dataset.src;
                    img.style.backgroundSize = 'cover';
                    img.style.backgroundPosition = 'center';
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
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