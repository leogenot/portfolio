<template>
    <footer class="l-footer l-footer-container">
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
    </footer>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "TheFooter",
    components: {},
    setup() {},
});
</script>

<style lang="scss">
.l-footer {
    &-container {
        position: sticky;
        bottom: 0;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: space-between;
        height: var(--header-height);
        font-size: 0.8em;
        color: hsl(var(--background) / 0.6);
    }
    &-links,
    &-slogan {
        display: grid;
        grid-auto-flow: column;
        gap: 1em;
    }
    &-slogan {
    }
    &-link {
        color: hsl(var(--background));
        &:hover {
            animation: var(--hover);
        }
    }
}
</style>
