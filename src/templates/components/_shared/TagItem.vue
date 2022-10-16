<template>
    <span :class="className" v-html="label" />
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
    props: {
        isColored: {
            type: Boolean,
            required: false,
            default: false,
        },
        label: {
            type: String,
            required: true,
            default: "Tag Label",
        },
    },
    setup(props) {
        const className = computed(() => [
            "c-tag",
            props.isColored ? "-colored" : "-noColored",
        ]);

        return { className };
    },
});
</script>

<style lang="scss" scoped>
.c-tag {
    display: inline-block;
    color: var(--tag-font-color, white);

    padding: 5px 11px;
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    background-color: rgba(199, 199, 199, 0.25);
    border-radius: 100rem;
    white-space: nowrap;
    text-transform: uppercase;
    font-size: var(--fs-xsmall);
    line-height: 1.5em;

    cursor: default;

    @include min(md) {
        font-size: var(--fs-regular);
        line-height: 42px;
        padding: 0 15px 0 15px;
    }

    &.-colored {
        --tag-bg-color: red;
    }
}
</style>
