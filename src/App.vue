<template>
    <the-base />
</template>
<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";

import { gsap, ScrollTrigger, ScrollSmoother } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import TheBase from "@/templates/layout/TheBase.vue";

export default defineComponent({
    name: "App",
    components: {
        TheBase,
    },
    setup() {
        const smoother = ref(null);
        const currentScrollProgress = ref(0);

        function runSmoothScroll() {
            window.scrollTo(0, 0);
            smoother.value
                ? (killExistingSmoother(), initSmoothScroll())
                : initSmoothScroll();
        }

        function killExistingSmoother() {
            smoother.value.kill();
            smoother.value = null;
        }

        function initSmoothScroll() {
            smoother.value = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 2,
                effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
                ignoreMobileResize: true,
            });
        }

        function onScroll() {
            currentScrollProgress.value = window.pageYOffset;
        }

        onMounted(() => {
            window.addEventListener("scroll", onScroll);

            nextTick(() => {
                runSmoothScroll();
            });
        });
        onBeforeUnmount(() => {
            window.removeEventListener("scroll", onScroll);
        });
    },
});
</script>

<style lang="scss">
.app {
    &__content {
        max-width: $size-app-max-width;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding-bottom: $grid-20;

        @media screen and (min-width: $size-mobile-breakpoint) {
            flex-direction: row;
        }
    }

    &__nav {
        flex: 0 0 $grid-40;
    }

    &__inner-content {
        padding: $grid-3 $grid-7;
        flex-grow: 1;
    }
}
</style>
