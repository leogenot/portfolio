<template>
    <div
        class="c-project-modal | l-grid"
        :class="{ 'c-project-modal--active': isOpen }"
    >
        {{ data }}
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

export default defineComponent({
    name: "ProjectModal",
    components: {},
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
}
</style>
