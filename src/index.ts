import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* 

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,

});
 */


let scroll;
const htmlElement = document.querySelector("html");
const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const container = select('.text-container');
const scroller = select('[data-scroll-container]');

function initSmoothScroll(container) {

    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    });

    scroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    /**
     * Remove Old Locomotive Scrollbar
     */
    const scrollbar = selectAll('.c-scrollbar');

    if (scrollbar.length > 1) {
        scrollbar[0].remove();
    }

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener('refresh', () => scroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function initShowHideHeader() {

    const header = select('.menu-container');

    const showHeaderAnim = gsap.from(header, {
        yPercent: -100,
        paused: true,
        duration: 0.3
    }).progress(1);

    ScrollTrigger.create({
        scroller: scroller,
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
            self.direction === -1 ? showHeaderAnim.play() : showHeaderAnim.reverse();
            console.log(self.direction);
        }
    });


}

function initScript() {
    initSmoothScroll();
    initShowHideHeader();
}

function updateLoco() {
    scroll.update();
    console.log('loco scroll updated');
}

window.onresize = updateLoco;

window.addEventListener('load', function () {
    initScript();
});


