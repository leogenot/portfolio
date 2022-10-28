<template>
    <div class="c-list-btn__list" v-view>
        <div class="c-list-btn__list-left">
            <button-primary
                label=""
                :iconBefore="'scroll-down'"
                class="c-list-btn__btn arrow"
            />
        </div>
        <div class="c-list-btn__list-middle animate">
            <button-primary
                label="Github"
                color="light"
                :iconAfter="'external'"
                class="c-list-btn__btn"
                href="https://www.github.com/leogenot"
                target="_blank"
                tag="a"
            />
            <button-primary
                label="Instagram"
                color="light"
                :iconAfter="'external'"
                class="c-list-btn__btn"
                href="https://www.instagram.com/leogenot"
                target="_blank"
                tag="a"
            />
            <button-primary
                label="Youtube"
                color="light"
                :iconAfter="'external'"
                class="c-list-btn__btn"
                href="https://www.youtube.com/channel/UCTy2DFV4djNni5fskteT16Q"
                target="_blank"
                tag="a"
            />
            <button-primary
                label="LinkedIn"
                color="light"
                :iconAfter="'external'"
                class="c-list-btn__btn"
                href="https://www.linkedin.com/in/leo-genot-88580b176/"
                target="_blank"
                tag="a"
            />
        </div>
        <div class="c-list-btn__list-right">
            <button-primary
                label="email"
                color="light"
                class="c-list-btn__btn email"
                href="mailto:leogenot@gmail.com"
                tag="a"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "ListBtn",
    components: {
        ButtonPrimary,
    },
});
</script>

<style lang="scss" scoped>
.c-list-btn {
    &__btn {
        &.arrow {
            --btn-border-color: transparent;
            --btn-hover-display: none;
            cursor: default;
            margin-bottom: 5rem;
        }

        @include max(md) {
            &:not(.arrow) {
                --btn-txt-size: var(--fs-xsmall);
                margin: 0.5rem;
            }
            &.email {
                margin-top: 3rem;
            }
        }
        @include min(md) {
            &:not(.arrow),
            &:not(.email) {
                margin-right: 1.5rem;
                margin-bottom: 1.5rem;
            }
        }
    }
    &__list {
        display: flex;

        justify-content: space-between;
        flex-flow: row wrap;
        @include min(md) {
            flex-flow: row nowrap;
        }
        &-left {
            @include min(md) {
                text-align: center;
                height: fit-content;
            }
        }
        &-middle {
            @include min(md) {
                text-align: center;
                height: fit-content;
            }
        }
        &-right {
            @include min(md) {
                text-align: center;
                height: fit-content;
            }
        }
    }
}

.animate {
    opacity: 0;
    transform: translateY(-2rem);
}

.is-visible {
    .animate {
        transform: translateY(0);
        opacity: 1;
        transition: 1s ease opacity, 1s ease transform;

        @include stagger-delay(10, 0.4);
    }
}
</style>
