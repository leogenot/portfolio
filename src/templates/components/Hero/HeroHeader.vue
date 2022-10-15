<template>
    <section class="c-hero-header" v-view.progress>
        <div class="c-hero-header__blur"></div>
        <div class="c-hero-header__content">
            <div class="c-hero-header__top">
                <div class="c-hero-header__top-left">
                    <div class="c-hero-header__top-left-txt">
                        <h1 class="c-hero-header__top-left-txt-title">
                            Léo —
                            <br />
                            Genot.
                        </h1>
                    </div>
                </div>
            </div>
            <div class="c-hero-header__bottom">
                <div class="c-hero-header__bottom-right">
                    <div class="c-hero-header__bottom-right-block">
                        <div class="c-hero-header__bottom-right-txt">
                            <h1 class="c-hero-header__bottom-right-txt-title">
                                Creative <br />
                                Developer.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";

import TagItem from "@/templates/components/_shared/TagItem.vue";
import Headline from "@/templates/components/_shared/Headline.vue";

export default defineComponent({
    components: {
        TagItem,
        Headline,
    },
    setup() {},
});
</script>

<style lang="scss">
.c-hero-header {
    width: 100%;
    height: 100vh;
    padding: 50px 5% 40px;
    @include min(md) {
        padding: 100px 5% 40px;
    }
    overflow: hidden;

    &__blur {
        position: absolute;
        width: 50vh;
        height: 50vh;
        border-radius: 100%;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%)
            scale(calc(1 * calc(var(--view-progress) * 2)));
        background-color: var(--color-orange);
        overflow: hidden;
        @include blur(calc(var(--view-progress) * 50px));
    }
    &__content {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        @include min(md) {
            height: 80vh;
        }

        justify-content: center;
        z-index: 1;
        font-size: var(--fs-large);
        color: var(--color-pistachio);
        @include min(md) {
            font-size: var(--fs-2xl);
        }
    }
    &__top {
        position: absolute;
        left: 0%;
        top: 0%;
        right: auto;
        bottom: auto;
        width: -webkit-fill-available;
        &-left {
            width: 70%;
            position: relative;
            flex-direction: column;
            &-txt {
                overflow: hidden;
                padding-top: 1em;

                text-transform: uppercase;
                &-title {
                }
            }
        }
    }
    &__bottom {
        text-align: right;
        position: absolute;
        left: 0%;
        top: auto;
        right: 0%;
        bottom: 0%;
        display: flex;
        width: -webkit-fill-available;
        justify-content: space-between;

        justify-content: flex-end;
        &-right {
            position: relative;
            display: flex;
            width: 100%;
            padding-left: 0%;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;

            &-txt {
                width: 100%;
                overflow: hidden;
                padding-top: 1em;
                padding-bottom: 1em;

                text-transform: uppercase;
                &-title {
                }
            }
            &-block {
                width: 100%;
                flex-direction: column;
            }
        }
    }
}
</style>
