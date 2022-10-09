<template>
    <the-loader />
    <the-header />
    <div id="smooth-content">
        <div class="l-base">
            <div id="smooth-wrapper">
                <the-content />
                <the-footer />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import TheLoader from "@/templates/layout/TheLoader.vue";
import TheHeader from "@/templates/layout/TheHeader.vue";
import TheContent from "@/templates/layout/TheContent.vue";
import TheFooter from "@/templates/layout/TheFooter.vue";

export default defineComponent({
    name: "TheBase",
    components: {
        TheLoader,
        TheHeader,
        TheContent,
        TheFooter,
    },
    setup() {},
});
</script>

<style lang="scss"></style>
