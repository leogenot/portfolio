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
        <!-- #site-navigation -->
        <div class="c-header__right">
            <div class="c-header__right-contact wiggle">Contact</div>

            <div class="c-header__right-contact-menu">
                <a
                    href="mailto: leogenot@gmail.com"
                    class="c-header__right-contact-menu-item"
                    >leogenot@gmail.com</a
                ><a
                    href="https://instagram.com/garethughes"
                    target="_blank"
                    class="c-header__right-contact-menu-item"
                    >Instagram</a
                ><a
                    href="https://www.linkedin.com/in/gareth-hughes-9480153a/"
                    target="_blank"
                    class="c-header__right-contact-menu-item"
                    >LinkedIn</a
                ><a
                    href="https://twitter.com/bygarethughes"
                    target="_blank"
                    class="c-header__right-contact-menu-item"
                    >Github</a
                >
            </div>
        </div>
        <button-primary
            label="Page précédente"
            iconBefore="chevron-left"
            color="light"
        />
    </div>
</template>

<script>
import { defineComponent } from "vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "TheHeader",
    components: {
        ButtonPrimary,
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
        @media (max-width: 600px) {
            width: 100%;
            text-align: right;
        }
        &:hover .c-header__right-contact-menu-item {
            transform: translateY(0);
            opacity: 1;
            transition: 0.4s $custom-ease opacity, 0.6s $custom-ease transform;

            @include stagger-delay(4, 0.2);
        }
        &-contact {
            font-size: 1.5rem;

            &-menu {
                display: flex;
                position: absolute;
                z-index: 1;
                width: 13em;
                right: 0;
                padding-top: 2em;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-align: end;
                -webkit-align-items: flex-end;
                -ms-flex-align: end;
                align-items: flex-end;
                gap: 1.5rem;

                &-item {
                    cursor: ne-resize;

                    opacity: 0;
                    transform: translateY(-2rem);

                    @include stagger-delay(4, 0.1);
                    transition: 0.3s $custom-ease opacity,
                        1s $custom-ease transform;
                }
            }
        }
    }
}

.wiggle {
    animation: wiggle 5s infinite;
}

@keyframes wiggle {
    0% {
        transform: rotate(0);
    }

    90% {
        transform: rotate(0);
    }

    92% {
        transform: rotate(5deg);
    }

    94% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0);
    }
}

.wiggle:hover {
    animation: wigglecontinue 0.3s infinite;
}

@keyframes wigglecontinue {
    0% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(-5deg);
    }
}
</style>
