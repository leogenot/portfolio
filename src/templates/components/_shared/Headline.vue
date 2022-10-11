<template>
    <div v-if="text" class="o-headline">
        <span class="o-headline__text | t-main-h1" ref="headline" :style="styleObj">
            <span v-if="!isReady" class="o-headline__text__beforeAnim" v-html="text"></span>
            <anim-text v-else :copy="text" whichSplit="words" :options="{ duration: 1.4 }" />
        </span>
    </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, computed, reactive, ref, nextTick } from "vue";

import AnimText from "@/templates/components/_shared/AnimText.vue";

export default defineComponent({
    name: "Headline",
    components: {
        AnimText,
    },
    props: {
        text: {
            type: [String, Number],
            required: true,
        },
        min: {
            type: Number,
            required: false,
            default: 80,
        },
        max: {
            type: Number,
            required: false,
            default: 165,
        },
    },
    setup(props) {
        const headline = ref(null);
        const isReady = ref(false);

        const h = reactive({
            availableWidth: 0,
            baseWidth: 0,
            documentFontSize: 0,
            baseFontSize: 0,
            stretchedFontSize: 0,
        });

        const styleObj = reactive({
            fontSize: false,
            whiteSpace: false,
        });

        // COMPUTEDS

        const min = computed(() => {
            const minFontSize =
                h.availableWidth > 760 && h.availableWidth < 1200
                    ? props.min * 0.7
                    : h.availableWidth <= 760
                    ? props.min * 0.5
                    : props.min;
            return (minFontSize * h.documentFontSize) / 10;
        });
        const max = computed(() => (props.max * h.documentFontSize) / 10);

        const stretchedFontSize = computed(() =>
            Math.min(Math.max(min.value, (h.availableWidth / h.baseWidth) * h.baseFontSize), max.value)
        );

        // METHODS

        const getFontSize = (elem) => {
            const styles = getComputedStyle(elem);
            const fontSize = styles.getPropertyValue("font-size");

            return parseFloat(fontSize);
        };

        const applyStyles = () => {
            styleObj.fontSize = `${stretchedFontSize.value}px`;
            styleObj.whiteSpace = h.stretchedFontSize === min.value ? "normal" : "nowrap";
            isReady.value = true;
        };

        const updateWidth = () => {
            h.availableWidth = headline.value.parentNode.clientWidth;
            h.documentFontSize = getFontSize(document.documentElement);
            h.stretchedFontSize = stretchedFontSize.value;
        };

        // LIFECYCLE HOOKS

        const init = () => {
            h.availableWidth = headline.value.parentNode.clientWidth;
            h.baseWidth = headline.value.scrollWidth;
            h.documentFontSize = getFontSize(document.documentElement);
            h.baseFontSize = getFontSize(headline.value);
            h.stretchedFontSize = stretchedFontSize.value;
        };

        const onResize = () => {
            updateWidth();
            applyStyles();
        };

        onMounted(() => {
            nextTick(() => (init(), applyStyles()));
            window.addEventListener("resizeEnd", onResize);
        });

        onUnmounted(() => {
            window.removeEventListener("resizeEnd", onResize);
        });

        return { isReady, headline, styleObj };
    },
});
</script>

<style lang="scss" scoped>
.o-headline {
    width: 100%;
    text-align: center;
    overflow: hidden;

    &__text {
        display: inline-block;
        white-space: nowrap;
        transform: translateY(var(--headline-translate, 0.1em));

        &__beforeAnim {
            opacity: 0;
            user-select: none;
        }
    }
}
</style>
