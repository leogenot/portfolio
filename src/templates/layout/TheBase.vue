<template>
    <div class="l-base">
        <the-loader></the-loader>
        <the-header></the-header>

        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main class="l-main" ref="main">
                    <the-content />
                </main>
                <the-footer></the-footer>
            </div>
        </div>
    </div>
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

import TheLoader from "@/templates/layout/TheLoader.vue";
import TheHeader from "@/templates/layout/TheHeader.vue";
import TheContent from "@/templates/layout/TheContent.vue";
import TheFooter from "@/templates/layout/TheFooter.vue";

export default defineComponent({
    name: "TheBase",
    components: {
        TheLoader,
        TheHeader,
        TheContent,
        TheFooter,
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
.l-base {
}

.l-main {
}
#smooth-content {
    background-color: black;
}
</style>
