<template>
    <div class="c-projects | l-container -default">
        <button-primary label="Contact" color="light" />
        <div class="c-projects__list">
            <!-- <team-card :data="item" v-for="(item, i) in data.team" :key="`gallery-img-${i}`" /> -->
            <card-project />
            <card-project />
            <card-project />
            <card-project />
            <card-project />
            <card-project />
        </div>
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

import ListTag from "@/templates/components/ListTag.vue";
import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";
import CardProject from "@/templates/components/_cards/CardProject.vue";

export default defineComponent({
    name: "ProjectsSections",
    components: {
        ListTag,
        ButtonPrimary,
        CardProject,
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss">
.c-projects {
    //height: 100vh;
    &__list {
        margin-top: 10rem;
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
}
</style>
