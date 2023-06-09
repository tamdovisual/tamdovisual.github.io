var currentPreview;
var viewingThumbnail = null;
var numberOfImage = 105;
var imagePreviewElement = document.getElementById('imagePreview');
var overlayElement = document.getElementById('overlay');
var imgThumbnails = document.getElementsByClassName('thumbnail');

function showPreviewImage() {
    viewingThumbnail = this;
    currentPreview = Number(viewingThumbnail.name);
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
   },400);
}

function closeImagePreview(){
    imagePreviewElement.style.transition = 'all 0.3s ease-in-out';
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
   }, 350);      
}

for(var i = 0; i<numberOfImage;i++){
    var img = document.createElement("div");
    img.style.background = "url('asset/image/gallery/image-" + i + ".jpg')";
    img.name = i;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    img.style.opacity = '0';
    img.style.top = '300px';
    img.className = "thumbnail";
    img.onclick = showPreviewImage;
    var src = document.getElementById('gallery-container');
    src.appendChild(img);
}

function animateImageThumbnail(){
    for (var i = 0; i < numberOfImage; i++){
        if((imgThumbnails[i].getBoundingClientRect().top - window.innerHeight) > 300){
            imgThumbnails[i].style.top = '300px';
            imgThumbnails[i].style.opacity = '0';
        }
        else{
            imgThumbnails[i].style.top = '0px';
            imgThumbnails[i].style.opacity = '1';
        }
    }
}

window.addEventListener('scroll', function() {
    animateImageThumbnail();
  });


  // Navigate between images via keyboard
function previewNextImage(){
    if(currentPreview < numberOfImage - 1){
        currentPreview++;
    }
    else{
        currentPreview = 0;
    }
    imagePreviewElement.style.background = "url('asset/image/gallery/image-" + currentPreview + ".jpg')" +  'center center / contain no-repeat';
    viewingThumbnail = document.getElementsByClassName('thumbnail')[currentPreview];
}

function previewPreviousImage(){
    if(currentPreview > 0){
        currentPreview--;
    } else{
        currentPreview = numberOfImage - 1;
    }
    imagePreviewElement.style.background = "url('asset/image/gallery/image-" + currentPreview + ".jpg')" + 'center center / contain no-repeat';
    viewingThumbnail = document.getElementsByClassName('thumbnail')[currentPreview];
}

  document.addEventListener('keydown', function(e) {
    console.log(e.key);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      previewPreviousImage();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      previewNextImage();
    } else if(e.key === 'Escape'){
        closeImagePreview();
    }
  });

function loadImageAnimation(){
    const delay = async (ms = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms))

    async function makeALoopWait() {
        for (let i = 0; i < numberOfImage; i += 1) {
        // Your code goes after this line!
        imgThumbnails[i].style.opacity = '1';
        imgThumbnails[i].style.top = '0px';
        // Your code must finish before this line!
        await delay(50)
        }
    }
    makeALoopWait();
}

loadImageAnimation();