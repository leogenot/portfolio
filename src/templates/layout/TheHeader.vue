<template>
    <div class="c-header">
        <nav class="c-header__left">
            <div class="c-header__left-inner">
                <ul class="c-header__left-inner-list">
                    <li class="c-header__left-inner-item">
                        <a href="https://www.trevarefabrikken.no/move/">Home</a>
                    </li>
                    <li class="c-header__left-inner-item">
                        <a href="https://www.trevarefabrikken.no/stay/"
                            >Projects</a
                        >
                    </li>
                    <li class="c-header__left-inner-item">
                        <a href="https://www.trevarefabrikken.no/taste/"
                            >About me</a
                        >
                    </li>
                    <li class="c-header__left-inner-item">
                        <a href="https://www.trevarefabrikken.no/take-part/"
                            >Approach</a
                        >
                    </li>
                </ul>
            </div>
        </nav>
        <div class="c-header__right">
            <contact-menu />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

import ContactMenu from "@/templates/components/Contact/ContactMenu.vue";

export default defineComponent({
    name: "TheHeader",
    components: {
        ContactMenu,
    },
});
</script>

<style lang="scss">
.c-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column-reverse;
        gap: 3rem;
    }

    &__left {
        &-inner {
            &-list {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                list-style: none;
            }
            &-item {
                font-size: 2.5rem;
            }
        }
    }
    &__right {
        position: fixed;
        top: 0;
        right: 0;
        @media (max-width: 600px) {
            width: 100%;
            text-align: right;
        }
    }
}
</style>
