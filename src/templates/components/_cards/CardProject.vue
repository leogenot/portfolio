<template>
    <div
        class="c-card-project | desktop"
        @mouseenter="playAnimation"
        @mouseleave="stopAnimation"
        @click="openModal(project)"
    >
        <div class="c-card-project-project">
            <h4
                class="c-card-project-project-title"
                :class="className"
                ref="title"
            >
                {{ project.title }}
            </h4>
            <div class="c-card-project-project-image" ref="imageContainer">
                <img
                    data-speed="auto"
                    class="c-card-project-project-image-img"
                    :src="project.cover.url"
                />
                <ListTag
                    :tags="project.tags"
                    class="c-card-project-project-image-tags"
                />
            </div>
        </div>
    </div>

    <div class="c-card-project | mobile" @click="openModal(project)">
        <div class="c-card-project-project">
            <h4 class="c-card-project-project-title">{{ project.title }}</h4>
            <div class="c-card-project-project-image">
                <img
                    data-speed="auto"
                    class="c-card-project-project-image-img"
                    :src="project.cover.url"
                />
                <ListTag
                    :tags="project.tags"
                    class="c-card-project-project-image-tags"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    computed,
    ref,
    toRef,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick,
} from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import ObjectAsset from "@/templates/objects/ObjectAsset.vue";
import ListTag from "@/templates/components/ListTag.vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "CardProject",
    components: {
        ListTag,
        ObjectAsset,
        ButtonPrimary,
    },
    props: {
        project: {
            type: Object,
            required: false,
        },
    },

    setup(props) {
        const store = useStore();
        const project = toRef(props, "project");

        function openModal(data) {
            store.dispatch("modal/open", {
                component: MODAL_COMPONENTS.Project,
                data,
            });
        }
        ////////////////////////////////
        //       START IMAGE TIMELINE
        ////////////////////////////////

        const imageContainer = ref();
        const title = ref();

        const imageAnimationTimeline = gsap.timeline({
            paused: true,
        });

        function initImageTimeline() {
            /* imageAnimationTimeline.to(imageContainer.value, {
                //height: "calc((100vw - var(--full-screen-gutters)) / 2.4 * 0.65)",
                autoAlpha: 1,
                duration: 1,
                ease: "Expo.easeOut",
                onComplete: () => ScrollTrigger.refresh(),
                onUpdate: () => ScrollTrigger.refresh(),
            }); */
        }

        const isCurrentlyHovered = ref(false);

        function playAnimation() {
            isCurrentlyHovered.value = true;
            imageAnimationTimeline.play();
            ScrollTrigger.refresh();
        }
        function stopAnimation() {
            isCurrentlyHovered.value = false;
            imageAnimationTimeline.reverse();
            ScrollTrigger.refresh();
        }

        ////////////////////////////////
        //       END IMAGE TIMELINE
        ////////////////////////////////

        const className = computed(() => [
            "c-card-project-project-title",
            isCurrentlyHovered.value ? "-current" : "-nocurrent",
        ]);

        onMounted(() => {
            title.value.addEventListener("mouseenter", (e) => {
                gsap.to(imageContainer.value, { autoAlpha: 1 });
            });

            title.value.addEventListener("mouseleave", (e) => {
                gsap.to(imageContainer.value, { autoAlpha: 0 });
            });
            title.value.addEventListener("mousemove", (e) => {
                gsap.set(imageContainer.value, { x: e.offsetX - 300 });
            });
            //initImageTimeline();
            ScrollTrigger.refresh();
        });

        onBeforeUnmount(() => {
            //imageAnimationTimeline ? imageAnimationTimeline.kill() : null;
        });

        return {
            project,
            openModal,
            imageContainer,
            imageAnimationTimeline,
            playAnimation,
            stopAnimation,
            title,
            className,
        };
    },
});
</script>

<style lang="scss">
.c-card-project {
    --full-screen-gutters: 90px;
    --layout-horizontal-padding: 20px;
    --crop-path-btm-left: 0%;
    --crop-path-btm-right: 0%;
    @include min(lg) {
        --layout-horizontal-padding: 45px;
        --full-screen-gutters: 365px;
    }
    &-project {
        &-title {
            font-size: var(--fs-regular);
            @include min(md) {
                font-size: var(--fs-xl);
            }
            cursor: default;

            &.-nocurrent {
                z-index: 0;
            }
            &.-current {
                z-index: 2;
            }
        }
        &-image {
            display: flex;
            overflow: hidden;
            margin: 12px 0 20px;
            width: 100%;
            height: 290px;
            overflow: hidden;
            @include min(md) {
                position: absolute;
                width: 300px;
                height: auto;
                object-fit: cover;
                transform: translateX(-50%) translateY(-50%);
                top: 50%;
                left: 50%;
                z-index: 1;
                opacity: 0;
                visibily: hidden;
                pointer-events: none;
            }

            &-img {
                /*object-fit: cover;
                width: 100%;
                height: 100%;
                object-position: left;*/
                object-fit: cover;
                width: calc(100vw - var(--layout-horizontal-padding) * 2);
                height: 110%;
                object-position: left;

                @include min(md) {
                    width: 100%;
                    height: calc(
                        (110vw - var(--full-screen-gutters)) / 2.4 * 0.8
                    );
                    object-position: initial;
                }
            }

            &-tags {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
            }
        }
    }
}

.mobile {
    @include min(md) {
        display: none;
    }
}
.desktop {
    @include max(md) {
        display: none;
    }
}
</style>
