<template>
    <div class="l-base">
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <the-loader />
                <the-header />
                <the-footer />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import TheLoader from "@/templates/layout/TheLoader.vue";
import TheHeader from "@/templates/layout/TheHeader.vue";
import TheFooter from "@/templates/layout/TheFooter.vue";

export default defineComponent({
    name: "TheBase",
    components: {
        TheHeader,
        TheFooter,
        TheLoader,
    },
    setup() {},
});
</script>

<style lang="scss"></style>
