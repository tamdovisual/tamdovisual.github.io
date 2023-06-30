// Define variables =========================================
var currentPreview;
var viewingThumbnail = null;
var imagePreviewDiv = document.getElementById('imagePreviewContainer');
var swiperWarpper = document.getElementsByClassName('swiper-wrapper')[0];
var imgThumbnails = document.getElementsByClassName('thumbnail');

// Initial loading =========================================

$(window).on("load", function () {
	// Load column gallery =======
	viewGalleryColumn();
	$("#toggleColumn").unbind("click");
	$("#toggleColumn").click(function () {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});

	$("#toggleGrid").unbind("click");
	$("#toggleGrid").click(function () { viewGalleryGrid(); });


	// scroll to collection navigated from homescreen =====
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const collectionRedirect = urlParams.get('collection');
	if(collectionRedirect){
		document.querySelector('#'+ collectionRedirect).scrollIntoView();
		// console.log(collectionRedirect);
	}
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
	removeAllChildNodes('gallery-container-grid');

	// load image into column
	loadImageIntoGrid();

	// update onclick event of 2 toggle icons. If user is viewing column mode -> click toggle column will scroll to the top.
	$("#toggleColumn").unbind("click");
	$("#toggleColumn").click(function () { viewGalleryColumn(); });

	$("#toggleGrid").unbind("click");
	$("#toggleGrid").click(function () {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});

	// Add scroll trigger for scrolling effect =======================
	var thumbnails = gsap.utils.toArray('.thumbnail');
	thumbnails.forEach((thumbnail) => {
		gsap.fromTo(thumbnail, {
			opacity: 0,
			y: 300,
		}, {
			scrollTrigger: {
				trigger: thumbnail,
				start: 'top bottom+=230',
				end: 'center 90%',
				// scrub: true, // cái này sẽ chạy animate theo cuộn chuột, bỏ đi thì sẽ tự động chạy khi cuộn.
				toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
				// markers: true
			},
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out",
			stagger: 0.1,
		});
	})
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
	removeAllChildNodes('gallery-container-column');
	removeAllChildNodes('gallery-container-grid');

	// load image into column
	loadImageIntoColumn();

	// update onclick event of 2 toggle icons. If user is viewing column mode -> click toggle column will scroll to the top.
	$("#toggleGrid").unbind("click");
	$("#toggleGrid").click(function () { viewGalleryGrid(); });

	$("#toggleColumn").unbind("click");
	$("#toggleColumn").click(function () {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});

	// Add scroll trigger for scrolling effect =======================
	var thumbnails = gsap.utils.toArray('.thumbnail');
	thumbnails.forEach((thumbnail) => {
		gsap.fromTo(thumbnail, {
			opacity: 0,
			y: 300,
			scale: 0.3,
		}, {
			scrollTrigger: {
				trigger: thumbnail,
				start: 'top bottom+=300',
				end: 'center 90%',
				// scrub: true, // cái này sẽ chạy animate theo cuộn chuột, bỏ đi thì sẽ tự động chạy khi cuộn.
				toggleActions: "restart none none reverse", // onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
				// markers: true
			},
			duration: 1,
			opacity: 1,
			scale: 1,
			y: 0,
			ease: "back",
			// stagger: 0.1,
		});
	})
}

function loadImage(path, elementParent, isCollectionThumbnail, collectionName) {
	// create thumbnail image as a div
	var img = document.createElement("div");
	img.setAttribute("name", path);
	img.setAttribute('data-src', "url('" + imageList[path].path + "')");
	img.style.backgroundSize = 'cover';
	img.style.backgroundPosition = 'center';
	if(isCollectionThumbnail == true){
		img.id = collectionName;
	}

	// lazy loading
	img.className = "lazy thumbnail " + imageList[path].collectionName;
	img.setAttribute("loading", "lazy");
	img.setAttribute('alt', imageList[path].collectionName);

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
		loadImage(i, src, imageList[i].collectionThumb, imageList[i].collectionName);
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
		loadImage(i, src, imageList[i].collectionThumb, imageList[i].collectionName);
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


// remove all children within element
function removeAllChildNodes(parentId) {
	while (document.getElementById(parentId).firstChild) {
		document.getElementById(parentId).removeChild(document.getElementById(parentId).firstChild);
	}
}

// Navigate between images via keyboard =========================================

var swiper;
function showPreviewImage() {
	// disable scrolling html page
	document.getElementsByTagName('html')[0].style.overflowY = "hidden";
	viewingThumbnail = this;
	currentPreview = Number(viewingThumbnail.getAttribute('name'));
	$('#imagePreviewContainer').fadeIn();

	swiper = new Swiper('.imagePreviewContainer', {

		// Optional parameters
		direction: 'horizontal',
		speed: 800,
		loop: true,
	
		// Navigation arrows
		navigation: {
			nextEl: '.next-img-icon',
			prevEl: '.pre-img-icon',
		},
		spaceBetween: 100,
		mousewheel: true,
		on: {
			slidePrevTransitionStart: (swiper) => {
				// console.log('SWIPED LEFT');
				if (currentPreview > 0) {
					currentPreview--;
				} else {
					currentPreview = numberOfImage - 1;
				}
				swiper.slides[0].getElementsByTagName('img')[0].src = imageList[currentPreview].path;
				viewingThumbnail = document.getElementsByName(currentPreview)[0];
			},
	
			slideNextTransitionStart: (swiper) => {
				// console.log('SWIPED RIGHT');
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

	swiper.slides[0].getElementsByTagName('img')[0].src = imageList[currentPreview].path;
	swiper.slideTo(0,0);
}

function closeImagePreview() {
	//enable scrolling html page
	document.getElementsByTagName('html')[0].style.overflowY = "auto";

	if (!isInViewport(viewingThumbnail)) {
		viewingThumbnail.scrollIntoView({ block: "nearest", inline: "nearest" });
	}

	// viewingThumbnail = null;
	$('#imagePreviewContainer').fadeOut();
	swiper.destroy();
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
var collectionNames = $("#collection-column-list .collection-name");

function updateCollectionNameSize() {
	var screenWidth = window.matchMedia("(max-width: 1119px)");
	// Mobile size =====
	if (screenWidth.matches) {
		for (var i = 0; i < collectionNames.length; i++) {
			collectionNames[i].classList.add('wide-14-regular');
			collectionNames[i].classList.remove('wide-24-regular');
		}
		// $("#gallery-container-column").css("gap", "5%");
		// $("#gallery-container-column").css("margin", "64px 1%");
	}
	// Laptop size =====
	else {
		for (var i = 0; i < collectionNames.length; i++) {
			collectionNames[i].classList.remove('wide-14-regular');
			collectionNames[i].classList.add('wide-24-regular');
		}
	}
}

window.addEventListener('resize', updateCollectionNameSize);

// initial load once document is ready
$(document).ready(function () {
	updateCollectionNameSize();
});


window.addEventListener("scroll", (event) => {

	// highlight scroll to each colleciton.

	if(document.querySelector('#dem').getBoundingClientRect().top < window.innerHeight/2){
		document.querySelector('#collectionAnLacTitle').style.opacity = 0.4;
		document.querySelector('#collectionDiemNhienTitle').style.opacity = 0.4;
		document.querySelector('#collectionSoiSangTitle').style.opacity = 0.4;
		document.querySelector('#collectionDemTitle').style.opacity = 1;
	}
	else if(document.querySelector('#soi-sang').getBoundingClientRect().top < window.innerHeight/2){
		document.querySelector('#collectionAnLacTitle').style.opacity = 0.4;
		document.querySelector('#collectionDiemNhienTitle').style.opacity = 0.4;
		document.querySelector('#collectionSoiSangTitle').style.opacity = 1;
		document.querySelector('#collectionDemTitle').style.opacity = 0.4;
	}
	else if(document.querySelector('#diem-nhien').getBoundingClientRect().top < window.innerHeight/2){
		document.querySelector('#collectionAnLacTitle').style.opacity = 0.4;
		document.querySelector('#collectionDiemNhienTitle').style.opacity = 1;
		document.querySelector('#collectionSoiSangTitle').style.opacity = 0.4;
		document.querySelector('#collectionDemTitle').style.opacity = 0.4;
	}
	else{
		document.querySelector('#collectionAnLacTitle').style.opacity = 1;
		document.querySelector('#collectionDiemNhienTitle').style.opacity = 0.4;
		document.querySelector('#collectionSoiSangTitle').style.opacity = 0.4;
		document.querySelector('#collectionDemTitle').style.opacity = 0.4;
	}
});

