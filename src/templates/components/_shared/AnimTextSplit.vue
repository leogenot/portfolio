<template>
    <div
        ref="AnimText"
        v-if="copy"
        class="c-anim-text-split"
        :class="classObject"
    >
        {{ copy }}
    </div>
</template>

<script>
import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    toRef,
    ref,
    watch,
} from "vue";
import { useContext } from "@/composables/context";

import { gsap, SplitText } from "gsap/all";
gsap.registerPlugin(SplitText);

export default defineComponent({
    props: {
        //--- Base ---//
        copy: {
            type: [String, Number],
            required: true,
        },
        //--- Customization ---//
        isVisible: {
            type: Boolean,
            default: true,
        },
        options: {
            type: Object,
            default: () => {},
        },
        whichSplit: {
            type: String,
            validator: (val) => ["chars", "words", "lines"].includes(val),
            default: "words",
        },
    },
    setup(props, { emit }) {
        const { W } = useContext();

        const isVisible = toRef(props, "isVisible");
        const copy = toRef(props, "copy");

        //--- Start states ---//
        const AnimText = ref(null);
        const split = ref({ chars: null, words: null, lines: null });
        const splitItems = ref(null);

        const opts = ref({
            delay: 0,
            duration: 1.2,
            staggerWords: 0.4,
            staggerLines: 0.1,
            rotation: -25,
            perspective: 120,
            staggerFrom: "start",
        });

        const classObject = computed(() => ({
            "is-visible": isVisible.value,
            "-words": props.whichSplit == "words",
            "-lines": props.whichSplit == "lines",
        }));

        const timeline = gsap
            .timeline({
                paused: true,
                onsStart: () => {},
                onComplete: () => {
                    emit("completed");
                    if (props.whichSplit === "lines") split.value.revert();
                },
            })
            .addLabel("show");

        //--- End States ---//

        const setOptions = () => {
            opts.value = { ...opts.value, ...props.options };
        };

        const init = () => {
            //======= START INIT SPLITTEXT =======//
            const type = props.whichSplit === "lines" ? "lines" : "words";

            split.value = new SplitText(AnimText.value, {
                type,
                wordsClass: "c-anim-text-split__w",
                linesClass: "c-anim-text-split__l",
                reduceWhiteSpace: false,
            });

            splitItems.value =
                type == "lines" ? split.value.lines : split.value.words;

            // Wrap each items
            splitItems.value.forEach((l) => wrap(l, "c-anim-text-split__mask"));

            // Initial hide
            gsap.set(splitItems.value, {
                rotateX: opts.value.rotation,
                translateY: "105%",
                transformPerspective: opts.value.perspective,
            });

            // Set transform origin for each word
            splitItems.value.forEach((word) => {
                const centerPos = getCenterPosFromViewport(word);
                word.style.transformOrigin = `${centerPos} 100%`;
            });
            //======= END INIT SPLITTEXT =======//

            //======= START TIMELINE =======//
            timeline
                .set(splitItems.value, {
                    rotateX: opts.value.rotation,
                    translateY: "105%",
                    transformPerspective: opts.value.perspective,
                    delay: opts.value.delay,
                })
                .to(splitItems.value, {
                    duration: opts.value.duration,
                    rotateX: 0,
                    translateY: 0,
                    stagger: {
                        each:
                            props.whichSplit == "words"
                                ? opts.value.staggerWords
                                : opts.value.staggerLines,
                        from: opts.value.staggerFrom,
                    },
                    ease: "power4.inOut",
                });

            isVisible.value ? show() : null;
        };

        //--- Methods for the timeline ---//

        const getCenterPosFromViewport = (elem) => {
            let rect = elem.getBoundingClientRect();
            let fraction = (((rect.width / 2 + rect.left) / W.w) * 100).toFixed(
                2
            );
            return 100 - fraction + "%";
        };

        const wrap = (el, wrapperClass) => {
            const wrapper = document.createElement("div");
            wrapper.className = wrapperClass;
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        };

        // Show/Reveal the timeline
        const show = () => timeline.play("show");

        //======= END TIMELINE =======//

        onMounted(() => {
            nextTick(() => (setOptions(), init()));
        });

        watch(isVisible, (bool) => {
            return bool ? show() : null;
        });

        return { copy, classObject, init, AnimText, show };
    },
});
</script>

<style lang="scss" scoped>
.c-anim-text-split {
    $_: &;
    display: flex;
    align-items: flex-start;
    justify-content: var(--a-justify-content, center);
    flex-wrap: wrap;

    &.-words {
        margin: 0 calc(var(--a-mask-space) * -1.1);
    }

    :deep(#{$_}__mask) {
        display: inline-block;
        padding: var(--a-mask-offset-y) var(--a-mask-offset-x);
        margin: minus(var(--a-mask-offset-y)) minus(var(--a-mask-offset-x));
        overflow: hidden;

        @at-root .-lines#{&} {
            min-width: 51%; // Prevent multiple lines from falling into 1 line
        }

        @at-root .-words#{&} {
            padding-bottom: 0;
            margin-bottom: 0;

            > * {
                padding: 0 var(--a-mask-space);
            }
        }

        .t-main-h3 & {
            padding-bottom: 0;
            margin-bottom: 0;
        }
    }

    :deep(#{$_}__l),
    :deep(#{$_}__c),
    :deep(#{$_}__w) {
        white-space: nowrap;
        transform-origin: 50% 100%;
        will-change: transform;
    }
}
</style>
