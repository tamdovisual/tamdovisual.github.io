import { gsap, TimelineLite } from "./libs/gsap/all.js";
// gsap.registerPlugin(ScrollTrigger);

const timeline = new TimelineLite();

var animateTextMovement = $('.animateTextMovement');
for (var i = 0; i<animateTextMovement.length; i++){

    const text = SplitType.create(animateTextMovement[i]);

    gsap.from(text.chars, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 100,
        transformOrigin: "50% 50%",
        ease: 'back',
        stagger: 0.02,
        delay: i/5,
      });
}

// Animate Text Width ==============================================

var animateTexWidth = $('.animateTextWidth');

for(i = 0; i<animateTexWidth.length; i++){

  const text = SplitType.create(animateTexWidth[i]);
  const textWidthAnimation = gsap.timeline({
    repeat: -1,
    defaults: {ease: "Power2.easeOut"}
  });

  textWidthAnimation
  .to(text.chars, {
    'fontWeight': '100',
    'fontStretch': '62%',
    stagger: 0.1,
    duration: 1,
    delay: 1,
    })
  .to(text.chars, {
    'fontWeight': '900',
    'fontStretch': '125%',
    stagger: 0.05,
    duration: 2,
  });

}



// const text = SplitType.create('.animateTextWidth');

// const textWidthAnimation = gsap.timeline({
//     repeat: -1,
//     // yoyo: true,
//     defaults: {ease: "Power2.easeOut"}
//   });

//   textWidthAnimation
//     .to(text.chars, {
//     fontWeight: 50,
//     fontStretch: 60,
//     stagger: 0.05,
//     duration: 2,
//     delay: 2,
//     })
//     .to(text.chars, {
//     fontWeight: 900,
//     fontStretch: 120,
//     stagger: 0.05,
//     duration: 1,
//   });
