<template>
    <!--     <div
        class="c-project-modal | l-grid"
        :class="{ 'c-project-modal--active': isOpen }"
    >
        <button-primary
            class="c-project-modal-btn"
            label="Go back"
            color="light"
            iconAfter="close"
            @click="close"
        />
        {{ data.title }}
    </div> -->

    <div
        class="c-project-modal | l-container"
        :class="{ 'c-project-modal--active': isOpen }"
    >
        <header class="c-project-modal__header">
            <h2 class="c-project-modal__header-title">
                {{ data.title }}
            </h2>
            <!-- <button class="c-project-modal__close__dk9kP">Close</button> -->
            <button-primary
                class="c-project-modal-btn"
                label="Close"
                color="light"
                @click="close"
            />
        </header>
        <div class="c-project-modal__content">
            <div class="c-project-modal__content-details">
                <p class="c-project-modal__content-details-description">
                    {{ data.description }}
                </p>
                <button-primary
                    v-if="data.link"
                    :label="data.link.label"
                    iconAfter="external"
                    color="light"
                    tag="a"
                    :href="data.link.url"
                    target="_blank"
                    class="c-project-modal__content-details-btn"
                />
                <div class="c-project-modal__content-infos">
                    <h4>PROJECT INFO</h4>
                    <div class="c-project-modal__content-infos-description">
                        <div
                            class="c-project-modal__content-infos-description-role"
                        >
                            <span>Tags</span>
                            <span><ListTag :tags="data.tags" /></span>
                        </div>
                        <div
                            class="c-project-modal__content-infos-description-year"
                        >
                            <span>Year</span>
                            <span>2020</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="c-project-modal__content-images">
                <div class="c-project-modal__content-images-wrapper">
                    <img
                        v-for="(image, i) in data.images"
                        :src="image"
                        alt=""
                        class="c-project-modal__content-images-wrapper-img"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    toRef,
    computed,
    ref,
    onMounted,
    onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";
import { gsap, CustomEase } from "gsap/all";
gsap.registerPlugin(CustomEase);

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";
import ListTag from "@/templates/components/ListTag.vue";

export default defineComponent({
    name: "ProjectModal",
    components: {
        ButtonPrimary,
        ListTag,
    },
    props: {
        data: {
            type: Object,
            required: true,
            default: {},
        },
    },
    emits: ["close"],
    setup(props, { emit }) {
        const store = useStore();

        const close = () => {
            emit("close");
            //store.dispatch("modal/close");
        };

        const isOpen = computed(() => store.getters["modal/hasModal"]);

        const data = toRef(props, "data");

        // set custom ease
        CustomEase.create("customEase", "0.43, 0.00, 0.09, 1.00");

        ////////////////////////////////
        //       START IMAGE TIMELINE
        ////////////////////////////////
        const imageContainer = ref();

        const imageAnimationTimeline = gsap.timeline({
            paused: true,
        });

        function initImageTimeline() {
            imageAnimationTimeline.to(imageContainer.value, {
                "--crop-path-btm-left": "100%",
                "--crop-path-btm-right": "100%",
                duration: 1,
                ease: "customEase",
                delay: 0.5,
            });

            imageAnimationTimeline.play();
        }
        ////////////////////////////////
        //       END IMAGE TIMELINE
        ////////////////////////////////

        ////////////////////////////////
        //START CONTENT TIMELINE
        ////////////////////////////////
        const modalContentTimeline = gsap.timeline({ paused: true });
        const animationParams = {
            ease: "customEase",
            stagger: 0.3,
            y: 0,
            autoAlpha: 1,
            duration: 1,
            delay: 0.5,
        };
        function initModalContentTimeline() {
            modalContentTimeline.to(".c-modal-animate", animationParams);
            modalContentTimeline.play();
        }
        ////////////////////////////////
        //END CONTENT TIMELINE
        ////////////////////////////////

        onMounted(() => {
            //initModalContentTimeline();
            //initImageTimeline();
        });

        onBeforeUnmount(() => {
            //imageAnimationTimeline ? imageAnimationTimeline.kill() : null;
            //modalContentTimeline ? modalContentTimeline.kill() : null;
        });

        return {
            //biography,
            //buttonAriaLabel,
            close,
            data,
            //emailUser,
            //imageAnimationTimeline,
            //imageContainer,
            //initImageTimeline,
            //initModalContentTimeline,
            isOpen,
            //modalContentTimeline,
            //telUser,
        };
    },
});
</script>

<style lang="scss" scoped>
.c-project-modal {
    &--to-close {
        .l-modal {
            opacity: 0;
        }
        .backdrop {
            opacity: 0;
            visibility: hidden;
        }
    }

    color: var(--color-pistachio);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5rem;
        margin-top: 2rem;
        align-items: center;

        &-title {
            font-size: var(--fs-regular);
            @include min(md) {
                font-size: var(--fs-large);
            }
        }
    }

    &__content {
        &-details {
            &-description {
                font-size: var(--fs-small);
                @include min(md) {
                    font-size: var(--fs-regular);
                }
            }
            &-btn {
                margin-top: 2rem;
            }
        }
        &-infos {
            margin: 26px 0 56px;
            --border-color: var(--color-pistachio);
            &-description {
                margin-top: 2rem;
                &-role {
                    @include border(top);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }
                &-year {
                    @include border(top);
                    @include border(bottom, after);
                    display: flex;
                    justify-content: space-between;

                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }
            }
        }
        &-images {
            &-wrapper {
                &-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;

                    &:not(:first-child) {
                        margin-top: 2rem;
                    }
                }
            }
        }
    }
}
</style>
