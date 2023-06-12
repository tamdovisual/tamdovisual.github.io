// Define variables =========================================

var imageList = [];
var currentPreview;
var viewingThumbnail = null;
var imagePreviewElement = document.getElementById('imagePreview');
var overlayElement = document.getElementById('overlay');
var imgThumbnails = document.getElementsByClassName('thumbnail');


// Initial loading =========================================

// Load all images in gallery folder (Cái này hiện đang lỗi, vẫn phải fix cứng code)
// var folder = "./asset/image/gallery/";
// $.ajax({
//     url : folder,
//     success: function (data) {
//         $(data).find("a").attr("href", function (i, val) {
// 			if(val.isDirectory){console.log( val)}
//             if(val.match(/\.(jpe?g|png|gif)$/) ) { 
// 				imageList.push(val);
//             }
//         });
//     }
// });
// $(document).ajaxComplete(function(){
// 	viewGalleryColumn();
//   });


for(var i = 0; i< 104; i++){
	imageList.push('./asset/image/gallery/image-'+ i +".jpg");
}
viewGalleryColumn();


// Loading images into gallery =========================================
  
// Show grid
function viewGalleryGrid(){
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
}

// Show column
function viewGalleryColumn(){
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
}

// Load images into grid layout
function loadImageIntoGrid(){
	for(var i = 0; i<imageList.length;i++){
		var img = document.createElement("div");
		img.style.background = "url('" + imageList[i] + "')";
		img.setAttribute("name",i);
		img.style.backgroundSize = 'cover';
		img.style.backgroundPosition = 'center';
		img.className = "thumbnail";
		img.onclick = showPreviewImage;
		var src = document.getElementById('gallery-container-grid');
		src.appendChild(img);
	}
}

// Load images into column layout
function loadImageIntoColumn(){
	var leftColumn = document.createElement("div");
	leftColumn.id = 'gallery-container-column-left';
	document.getElementById('gallery-container-column').appendChild(leftColumn);

	var rightColumn = document.createElement("div");
	rightColumn.id = 'gallery-container-column-right';
	document.getElementById('gallery-container-column').appendChild(rightColumn);

	for(var i = 0; i<imageList.length;i++){
		var img = document.createElement("div");
		img.style.background = "url('" + imageList[i] + "')";
		img.setAttribute("name",i);
		img.style.backgroundSize = 'contain';
		img.style.backgroundPosition = 'center';
		img.style.backgroundRepeat = 'no-repeat';
		// img.style.opacity = '0';
		// img.style.top = '300px';
		img.className = "thumbnail";
		img.onclick = showPreviewImage;
		if(i % 2 == 0){var src = document.getElementById('gallery-container-column-left');
		} else {var src = document.getElementById('gallery-container-column-right')}
		src.appendChild(img);  
	}
}

// remove all children within element
function removeAllChildNodes(parentId) {
    while (document.getElementById(parentId).firstChild) {
		document.getElementById(parentId).removeChild(document.getElementById(parentId).firstChild);
    }
}

// Animation for loading effect =========================================
// function loadImageAnimation(){
// 	const delay = async (ms = 1000) =>
// 	new Promise(resolve => setTimeout(resolve, ms))

// 	async function makeALoopWait() {
// 		for (let i = 0; i < imageList.length; i += 1) {
// 		// Your code goes after this line!
// 		imgThumbnails[i].style.opacity = '1';
// 		imgThumbnails[i].style.top = '0px';
// 		// Your code must finish before this line!
// 		await delay(50)
// 		}
// 	}
// 	makeALoopWait();
// }
// loadImageAnimation();


// Animate Image Thumbnail on scrolling
// function animateImageThumbnail(){
// 	for (var i = 0; i < imageList.length; i++){
// 		if((imgThumbnails[i].getBoundingClientRect().top - window.innerHeight) > 300){
// 			imgThumbnails[i].style.top = '300px';
// 			imgThumbnails[i].style.opacity = '0';
// 		}
// 		else{
// 			imgThumbnails[i].style.top = '0px';
// 			imgThumbnails[i].style.opacity = '1';
// 		}
// 	}
// }

