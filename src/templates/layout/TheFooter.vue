<template>
    <!-- <div class="l-footer | l-container -full">
        <div class="l-footer__tagline">
            <headline text="Let's keep" :min="1" :max="999" />
        </div>
    </div> -->
    <footer class="l-footer l-footer-container">
        <div class="l-footer-slogan">
            <p>
                Let's keep
                <span class="about__container-contact-link">
                    <!-- <a href="mailto:leogenot@gmail.com" target="_blank"
                        >in touch.</a
                    > -->
                    <button-primary
                        tag="a"
                        label="in touch"
                        href="mailto:leogenot@gmail.com"
                        :iconAfter="'external'"
                        target="_blank"
                        class="l-footer-link"
                    />
                </span>
            </p>
        </div>
        <div class="l-footer-links">
            <button-primary
                tag="a"
                label="Github"
                href="https://www.github.com/leogenot"
                :iconAfter="'external'"
                class="l-footer-link"
                target="_blank"
            />

            <button-primary
                tag="a"
                label="LinkedIn"
                href="https://www.linkedin.com/in/leo-genot-88580b176/"
                :iconAfter="'external'"
                class="l-footer-link"
                target="_blank"
            />
            <button-primary
                tag="a"
                label="Instagram"
                href="https://www.instagram.com/leogenot"
                :iconAfter="'external'"
                class="l-footer-link"
                target="_blank"
            />
            <button-primary
                tag="a"
                label="Youtube"
                href="https://www.youtube.com/channel/UCTy2DFV4djNni5fskteT16Q"
                :iconAfter="'external'"
                class="l-footer-link"
                target="_blank"
            />
        </div>
    </footer>
</template>

<script>
import { defineComponent, computed } from "vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";
import Headline from "@/templates/components/_shared/Headline.vue";

export default defineComponent({
    name: "TheFooter",
    components: {
        ButtonPrimary,
        Headline,
    },
    setup() {},
});
</script>

<style lang="scss">
.l-footer {
    color: var(--color-beige);
    background-color: var(--color-black);
    font-size: var(--fs-xsmall);
    padding: 2rem;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    @include max(md) {
        justify-content: center;
    }

    text-align: center;

    &-link {
        --btn-txt-color: var(--color-white) !important;
        --btn-txt-size: var(--fs-xsmall) !important;
        --btn-border-color: transparent !important;
        --btn-hover-display: none !important;
    }
}
</style>
