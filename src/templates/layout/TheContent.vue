<template>
    <div class="l-content" ref="content">
        <hero-header />
        <section class="section">
            <button-primary label="Contact" color="light" />
        </section>
        <!--         <list-tag v-if="tags && tags.length > 0" :tags="tags" class="section" />
        <headline text="Léo" :min="1" :max="999" />
        <headline text="Genot" :min="1" :max="999" />
        <headline text="Creative" :min="1" :max="999" />
        <headline text="Developer" :min="1" :max="999" /> -->
    </div>
</template>

<script>
import {
    defineComponent,
    computed,
    ref,
    onMounted,
    onBeforeUnmount,
} from "vue";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import HeroHeader from "@/templates/components/Hero/HeroHeader.vue";
import ListTag from "@/templates/components/ListTag.vue";
import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "TheContent",
    components: {
        HeroHeader,
        ListTag,
        ButtonPrimary,
    },
    setup() {
        const content = ref();
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

        return { tags };
    },
});
</script>

<style lang="scss">
.l-content {
    //margin-top: 90px;
    //height: 200vh;
}

.section {
    height: 100vh;
}
</style>