// window.addEventListener('scroll', function() {
// 	animateImageThumbnail();
//   });



  // Navigate between images via keyboard =========================================
  function showPreviewImage() {
	viewingThumbnail = this;
	currentPreview = Number(viewingThumbnail.getAttribute('name'));
	imagePreviewElement.style.transition = 'all 0.3s ease-in-out';
	imagePreviewElement.style.top = viewingThumbnail.getBoundingClientRect().top + "px";
	imagePreviewElement.style.right = viewingThumbnail.getBoundingClientRect().right + "px";
	imagePreviewElement.style.bottom = viewingThumbnail.getBoundingClientRect().bottom + "px";
	imagePreviewElement.style.left = viewingThumbnail.getBoundingClientRect().left + "px";
	imagePreviewElement.style.width = viewingThumbnail.getBoundingClientRect().width + "px";
	imagePreviewElement.style.height = viewingThumbnail.getBoundingClientRect().height + "px";
	imagePreviewElement.style.background = viewingThumbnail.style.background;
	imagePreviewElement.style.display = 'block';
	imagePreviewElement.style.backgroundSize = 'contain';
	imagePreviewElement.style.backgroundRepeat = 'no-repeat';
	overlayElement.style.display = 'block';
	setTimeout(function() {
		imagePreviewElement.style.top = "0px";
		imagePreviewElement.style.right = "0px";
		imagePreviewElement.style.bottom = "0px";
		imagePreviewElement.style.left = "0px";
		imagePreviewElement.style.width = "100vw";
		imagePreviewElement.style.height = "100vh";
   }, 5);      
   setTimeout(function(){
	imagePreviewElement.style.transition = 'all 0s';
   }, 310);
}

function closeImagePreview(){
	imagePreviewElement.style.transition = 'all 0.3s ease-in-out';
	viewingThumbnail.scrollIntoView();
	imagePreviewElement.style.top = viewingThumbnail.getBoundingClientRect().top + "px";
	imagePreviewElement.style.right = viewingThumbnail.getBoundingClientRect().right + "px";
	imagePreviewElement.style.bottom = viewingThumbnail.getBoundingClientRect().bottom + "px";
	imagePreviewElement.style.left = viewingThumbnail.getBoundingClientRect().left + "px";
	imagePreviewElement.style.width = viewingThumbnail.getBoundingClientRect().width + "px";
	imagePreviewElement.style.height = viewingThumbnail.getBoundingClientRect().height + "px";
	viewingThumbnail = null;
	setTimeout(function() {
		imagePreviewElement.style.display = 'none';
		overlayElement.style.display = 'none';   
		imagePreviewElement.style.transition = 'all 0s'; 
   }, 310);      
}

function previewNextImage(){
	if(currentPreview < imageList.length - 1){
		currentPreview++;
	}
	else{
		currentPreview = 0;
	}
	imagePreviewElement.style.background = "url('" + imageList[currentPreview] + "')" +  'center center / contain no-repeat';
	// viewingThumbnail = document.getElementsByClassName('thumbnail')[currentPreview];
	viewingThumbnail = document.getElementsByName(currentPreview)[0];
}

function previewPreviousImage(){
	if(currentPreview > 0){
		currentPreview--;
	} else{
		currentPreview = imageList.length - 1;
	}
	imagePreviewElement.style.background = "url('" + imageList[currentPreview] + "')" + 'center center / contain no-repeat';
	viewingThumbnail = document.getElementsByName(currentPreview)[0];
}

  document.addEventListener('keydown', function(e) {
	console.log(e.key);
	if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
	  previewPreviousImage();
	} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
	  previewNextImage();
	} else if(e.key === 'Escape' && viewingThumbnail != null){
		closeImagePreview();
	}
  });