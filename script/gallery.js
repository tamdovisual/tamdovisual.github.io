// Configure Collections here =========================================

var collectionAnLac = {
	collectionName: "An Lạc",
	folder: "an-lac",
	numberOfImage: 22,
};
var collectionDiemNhien = {
	collectionName: "Điềm Nhiên",
	folder: "diem-nhien",
	numberOfImage: 27,
};
var collectionSoiSang = {
	collectionName: "Soi Sáng",
	folder: "soi-sang",
	numberOfImage: 37,
};
var collectionDem = {
	collectionName: "Đêm",
	folder: "dem",
	numberOfImage: 20,
};

// Define variables =========================================
var collectionList = [collectionAnLac, collectionDiemNhien, collectionSoiSang, collectionDem];
var numberOfImage = 0;

var imageList = [];
var currentPreview;
var viewingThumbnail = null;
var imagePreviewDiv = document.getElementById('imagePreviewContainer');
var swiperWarpper = document.getElementsByClassName('swiper-wrapper')[0];
var imgThumbnails = document.getElementsByClassName('thumbnail');

// Initial loading =========================================
// Load images from collections
for (var i = 0; i < collectionList.length; i++) {
	for (var j = 0; j < collectionList[i].numberOfImage; j++) {
		imageList.push({ path: 'asset/image/gallery/' + collectionList[i].folder + '/' + collectionList[i].folder + '-' + j + '.jpg', collectionName: collectionList[i].folder });
		numberOfImage++;
	}
}
// viewGalleryColumn();
// viewGalleryColumn();

$(window).on("load",function(){
	viewGalleryColumn();
});

// Loading images into gallery =========================================

// Show grid
function viewGalleryGrid() {
	document.getElementById('toggleGrid').style.opacity = '1';
	document.getElementById('gallery-container-grid').style.display = 'flex';

	document.getElementById('toggleColumn').style.opacity = '0.5';
	document.getElementById('gallery-container-column').style.display = 'none';
	document.getElementById('collection-column-list').style.display = 'none';
	// Scroll to the top after changeing the view mode
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	// remove all image from column
	removeAllChildNodes('gallery-container-column');

	// load image into column
	loadImageIntoGrid();

	// update onclick event of 2 toggle icons. If user is viewing column mode -> click toggle column will scroll to the top.
	$("#toggleColumn").unbind("click");
	$("#toggleColumn").click(function(){ viewGalleryColumn(); });

	$("#toggleGrid").unbind("click");
	$("#toggleGrid").click(function(){
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});
}

// Show column
function viewGalleryColumn() {
	document.getElementById('toggleGrid').style.opacity = '0.5';
	document.getElementById('gallery-container-grid').style.display = 'none';

	document.getElementById('toggleColumn').style.opacity = '1';
	document.getElementById('gallery-container-column').style.display = 'flex';
	document.getElementById('collection-column-list').style.display = 'flex';

	// Scroll to the top after changeing the view mode
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	// remove all image from grid
	removeAllChildNodes('gallery-container-grid');

	// load image into column
	loadImageIntoColumn();

	// update onclick event of 2 toggle icons. If user is viewing column mode -> click toggle column will scroll to the top.
	$("#toggleGrid").unbind("click");
	$("#toggleGrid").click(function(){ viewGalleryGrid(); });

	$("#toggleColumn").unbind("click");
	$("#toggleColumn").click(function(){
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});
}

function loadImage(path, elementParent) {
	// create thumbnail image as a div
	var img = document.createElement("div");
	img.setAttribute("name", path);
	img.setAttribute('data-src', "url('" + imageList[path].path + "')");
	img.style.backgroundSize = 'cover';
	img.style.backgroundPosition = 'center';

	// waving effect from svg

	// lazy loading
	img.className = "lazy thumbnail " + imageList[path].collectionName;
	img.setAttribute("loading", "lazy");

	// onclick
	img.setAttribute("onclick", 'showPreviewImage()');
	img.onclick = showPreviewImage;

	img.addEventListener("mouseover", function () {
		cursor.classList.add("custom-cursor--link");
	});
	img.addEventListener("mouseout", function () {
		cursor.classList.remove("custom-cursor--link");
	});

	// create thumbnail container as a div
	var container = document.createElement('div');
	container.classList.add('thumbnail-container');
	container.appendChild(img);
	elementParent.appendChild(container);
}

// Load images into grid layout
function loadImageIntoGrid() {
	for (var i = 0; i < imageList.length; i++) {
		var src = document.getElementById('gallery-container-grid');
		loadImage(i, src);
	}

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
}

// Load images into column layout
function loadImageIntoColumn() {
	var leftColumn = document.createElement("div");
	leftColumn.id = 'gallery-container-column-left';
	document.getElementById('gallery-container-column').appendChild(leftColumn);

	var rightColumn = document.createElement("div");
	rightColumn.id = 'gallery-container-column-right';
	document.getElementById('gallery-container-column').appendChild(rightColumn);

	for (var i = 0; i < imageList.length; i++) {
		if (i % 2 == 0) {
			var src = document.getElementById('gallery-container-column-left');
		} else { var src = document.getElementById('gallery-container-column-right') }
		loadImage(i, src);
	}


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


}

function scrollToCollection(collectionName) {
	var fistImageOfCollection = document.getElementsByClassName(collectionName)[0];
	fistImageOfCollection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}


