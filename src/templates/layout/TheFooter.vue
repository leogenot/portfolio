<template>
    footer
    <div class="l-footer | l-container -full" v-view="(e) => runAnimation(e)">
        <div class="l-footer__tagline">
            <headline text="hello world" :min="1" :max="999" />
        </div>
    </div>
    <!--     <footer class="l-footer l-footer-container">
        <div class="l-footer-slogan">
            <p>
                Let's keep
                <span class="about__container-contact-link">
                    <a href="mailto:leogenot@gmail.com" target="_blank"
                        >in touch.</a
                    >
                </span>
            </p>
        </div>
        <div class="l-footer-links">
            <a
                class="l-footer-link"
                href="https://www.github.com/leogenot"
                target="_blank"
                >GitHub.</a
            >

            <span>/</span
            ><a
                class="l-footer-link"
                href="https://www.linkedin.com/in/leo-genot-88580b176/"
                target="_blank"
                >LinkedIn.</a
            ><span>/</span
            ><a
                class="l-footer-link"
                href="https://www.instagram.com/leogenot"
                target="_blank"
                >Instagram.</a
            ><span>/</span
            ><a
                class="l-footer-link"
                href="https://www.youtube.com/channel/UCTy2DFV4djNni5fskteT16Q"
                target="_blank"
                >Youtube.</a
            >
        </div>
    </footer> -->
</template>

<script>
import { defineComponent, computed } from "vue";

import Headline from "@/templates/components/_shared/Headline.vue";

export default defineComponent({
    name: "TheFooter",
    components: {
        Headline,
    },
    setup() {
        const runAnimation = (e) => {
            console.log("v-view", e);
        };

        return {
            runAnimation,
        };
    },
});
</script>

<style lang="scss">
.l-footer {
    color: var(--color-beige);
    background-color: var(--color-black);

    &__tagline {
        overflow: hidden;

        .o-headline {
            --headline-translate: 7%;

            @include min(sm) {
                --headline-translate: 18%;
            }
        }

        :deep(.c-anim-text) {
            // Spacing here to make sure reveal append on mobile portrait
            padding-top: var(--footer-spacing-bottom);
        }
    }
}
</style>
