import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


/* const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});


scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },

    // Apparently, thefollwoing line is not required make pinning work on touch screen (since 4.0.0 ??)
    // but (since 4.0.0 ??) the grabbing seems buggy, so 3.6.1 is still being used in this demo 

    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"

});

ScrollTrigger.defaults({ scroller: '[data-scroll-container]' });




gsap.set('section.footer-container', { yPercent: -50 })

const uncover = gsap.timeline({ paused: true })

uncover
    .to('section.footer-container', { yPercent: 0, ease: 'none' })
    ;

ScrollTrigger.create({
    trigger: 'section.conclusion',
    start: 'bottom bottom',
    end: '+=75%',
    animation: uncover,
    scrub: true,
    markers: true,
})





ScrollTrigger.addEventListener("refresh", () => scroll.update());

ScrollTrigger.refresh();  */

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scroller"),
    smooth: true,

    // // --- // for versions (since 4.0.0 ??)
    // // --- // for tablet smooth
    // tablet: { smooth: true },
    // // --- // for mobile
    // smartphone: { smooth: true }

});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },

    // Apparently, thefollwoing line is not required make pinning work on touch screen (since 4.0.0 ??)
    // but (since 4.0.0 ??) the grabbing seems buggy, so 3.6.1 is still being used in this demo 

    pinType: document.querySelector(".scroller").style.transform ? "transform" : "fixed"

});

ScrollTrigger.defaults({ scroller: '.scroller' });





gsap.set('section.footer-container', { yPercent: -50 })

const uncover = gsap.timeline({ paused: true })

uncover
    .to('section.footer-container', { yPercent: 0, ease: 'none' })
    ;

ScrollTrigger.create({
    trigger: 'section.conclusion',
    start: 'bottom bottom',
    end: '+=75%',
    animation: uncover,
    scrub: true,
    markers: true,
})





ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();