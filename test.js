var index = 0;
var currentSlide = 0;

const swiper = new Swiper('.imagePreviewContainer', {

	// Optional parameters
	direction: 'horizontal',
	speed: 1000,
	loop: true,

	// Navigation arrows
	navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
	},
	spaceBetween: 100,
	mousewheel: true,
	on: {
		slideNextTransitionStart: (swiper) => {
			console.log('SWIPED RIGHT');
      if (index < 21){
        index++;
      } else{
        index=0;
      }

      if( currentSlide == 0){
        swiper.slides[1].getElementsByTagName('img')[0].src = "asset/image/gallery/an-lac/an-lac-" + index + ".jpg";
      }
      else  swiper.slides[0].getElementsByTagName('img')[0].src = "asset/image/gallery/an-lac/an-lac-" + index + ".jpg";
		},
		slidePrevTransitionStart: (swiper) => {
			console.log('SWIPED LEFT');
      if (index > 0){
        index--;
      } else{
        index=21;
      }
      if(currentSlide == 1){
        swiper.slides[1].getElementsByTagName('img')[0].src = "asset/image/gallery/an-lac/an-lac-" + index + ".jpg";
      }
      else  swiper.slides[0].getElementsByTagName('img')[0].src = "asset/image/gallery/an-lac/an-lac-" + index + ".jpg";

    },
	}
});