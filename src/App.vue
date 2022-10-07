<template>
    <div class="app">
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <Header />
                <!-- <hero-header /> -->
                <!-- <div class="app__content">
                    <Sidebar class="app__nav" />
                    <main class="app__inner-content">
                        <router-view />
                    </main>
                </div> -->
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

import Sidebar from "@/templates/layout/Sidebar.vue";
import Header from "@/templates/layout/Header.vue";
import HeroHeader from "@/templates/Hero/HeroHeader.vue";

export default defineComponent({
    name: "App",
    components: {
        Sidebar,
        Header,
        HeroHeader,
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
