<template>
    <div
        class="c-card-project | desktop"
        @mouseenter="playAnimation"
        @mouseleave="stopAnimation"
        @click="openModal(project)"
    >
        <div class="c-card-project-project">
            <h4 class="c-card-project-project-title">{{ project.title }}</h4>
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

        const imageAnimationTimeline = gsap.timeline({
            paused: true,
        });

        function initImageTimeline() {
            imageAnimationTimeline.to(imageContainer.value, {
                //"--crop-path-btm-left": "100%",
                //"--crop-path-btm-right": "100%",
                height: "calc((100vw - var(--full-screen-gutters)) / 2.4 * 0.65)",
                duration: 1,
                ease: "Expo.easeOut",
                onComplete: () => ScrollTrigger.refresh(),
                onUpdate: () => ScrollTrigger.refresh(),
                //onStart: () => ScrollTrigger.refresh(),
            });

            //imageAnimationTimeline.play();
        }

        function playAnimation() {
            imageAnimationTimeline.play();
            ScrollTrigger.refresh();
        }
        function stopAnimation() {
            imageAnimationTimeline.reverse();
            ScrollTrigger.refresh();
        }
        ////////////////////////////////
        //       END IMAGE TIMELINE
        ////////////////////////////////

        onMounted(() => {
            initImageTimeline();
            ScrollTrigger.refresh();
        });

        onBeforeUnmount(() => {
            imageAnimationTimeline ? imageAnimationTimeline.kill() : null;
        });

        return {
            project,
            openModal,
            imageContainer,
            imageAnimationTimeline,
            playAnimation,
            stopAnimation,
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
        }
        &-image {
            display: flex;
            overflow: hidden;
            margin: 12px 0 20px;
            width: 100%;
            height: 290px;
            overflow: hidden;
            @include min(md) {
                width: calc(100px + (100% - 150px) / 7 * 5);
                height: 0;
            }

            &-img {
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
