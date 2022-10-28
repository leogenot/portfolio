<template>
    <div :class="className" ref="loader">
        <div class="c-loader__blur" ref="blur"></div>
    </div>
</template>
<script>
import { defineComponent, computed, ref, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

import { LOADER } from "@/constants";

import { gsap } from "gsap/all";

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

        function firstLoadEnd() {
            const delay = 0;

            // Remove Loader
            gsap.timeline({
                delay,
                onComplete: () => {
                    toggleLoading(false);
                    store.dispatch("loader/markAsFirstLoaded");
                    store.dispatch("loader/isLoaderVisible", false);
                    store.dispatch("scroll/toggleDisabledScroll", false);
                },
            }).to(
                loader.value,

                {
                    ease: "Expo.easeInOut",

                    duration: LOADER.firstLoad,
                    "--blur-height": "50vh",
                    "--blur-width": "50vh",
                    "--bg-opacity": 0,
                },
                "start"
            );
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
        border-radius: 100%;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        background-color: var(--color-orange);
        overflow: hidden;
        will-change: filter;
        @include blur(20px);
    }
}
</style>
