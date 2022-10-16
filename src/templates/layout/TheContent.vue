<template>
    <div class="l-content" ref="content">
        <hero-header />
        <projects-section />
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
import ProjectsSection from "@/templates/components/ProjectsSection/ProjectsSection.vue";

export default defineComponent({
    name: "TheContent",
    components: {
        HeroHeader,
        ListTag,
        ButtonPrimary,
        ProjectsSection,
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
</style>
