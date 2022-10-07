<template>
    <div class="c-hero">
        <div class="c-hero__inner">
            <span class="c-hero__divider"></span>
            <div class="c-hero__expand c-hero__expand-row-1">
                <span>houston</span>
                <p>Professional and exclusive</p>
            </div>
            <div class="c-hero__expand c-hero__expand-row-2">
                <p>
                    techno sound identity for your
                    <span class="img"></span> &nbsp;brand
                </p>
            </div>
            <div class="c-hero__expand c-hero__expand-row-3">
                <p>Sound is our life</p>
            </div>
        </div>
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";

export default defineComponent({
    name: "App",
    components: {},
    setup() {},
});
</script>

<style lang="scss">
.c-hero {
    &__expand {
        position: relative;
        width: 100%;
        padding: 2.4rem 0;
        display: flex;
        flex-direction: column;

        &-row-1 {
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 2.2rem;
            transition: all 0.02s ease;
            & span {
                text-transform: uppercase;
                padding: 0.25rem 0.6rem 0.15rem 0.6rem;
                font-size: 0.8rem;
                border: 1px solid #000;
                border-radius: 0.8rem;
                margin-right: 1rem;
            }
        }
        &-row-2 {
            & .img {
                position: relative;
                top: 0.8rem;
                left: 0.4rem;
                display: inline-block;
                width: 100px;
                height: 60px;
                line-height: 60px;
                border-radius: 1rem;
                background: url("https://images.unsplash.com/photo-1623578963865-6bb7b0629a54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80")
                    no-repeat 50% 50%;
                background-size: cover;
            }
        }
        &-row-3 {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            transition: all 0.02s ease;
        }

        &-row-1,
        &-row-2 {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            transition: all 0.02s ease;
        }

        & p {
            margin: 0.2rem 0;
            font-family: "Canopee", sans-serif;
            font-size: 3.2rem;
            line-height: 70px;
        }
    }

    &__expand &__divider {
        position: relative;
        width: 0%;
        height: 1px;
        background: rgba(0, 0, 0, 0.1);
        transition: all 0.02s ease;
    }
}
</style>
