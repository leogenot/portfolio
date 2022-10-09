<template>
    <div class="c-contact-menu">
        <contact-button class="c-contact-menu-contact wiggle" />

        <div class="c-contact-menu-contact-menu">
            <a
                href="mailto: leogenot@gmail.com"
                class="c-contact-menu-contact-menu-item"
                >leogenot@gmail.com</a
            ><a
                href="https://instagram.com/garethughes"
                target="_blank"
                class="c-contact-menu-contact-menu-item"
                >Instagram</a
            ><a
                href="https://www.linkedin.com/in/gareth-hughes-9480153a/"
                target="_blank"
                class="c-contact-menu-contact-menu-item"
                >LinkedIn</a
            ><a
                href="https://twitter.com/bygarethughes"
                target="_blank"
                class="c-contact-menu-contact-menu-item"
                >Github</a
            >
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import ContactButton from "@/templates/components/Contact/ContactButton.vue";

export default defineComponent({
    name: "ContactMenu",
    components: {
        ContactButton,
    },
    setup() {},
});
</script>

<style lang="scss">
.c-contact-menu {
    &:hover .c-contact-menu-contact-menu-item {
        transform: translateY(0);
        opacity: 1;
        transition: 0.4s $custom-ease opacity, 0.6s $custom-ease transform;

        @include stagger-delay(4, 0.2);
    }
    &-contact {
        &-menu {
            display: flex;
            position: absolute;
            z-index: 1;
            width: 13em;
            right: 0;
            padding-top: 2em;
            flex-direction: column;
            align-items: flex-end;
            gap: 1.5rem;

            &-item {
                cursor: ne-resize;
                opacity: 0;
                transform: translateY(-2rem);
                @include stagger-delay(4, 0.1);
                transition: 0.3s $custom-ease opacity, 1s $custom-ease transform;
            }
        }
    }
}
</style>
