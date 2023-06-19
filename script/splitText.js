import { gsap, TimelineLite } from "./libs/gsap/all.js";
import { SplitText } from "./libs/gsap/splitText.js";

const timeline = new TimelineLite();

var animateText = $('.animateText');
for (var i = 0; i<animateText.length; i++){
    const text = new SplitText(animateText[i], { type: "chars" });

    gsap.set(text.chars, {
        perspective: "1000",
    })
    
    timeline.from(text.chars, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 100,
        transformOrigin: "50% 50%",
        ease: 'back',
        stagger: 0.02
      });
}


// const text = new SplitText(".animateText", { type: "chars" });
// console.log(text);

// gsap.set(text.chars, {
//     perspective: "10",
// })

// timeline.from(text.chars, {
//     duration: 2,
//     opacity: 0,
//     scale: 0 ,
//     y: -160,
//     rotationX: 180,
//     transformOrigin: "50% 50% -100",
//     ease: Elastic.
//     easeOut.config(1.2, 0.75),
//     stagger: 0.05
//   });
  