// remove all children within element
function removeAllChildNodes(parentId) {
	while (document.getElementById(parentId).firstChild) {
		document.getElementById(parentId).removeChild(document.getElementById(parentId).firstChild);
	}
}

// Navigate between images via keyboard =========================================

function showPreviewImage() {
	// disable scrolling html page
	document.getElementsByTagName('html')[0].style.overflowY = "hidden";
	viewingThumbnail = this;
	currentPreview = Number(viewingThumbnail.getAttribute('name'));
	swiper.slideTo(0);
	// $('#imagePreviewContainer').fadeIn();

	$('#imagePreviewContainer').fadeIn();
	swiper.slides[0].getElementsByTagName('img')[0].src = imageList[currentPreview].path;
}

const swiper = new Swiper('.imagePreviewContainer', {

	// Optional parameters
	direction: 'horizontal',
	speed: 800,
	loop: true,

	// Navigation arrows
	navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
	},
	spaceBetween: 100,
	mousewheel: true,
	on: {
		slidePrevTransitionStart: (swiper) => {
			console.log('SWIPED LEFT');
			if (currentPreview > 0) {
				currentPreview--;
			} else {
				currentPreview = numberOfImage - 1;
			}
			swiper.slides[0].getElementsByTagName('img')[0].src = imageList[currentPreview].path;
			viewingThumbnail = document.getElementsByName(currentPreview)[0];
		},

		slideNextTransitionStart: (swiper) => {
			console.log('SWIPED RIGHT');
			if (currentPreview < numberOfImage) {
				currentPreview++;
			} else {
				currentPreview = 0;
			}
			swiper.slides[1].getElementsByTagName('img')[0].src = imageList[currentPreview].path;
			viewingThumbnail = document.getElementsByName(currentPreview)[0];
		},

	}
});

function closeImagePreview() {
	//enable scrolling html page
	document.getElementsByTagName('html')[0].style.overflowY = "auto";

	if (!isInViewport(viewingThumbnail)) {
		viewingThumbnail.scrollIntoView({ block: "nearest", inline: "nearest" });
	}

	// viewingThumbnail = null;
	$('#imagePreviewContainer').fadeOut();
}

document.addEventListener('keydown', function (e) {
	// console.log(e.key);
	if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
		swiper.slidePrev(800, true);
	} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
		swiper.slideNext(800, true);
	} else if (e.key === 'Escape' && viewingThumbnail != null) {
		closeImagePreview();
	}
});

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

// Update class of collection-name on mobile devices =========================================
function updateCollectionNameSize() {
	var screenWidth = window.matchMedia("(max-width: 1119px)");
	var collectionName = $("#collection-column-list .collection-name");
	// Mobile size =====
	if (screenWidth.matches) {
		for (var i = 0; i < collectionName.length; i++) {
			collectionName[i].classList.add('wide-14-regular');
			collectionName[i].classList.remove('wide-24-regular');
		}
		$("#gallery-container-column").css("gap", "25%");
		$("#gallery-container-column").css("margin", "64px 1%");
	}
	// Laptop size =====
	else {
		for (var i = 0; i < collectionName.length; i++) {
			collectionName[i].classList.remove('wide-14-regular');
			collectionName[i].classList.add('wide-24-regular');
		}
	}
}
window.addEventListener('resize', updateCollectionNameSize);
// initial load once document is ready
$(document).ready(function () {
	updateCollectionNameSize();
});


// Setting speed of animation by scrolling speed ========================================

var checkScrollSpeed = (function (settings) {
	settings = settings || {};

	var lastPos, newPos, timer, delta,
		delay = settings.delay || 500; // in "ms" (higher means lower fidelity )

	function clear() {
		lastPos = null;
		delta = 0;
	}

	clear();

	return function () {
		newPos = window.scrollY;
		if (lastPos != null) { // && newPos < maxScroll 
			delta = newPos - lastPos;
		}
		lastPos = newPos;
		clearTimeout(timer);
		timer = setTimeout(clear, delay);
		return delta;
	};
})();

// listen to "scroll" event
window.onscroll = function () {
	var speed = checkScrollSpeed();
	var size = Math.max((1 - Math.abs(speed / 400)), 0.2);
	// console.log(speed);
	// var perspective = (Math.min((Math.abs(speed)/10),75))*Math.sign(speed);
	if (Math.abs(speed) > 200) {
		// có cuộn chuột nhanh
		// console.log(size);
		$('#gallery-container-column').find('.thumbnail').css('transform', 'scaleX(' + size + ') scaleY(' + size + ') rotateX(' + 0 + 'deg)');

	}
	else {
		// không cuộn chuột hoặc cuộn rất chậm
		$('#gallery-container-column').find('.thumbnail').css('transform', 'scaleX(1) scaleY(1) rotateX(0deg)');
	}
};

const onScrollStop = callback => {
	let isScrolling;
	window.addEventListener(
		'scroll',
		e => {
			clearTimeout(isScrolling);
			isScrolling = setTimeout(() => {
				callback();
			}, 150);
		},
		false
	);
};

onScrollStop(() => {
	$('#gallery-container-column').find('.thumbnail').css('transform', 'scaleX(1) scaleY(1) rotateX(0deg)');
	//   console.log('The user has stopped scrolling');
});
