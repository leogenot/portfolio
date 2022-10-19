<template>
    <ul v-if="tags" class="c-list-tag">
        <li v-for="(tag, i) in tags" :key="`tag-${i}`">
            <tag-item :isColored="tag.highlighted" :label="tag.label" />
        </li>
    </ul>
</template>

<script>
import { defineComponent } from "vue";

import TagItem from "@/templates/components/_shared/TagItem.vue";

export default defineComponent({
    name: "ListTag",
    components: {
        TagItem,
    },
    props: {
        tags: Object,
    },
});
</script>

<style lang="scss" scoped>
.c-list-tag {
    @include reset-list;
    display: flex;
    align-items: flex-start;
    flex-direction: var(--list-tag-direction, row);
    flex-wrap: wrap;
    gap: 0.3rem;
    line-height: 1;
}
</style>
