<template>
    <div
        v-if="copy"
        :key="copy"
        class="c-anim-text"
        v-view.once="(e) => runAnimation(e)"
    >
        <anim-text-split v-bind="$props" :isVisible="isVisible" />
    </div>
</template>

<script>
import { defineComponent, toRef, ref } from "vue";

import AnimTextSplit from "./AnimTextSplit.vue";

export default defineComponent({
    components: {
        AnimTextSplit,
    },
    props: {
        //--- Base ---//
        copy: {
            type: [String, Number],
            required: true,
        },
        //--- Customization ---//
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
    setup(props) {
        const copy = toRef(props, "copy");
        const isVisible = ref(false);

        const runAnimation = (e) => {
            isVisible.value = e.state.isActive ? true : false;
        };

        return { copy, isVisible, runAnimation };
    },
});
</script>

<style lang="scss" scoped>
.c-anim-text {
    --a-mask-offset-x: 0.5em;
    --a-mask-offset-y: 0.15em;
    --a-mask-space: 0.115em;
}
</style>
