<!-- <template>
    <section class="c-card-project" ref="container">
        <div class="c-card-project__sidebar">
            <div class="c-card-project__sidebar-content" ref="fixed_text">
                <h2
                    class="c-card-project__sidebar-content-title"
                    @click="openModal(project)"
                >
                    {{ project.title }}
                </h2>
                <p class="c-card-project__sidebar-content-description">
                    {{ project.description }}
                </p>
                <div class="c-card-project__sidebar-content-tags">
                    <ListTag :tags="project.tags" />
                </div>
            </div>
        </div>
        <div class="c-card-project__image" @click="openModal(project)">
            <div class="c-card-project__image-inner">
                <img
                    data-speed="auto"
                    class="c-card-project__image-inner-img"
                    :src="project.cover.url"
                />
            </div>
        </div>
        <button-primary
            label=""
            :iconBefore="'external'"
            class="c-card-project__btn external wiggle"
            @click="openModal(project)"
        />
    </section>
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

        const container = ref();
        const fixed_text = ref();
        const containerHeight = computed(() => {
            return container.value.offsetHeight;
        });
        const contentHeight = computed(() => {
            return fixed_text.value.offsetHeight;
        });

        const refreshCount = computed(
            () => store.state.animations.refreshCount
        );
        let triggers = null;
        const isMobile = computed(() => {
            return store.state.userContext.isMobile;
        });

        function setScrollTrigger() {
            triggers = ScrollTrigger.create({
                trigger: container.value,
                start: "top top",
                //end: () => `+=${containerHeight.value - contentHeight.value}`,
                //start: `-${contentHeight.value}`,
                //end: `+${container.value.clientHeight - window.innerHeight / 4}`,
                end: `+${containerHeight.value}`,
                //end: "bottom top",
                pin: fixed_text.value,
                scrub: true,
            });
            refreshTriggers();
        }

        function onResize() {
            !isMobile.value ? ScrollTrigger.refresh() : null;
        }

        function killTrigger() {
            triggers ? (triggers.kill(), (triggers = null)) : null;
        }

        function refreshTriggers() {
            ScrollTrigger.refresh();
            triggers.refresh();
        }

        watch(
            () => refreshCount.value,
            (val) => {
                nextTick(() => {
                    refreshTriggers();
                });
            }
        );

        onMounted(() => {
            ScrollTrigger.refresh();
            window.addEventListener("resize", onResize);
            setScrollTrigger();
        });
        onBeforeUnmount(() => {
            window.removeEventListener("resize", onResize);
            killTrigger();
        });

        return {
            project,
            openModal,
            container,
            fixed_text,
            ScrollTrigger,
        };
    },
});
</script>

<style lang="scss">
.c-card-project {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10rem;
    &__sidebar {
        width: 50%;
        &-content {
            margin-top: 15rem;
            height: fit-content;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            &-title {
                font-size: var(--fs-large);
                font-family: var(--ff-heading);
                color: var(--color-pistachio);
                @include min(md) {
                    font-size: var(--fs-2xl);
                }
                cursor: pointer;
            }
            &-description {
                font-size: var(--fs-small);
                @include min(md) {
                    font-size: var(--fs-regular);
                }
                font-family: var(--ff-body);
                color: var(--color-pistachio);
                padding-right: 1em;
            }
        }
    }

    &__image {
        width: 50%;
        //aspect-ratio: 4/5;

        cursor: pointer;
        &-inner {
            width: 100%;
            height: 100%;
            overflow: hidden;
            &-img {
                height: 110%;
                width: auto;

                max-width: auto;
                max-height: 110%;
                object-fit: cover;
            }
        }
    }
    &__btn {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 2rem;
        &.external {
            --btn-border-color: transparent;
            --btn-hover-display: none;
        }
    }
}

.wiggle {
    animation: wiggle 5s infinite;
}

@keyframes wiggle {
    0% {
        transform: rotate(0);
    }

    90% {
        transform: rotate(0);
    }

    92% {
        transform: rotate(5deg);
    }

    94% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0);
    }
}

@keyframes wigglecontinue {
    0% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(-5deg);
    }
}
</style>
 -->

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
            @include min(lg) {
                font-size: var(--fs-2xl);
            }
            @include min(md) {
                font-size: var(--fs-large);
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
