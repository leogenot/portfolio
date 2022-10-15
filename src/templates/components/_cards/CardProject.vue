<template>
    <div class="c-card-project">
        <div class="c-card-project__content">
            <div class="c-card-project__content__title">
                <h3 class="c-card-project__content__title__text">
                    {{ title }}
                </h3>
            </div>
            <div class="c-card-project__content__description">
                <p class="c-card-project__content__description__text">
                    {{ description }}
                </p>
            </div>
            <div class="c-card-project__content__tags">
                <ListTag :tags="tags" />
            </div>
        </div>
        <div class="c-card-project__image">
            <img class="c-card-project__image__img" :src="image" :alt="title" />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import ListTag from "@/templates/components/ListTag.vue";

export default defineComponent({
    name: "CardProject",
    components: {
        ListTag,
    },
    setup() {},
});
</script>

<style lang="scss"></style>
