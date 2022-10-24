<template>
    <div :class="className" ref="loader">
        <div class="c-loader__blur" ref="blur"></div>
    </div>
</template>
<script>
import { defineComponent, computed, ref, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

import { LOADER } from "@/constants";

import { gsap, CustomEase } from "gsap/all";
gsap.registerPlugin(CustomEase);

export default defineComponent({
    components: {},
    props: {},
    setup() {
        const store = useStore();

        const isLoading = ref(true);
        const loader = ref();
        const blur = ref();
        const coverDelay = ref(LOADER.cover * 1000);

        const isFirstLoad = computed(() => store.getters["loader/isFirstLoad"]);
        const isStoreLoading = computed(
            () => store.getters["loader/isLoading"]
        );

        const className = computed(() => {
            let classname = "c-loader";

            if (isFirstLoad.value) {
                classname += " c-loader--firstload";
            }

            if (isLoading.value) {
                classname += " is-loading";
            }

            return classname;
        });

        // set custom ease
        CustomEase.create("customEase", "0.43, 0.00, 0.09, 1.00");

        function firstLoadEnd() {
            const delay = 0;
            // leave legacy code below just in case
            // let delay = new Date();
            // delay = delay - this.startTime;

            // Let at least 360 degrees rotation
            // delay = delay > 3000 ? 0 : 3000 - delay;

            // Delay in seconds
            // delay = delay / 1000;

            // Remove Loader
            gsap.timeline({
                delay,
                onComplete: () => {
                    toggleLoading(false);
                    store.dispatch("loader/markAsFirstLoaded");
                    store.dispatch("animations/toggleRefreshGlobally");
                    store.dispatch("loader/isLoaderVisible", false);
                    store.dispatch("scroll/toggleDisabledScroll", false);
                },
            }).to(
                loader.value,

                {
                    ease: "customEase",

                    duration: LOADER.firstLoad,
                    //"--crop-path-bottom-left": "0%",
                    //"--crop-path-bottom-right": "0%",
                    "--blur-height": "50vh",
                    "--blur-width": "50vh",
                    "--bg-opacity": 0,
                },
                "start"
            );
        }
        function loadStart() {
            toggleLoading(true);
            store.dispatch("loader/increment", "startLoad");
            store.dispatch("loader/isLoaderVisible", false);

            gsap.set(loader.value, {
                "--crop-path-top-left": "100%",
                "--crop-path-top-right": "100%",

                "--crop-path-bottom-left": "100%",
                "--crop-path-bottom-right": "100%",

                "--blur-height": "950vh",
                "--blur-width": "950vh",
            });

            gsap.to(loader.value, {
                ease: "customEase",
                duration: LOADER.toCover,
                //"--crop-path-top-left": "0%",
                //"--crop-path-top-right": "0%",

                "--blur-height": "50vh",
                "--blur-width": "50vh",
                //"--bg-opacity": 0,

                onComplete: () => {
                    // Dispatch load start and load end after `coverDelay` for minimum animation time
                    setTimeout(() => {
                        // Scroll to top
                        window.scrollTo(0, 0);
                        store.dispatch("loader/decrement", "startLoad");
                    }, coverDelay.value);
                },
            });
        }
        function loadEnd() {
            gsap.to(loader.value, {
                ease: "customEase",
                duration: LOADER.toUncover,
                "--crop-path-bottom-left": "0%",
                "--crop-path-bottom-right": "0%",

                onComplete: () => {
                    toggleLoading(false);
                    store.dispatch("animations/toggleRefreshGlobally");
                    store.dispatch("loader/isLoaderVisible", false);
                    store.dispatch("scroll/toggleDisabledScroll", false);
                },
            });
        }

        function toggleLoading(bool) {
            isLoading.value = bool;
        }

        watch(
            () => isStoreLoading.value,
            (loading) => {
                // Hide first loader when load is ended
                if (isFirstLoad.value && !loading) {
                    return firstLoadEnd();
                }
                if (loading && !isLoading.value) {
                    loadStart();
                } else if (!loading && isLoading.value) {
                    loadEnd();
                }
            }
        );

        onBeforeUnmount(() => {
            gsap.killTweensOf(loader.value);
        });

        return { className, loader, blur };
    },
});
</script>

<style lang="scss" scoped>
.c-loader {
    --crop-path-top-left: 0%;
    --crop-path-top-right: 0%;

    --crop-path-bottom-left: 100%;
    --crop-path-bottom-right: 100%;

    --blur-height: 10vh;
    --blur-width: 10vh;
    --bg-opacity: 1;
    --loader-color: var(--color-green);
    z-index: -100; // Avoid having the loader displayed on every hotReload
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: var(--bg-opacity);

    /*   clip-path: polygon(
        0 var(--crop-path-top-left),
        100% var(--crop-path-top-right),
        100% var(--crop-path-bottom-right),
        0% var(--crop-path-bottom-left)
    ); */

    &:after {
        content: " ";
        background-color: var(
            --loader-color
        ); // light because beige is hard to see over the beige background
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        // z-index: 99;
    }

    &.is-loading {
        z-index: 100;
        pointer-events: auto;
    }
    &--firstload {
        &.is-loading {
            z-index: 98;
        }
    }
    &__blur {
        z-index: 990;
        position: absolute;
        width: var(--blur-width);
        height: var(--blur-height);
        //overflow: hidden;
        @include min(md) {
            //--blur-width: 30vh;
            //--blur-height: 30vh;
        }
        border-radius: 100%;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        //  scale(calc(2 * calc(var(--view-progress) * 2)));
        background-color: var(--color-orange);
        overflow: hidden;
        will-change: filter;
        @include blur(20px);
    }
}
</style>
