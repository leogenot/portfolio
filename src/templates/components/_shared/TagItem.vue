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
    background-color: var(--tag-bg-color, transparent);
    border: 1px solid var(--tag-border-color, white);

    //background: rgba(237, 237, 237, 0.4);
    //-webkit-backdrop-filter: blur(45px);

    @include radius(5em);
    padding: 0 15px 0 15px;

    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    font-size: 26px;
    line-height: 42px;

    &.-colored {
        --tag-bg-color: red;
    }
}
</style>
