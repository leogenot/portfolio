<template>
    <div
        class="l-base"
        :class="`${globalUserContext}`"
        :style="`--app-height: ${appHeight}px;`"
    >
        <the-loader></the-loader>
        <!-- <the-header></the-header> -->

        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main class="l-main" ref="main">
                    <the-content />
                </main>
                <the-footer></the-footer>
                <the-modal />
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
    computed,
    watch,
} from "vue";
import { useStore } from "vuex";
import { userContext } from "@/utils";

import { gsap, ScrollTrigger, ScrollSmoother } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import TheLoader from "@/templates/layout/TheLoader.vue";
import TheHeader from "@/templates/layout/TheHeader.vue";
import TheContent from "@/templates/layout/TheContent.vue";
import TheFooter from "@/templates/layout/TheFooter.vue";
import TheModal from "@/templates/layout/TheModal.vue";

export default defineComponent({
    name: "TheBase",
    components: {
        TheLoader,
        TheHeader,
        TheContent,
        TheFooter,
        TheModal,
    },
    setup() {
        const store = useStore();

        const smoother = ref(null);
        const currentScrollProgress = ref(0);

        const isLoading = computed(() => store.getters["loader/isLoading"]);
        const isScrollDisabled = computed(
            () => store.state.scroll.isScrollDisabled
        );
        const refreshCount = computed(
            () => store.state.animations.refreshCount
        );

        const globalUserContext = computed(
            () => store.getters["userContext/globalUserContext"]
        );
        const isScrollTop = computed(() => store.getters["scroll/isScrollTop"]);
        const isScrollingUp = computed(
            () => store.getters["scroll/isScrollingUp"]
        );

        ////////////////////////////////
        //       START SET USER CONTEXT
        ////////////////////////////////
        store.dispatch("userContext/setUserContext", userContext);

        ////////////////////////////////
        //       END SET USER CONTEXT
        ////////////////////////////////

        ////////////////////////////////
        //       START SMOOTHSCROLL
        ////////////////////////////////
        // create the smooth scroller FIRST!
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
            nextTick(() => {
                //next tick dont work, leads to some latency issues (this is scary)
                smoother.value = ScrollSmoother.create({
                    wrapper: "#smooth-wrapper",
                    content: "#smooth-content",
                    smooth: 2, // seconds it takes to "catch up" to native scroll position
                    effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
                    //ignoreMobileResize: true,
                    onUpdate: (self) => {
                        checkIfUserScrollTop(
                            self?.scrollTrigger?.progress < 0.01
                        );
                    },
                });

                //store.dispatch("scroll/toggleScrollReady", true);
            });
        }

        //======= START SCROLL TOP =======//

        function checkIfUserScrollTop(progress) {
            progress !== isScrollTop.value
                ? toggleUserScrolled(progress)
                : null;
        }

        function toggleUserScrolled(bool) {
            store.dispatch("scroll/toggleScrollTop", bool);
        }

        //======= END SCROLL TOP =======//

        ////////////////////////////////
        //       END SMOOTHSCROLL
        ////////////////////////////////

        ////////////////////////////////
        //       START SCROLL DIRECTION
        ////////////////////////////////
        function onScroll() {
            toggleScrollDirection(
                currentScrollProgress.value > window.pageYOffset
            );

            nextTick(() => {
                currentScrollProgress.value = window.pageYOffset;
            });
        }

        function toggleScrollDirection(bool) {
            isScrollingUp.value !== bool
                ? store.dispatch("scroll/toggleScrollDirection", bool)
                : null;
        }
        ////////////////////////////////
        //       END SCROLL DIRECTION
        ////////////////////////////////

        ////////////////////////////////
        //       APP SIZE
        ////////////////////////////////
        const appHeight = ref(window.innerHeight);

        const isMobile = computed(() => {
            return store.state.userContext.isMobile;
        });
        ////////////////////////////////
        //      END APP SIZE
        ////////////////////////////////

        ////////////////////////////////
        //       START RESIZE
        ////////////////////////////////
        function refreshScrollTrigger() {
            ScrollTrigger.refresh();
        }

        function onResize() {
            !isMobile.value ? refreshScrollTrigger() : null;
        }
        ////////////////////////////////
        //       END RESIZE
        ////////////////////////////////

        onMounted(() => {
            window.addEventListener("resize", onResize);
            window.addEventListener("scroll", onScroll);
        });
        onBeforeUnmount(() => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
        });

        watch(
            () => isLoading.value,
            (bool) => {
                !bool ? runSmoothScroll() : null;
            }
        );

        watch(
            () => isScrollDisabled.value,
            (bool) => {
                smoother.value ? smoother.value.paused(bool) : null;
            }
        );

        watch(
            () => refreshCount.value,
            () => {
                refreshScrollTrigger();
            }
        );

        return {
            isLoading,
            runSmoothScroll,
            smoother,
            globalUserContext,
            appHeight,
        };
    },
});
</script>

<style lang="scss">
.l-base {
}

.l-main {
}
#smooth-content {
    background-color: var(--color-green);
}
</style>
