<template>
    <div class="l-content">
        <list-tag
            v-if="tags && tags.length > 0"
            :tags="tags"
            v-view="(e) => exampleFunction(e)"
        />
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import ListTag from "@/templates/components/ListTag.vue";

export default defineComponent({
    name: "TheContent",
    components: {
        ListTag,
    },
    setup() {
        const tags = computed(() => {
            return [
                {
                    highlighted: false,
                    label: "hello",
                },
                {
                    highlighted: true,
                    label: "goodbye",
                },
                {
                    highlighted: false,
                    label: "reset",
                },
            ];
        });

        const exampleFuntion = (e) => {
            console.log(e.percent.top);
        };

        return { tags, exampleFuntion };
    },
});
</script>

<style lang="scss">
.l-content {
    margin-top: 90px;
    height: 200vh;
}
</style>
