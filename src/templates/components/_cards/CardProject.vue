<!-- <template>
    <div class="c-project-card">
        <div class="c-project-card__inner">
            <div class="c-project-card__image">
                <object-asset
                    v-if="project.image"
                    :asset="project.image"
                    :is-cover="true"
                    :is-lazy="true"
                    :fit="'cover'"
                    class="c-project-card__image-img"
                ></object-asset>
            </div>
            <div class="c-project-card__infos">
                <h2 class="c-project-card__infos-title">
                    <span>{{ project.title }}</span>
                    <br />
                    <span
                        ><span>{{ project.description }}</span></span
                    >
                </h2>
                <div class="c-project-card__infos-tags">
                    <ListTag :tags="project.tags" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref, toRef } from "vue";
import ObjectAsset from "@/templates/objects/ObjectAsset.vue";
import ListTag from "@/templates/components/ListTag.vue";

export default defineComponent({
    name: "CardProject",
    components: {
        ListTag,
        ObjectAsset,
    },
    props: {
        project: {
            type: Object,
            required: false,
        },
    },

    setup(props) {
        const project = toRef(props, "project");

        return {
            project,
        };
    },
});
</script>

<style lang="scss">
.c-project-card {
    height: 30rem;
    @include min(md) {
        height: 50rem;
    }
    &__inner {
        height: 100%;
    }
    &__image {
        @include radius(2rem);
        height: inherit;
        overflow: hidden;
        display: flex;
        justify-content: center;
        &-img {
            overflow: hidden;
            position: absolute;
            bottom: -50%;
        }
    }

    &__infos {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        width: 100%;
        height: 100%;
        color: rgb(255, 255, 255);

        &-title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
    }

    &__infos-tags {
        display: flex;
        flex-wrap: wrap;
        row-gap: 4px;
        column-gap: 4px;

        position: absolute;
        bottom: 0;
        padding: 1rem;
    }
}
</style>


<template>
    <main>
        <section class="preview-wrap">
            <div class="preview" @click="openContent" ref="itemPreviewMain">
                <div class="preview__img-wrap" ref="itemPreviewImgWrap">
                    <div class="preview__img" ref="itemPreviewImg">
                        <div
                            class="preview__img-inner"
                            style="background-image: url(/static/images/1.jpg)"
                            ref="itemPreviewImgInner"
                        ></div>
                    </div>
                </div>
                <div class="preview__title" ref="itemPreviewTitle">
                    <h2 class="preview__title-main">
                        <span class="oh"
                            ><span class="oh__inner" ref="itemPreviewTitleInner"
                                >Andesite</span
                            ></span
                        >
                    </h2>
                    <p class="preview__desc" ref="itemPreviewDescription">
                        A volcanic rock of intermediate composition, between
                        silica-poor basalt and silica-rich rhyolite.
                    </p>
                </div>
            </div>
        </section>
        <section class="content-wrap">
            <div class="content" ref="itemContentMain">
                <div class="content__group">
                    <div class="content__title" ref="itemContentTitle">
                        <span class="oh"
                            ><span class="oh__inner" ref="itemContentTitleInner"
                                >Andesite</span
                            ></span
                        >
                    </div>
                    <div class="content__meta oh">
                        <span class="oh__inner" ref="itemContentMetaInner"
                            >By James Maurice Rojo</span
                        >
                    </div>
                    <div class="content__text" ref="itemContentText">
                        Andesite (/ˈændəzaɪt/) is a volcanic rock of
                        intermediate composition. In a general sense, it is the
                        intermediate type between silica-poor basalt and
                        silica-rich rhyolite.
                    </div>
                </div>
                <div class="content__thumbs" ref="itemContentThumbs">
                    <div
                        class="content__thumbs-item"
                        style="background-image: url(/static/images/1_1.jpg)"
                    ></div>
                    <div
                        class="content__thumbs-item"
                        style="background-image: url(/static/images/1_2.jpg)"
                    ></div>
                    <div
                        class="content__thumbs-item"
                        style="background-image: url(/static/images/1_3.jpg)"
                    ></div>
                    <div
                        class="content__thumbs-item"
                        style="background-image: url(/static/images/1_4.jpg)"
                    ></div>
                </div>
            </div>

            <button
                class="unbutton action action--back"
                ref="backCtrl"
                @click="closeContent"
            >
                <svg width="25px" height="25px" viewBox="0 0 25 25">
                    <path
                        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                    />
                </svg>
                <span>Go back</span>
            </button>
        </section>
    </main>
</template>

<script>
import { defineComponent, computed, ref, toRef, onMounted } from "vue";
import { gsap, ScrollTrigger, Flip } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Flip);

import ObjectAsset from "@/templates/objects/ObjectAsset.vue";
import ListTag from "@/templates/components/ListTag.vue";

export default defineComponent({
    name: "CardProject",
    components: {
        ListTag,
        ObjectAsset,
    },
    props: {
        project: {
            type: Object,
            required: false,
        },
    },

    setup(props) {
        const project = toRef(props, "project");

        const ANIMATION_CONFIG = { duration: 1.5, ease: "power4.inOut" };

        const backCtrl = ref();

        let isAnimating = false;

        const itemContentMain = ref();
        const itemContentTitle = ref();
        const itemContentTitleInner = ref();
        const itemContentMetaInner = ref();
        const itemContentText = ref();
        const itemContentThumbs = ref();

        const itemPreviewMain = ref();
        const itemPreviewImgWrap = ref();
        const itemPreviewImg = ref();
        const itemPreviewImgInner = ref();
        const itemPreviewTitle = ref();
        const itemPreviewTitleInner = ref();
        const itemPreviewDescription = ref();

        const showContent = (item) => {
            const tl = gsap
                .timeline({
                    defaults: ANIMATION_CONFIG,
                    onStart: () => {
                        // Overflow hidden and pointer events control class
                        document.body.classList.add("content-open");
                        // Shows current content element

                        gsap.set(
                            [
                                itemContentTitleInner.value,
                                itemContentMetaInner.value,
                            ],
                            {
                                yPercent: -101,
                                opacity: 0,
                            }
                        );
                        gsap.set(itemContentThumbs.value, {
                            transformOrigin: "0% 0%",
                            scale: 0,
                            yPercent: 150,
                        });
                        gsap.set([itemContentText.value, backCtrl.value], {
                            opacity: 0,
                        });
                        // Save image current scaleY value
                        const scaleY =
                            itemPreviewImgInner.value[0].getBoundingClientRect()
                                .height /
                            itemPreviewImgInner.value[0].offsetHeight;
                        item.imageInnerScaleYCached = scaleY;
                    },
                    onComplete: () => (isAnimating = false),
                })
                .addLabel("start", 0);

            // gsap Flip logic: move the image element inside the content area
            tl.add(() => {
                const flipstate = Flip.getState(itemPreviewImg.value);
                itemContentMain.value[0].appendChild(itemPreviewImg.value[0]);
                Flip.from(flipstate, {
                    duration: ANIMATION_CONFIG.duration,
                    ease: ANIMATION_CONFIG.ease,
                    absolute: true,
                });
            }, "start")
                // preview title
                .to(
                    itemPreviewTitleInner.value,
                    {
                        yPercent: 101,
                        opacity: 0,
                        stagger: -0.03,
                    },
                    "start"
                )
                // preview description
                .to(
                    itemPreviewDescription.value,
                    {
                        yPercent: 101,
                        opacity: 0,
                    },
                    "start"
                )
                // Reset image scaleY values (changed during scroll)
                .to(
                    itemPreviewImgInner.value[0],
                    {
                        scaleY: 1,
                    },
                    "start"
                )

                // Content elements come in a bit later
                .addLabel("content", 0.15)
                // Back control button
                .to(
                    backCtrl.value,
                    {
                        opacity: 1,
                    },
                    "content"
                )
                .to(
                    itemContentMain.value,
                    {
                        opacity: 1,
                    },
                    "content"
                )
                // content title
                .to(
                    itemContentTitleInner.value,
                    {
                        yPercent: 0,
                        opacity: 1,
                        stagger: -0.05,
                    },
                    "content"
                )
                // content meta / author
                .to(
                    itemContentMetaInner.value,
                    {
                        yPercent: 0,
                        opacity: 1,
                    },
                    "content"
                )
                // content thumbs
                .to(
                    itemContentThumbs.value,
                    {
                        scale: 1,
                        yPercent: 0,
                        stagger: -0.05,
                    },
                    "content"
                )
                // content text (lines)
                .add(() => {
                    gsap.set(itemContentText.value, {
                        opacity: 1,
                        delay: 0.01,
                    });
                }, "content");
        };
        const hideContent = () => {
            gsap.timeline({
                defaults: ANIMATION_CONFIG,
                onComplete: () => {
                    // Overflow hidden and pointer events control class
                    document.body.classList.remove("content-open");
                    // Hides current content element

                    isAnimating = false;
                },
            })
                .addLabel("start", 0)
                // Back control button
                .to(
                    backCtrl.value,
                    {
                        opacity: 0,
                    },
                    "start"
                )
                // content title
                .to(
                    itemContentTitleInner.value,
                    {
                        yPercent: -101,
                        opacity: 0,
                        stagger: 0.05,
                    },
                    "start"
                )
                // content meta / author
                .to(
                    itemContentMetaInner.value,
                    {
                        yPercent: -101,
                        opacity: 0,
                    },
                    "start"
                )
                // content thumbs
                .to(
                    itemContentThumbs.value,
                    {
                        scale: 0,
                        yPercent: 150,
                        stagger: -0.05,
                    },
                    "start"
                )

                // Preview elements come in a bit later
                .addLabel("preview", 0.15)
                // gsap Flip logic: move the image element inside the content area
                .add(() => {
                    const flipstate = Flip.getState(itemPreviewImg.value);
                    itemPreviewImgWrap.value[0].appendChild(
                        itemPreviewImg.value[0]
                    );
                    Flip.from(flipstate, {
                        duration: ANIMATION_CONFIG.duration,
                        ease: ANIMATION_CONFIG.ease,
                        absolute: true,
                    });
                }, "preview")
                // preview title
                .to(
                    itemPreviewTitleInner.value,
                    {
                        yPercent: 0,
                        opacity: 1,
                        stagger: 0.03,
                    },
                    "preview"
                )
                // preview description
                .to(
                    itemPreviewDescription.value,
                    {
                        yPercent: 0,
                        opacity: 1,
                    },
                    "preview"
                );
        };

        function openContent(item) {
            if (isAnimating) return;
            isAnimating = true;
            showContent(item);
        }
        function closeContent() {
            if (isAnimating) return;
            isAnimating = true;
            hideContent();
        }

        onMounted(() => {
            itemContentMain.value = document.querySelectorAll(".content");
            itemContentTitle.value =
                document.querySelectorAll(".content__title");
            itemContentTitleInner.value = document.querySelectorAll(
                ".content__title .oh__inner"
            );
            console.log(itemContentTitleInner.value);
            itemContentMetaInner.value = document.querySelectorAll(
                ".content__meta .oh__inner"
            );
            itemContentText.value = document.querySelectorAll(".content__text");
            itemContentThumbs.value = document.querySelectorAll(
                ".content__thumbs-item"
            );

            itemPreviewMain.value = document.querySelectorAll(".preview");
            itemPreviewImgWrap.value =
                document.querySelectorAll(".preview__img-wrap");
            itemPreviewImg.value = document.querySelectorAll(".preview__img");
            itemPreviewImgInner.value = document.querySelectorAll(
                ".preview__img-inner"
            );
            itemPreviewTitle.value =
                document.querySelectorAll(".preview__title");
            itemPreviewTitleInner.value =
                document.querySelectorAll(".oh__inner");
            itemPreviewDescription.value =
                document.querySelectorAll(".preview__desc");
        });

        return {
            project,
            itemContentMain,
            itemContentTitle,
            itemContentTitleInner,
            itemContentMetaInner,
            itemContentText,
            itemContentThumbs,
            itemPreviewMain,
            itemPreviewImgWrap,
            itemPreviewImg,
            itemPreviewImgInner,
            itemPreviewTitle,
            itemPreviewTitleInner,
            itemPreviewDescription,
            showContent,
            hideContent,
            openContent,
            closeContent,
            backCtrl,
        };
    },
});
</script>

<style lang="scss">
.oh__inner {
    display: inline-block;
}

.line {
    transform-origin: 0;
    white-space: nowrap;
}

.unbutton {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    fill: currentColor;
    cursor: pointer;
    display: flex;
    align-items: center;
}

main {
    position: relative;
    display: grid;
    grid-template-areas: "frame" "page";
}

.preview-wrap {
    grid-area: page;
    position: relative;
}

.content-open .preview-wrap {
    pointer-events: none;
}

.preview {
    min-height: 400px;
    padding: 3rem 0 0;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
}

.preview__img-wrap {
    grid-area: 1 / 1 / -1 / -1;
    cursor: pointer;
}

.preview__img {
    width: 100%;
    height: 100%;
    //    overflow: hidden;
    position: relative;
}

.preview__img-inner {
    width: 100%;
    height: 100%;
    background-size: 150%;
    background-position: 0% 0%;
    background-repeat: no-repeat;
}

.content__meta {
    margin-bottom: 2rem;
    color: var(--color-text-alt);
}

.preview__title {
    text-align: center;
    align-self: center;
    justify-self: center;
    grid-area: 1 / 1 / -1 / -1;
    position: relative;
    pointer-events: none;
}

.preview__title-main {
    line-height: 1.2;
    margin: 0;
    font-weight: normal;
    font-size: clamp(2rem, 10vw, 8rem);
    font-family: scotch-display, sans-serif;
    font-weight: 300;
}

.preview__title-main > span {
    display: block;
}

.preview__title-main > span:last-child {
    display: block;
    padding: 0 1rem;
    transform: translateY(-33%);
    font-family: scotch-display, sans-serif;
    font-weight: 500;
    font-style: italic;
}

.preview__desc {
    margin: 0 auto;
    max-width: 400px;
    text-transform: uppercase;
    line-height: 1.2;
}

.content-wrap {
    position: sticky;
    top: 0;
    grid-area: page;
    height: 100%;
    /* overflow: hidden; */
    display: grid;
    grid-template-areas:
        "back back"
        "content content";
    grid-template-rows: auto 1fr;
    pointer-events: none;
    padding: 2rem;
}

.action {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
}

.content-open .action {
    visibility: visible;
    pointer-events: auto;
}

.action svg {
    width: 2em;
    height: 2em;
}

.action--back {
    justify-self: start;
    grid-area: back;
    padding: 1rem 0;
}

.action span {
    text-transform: uppercase;
}

.content {
    grid-area: content;
    grid-row: 2 / span 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    pointer-events: none;
    opacity: 0;
}

.content--current {
    position: relative;
    pointer-events: auto;
    opacity: 1;
}

.content__group {
    grid-area: text;
}

.content__title {
    font-family: scotch-display, sans-serif;
    font-weight: 400;
    font-size: clamp(3rem, 6.5vw, 5.5rem);
}

.content__title span {
    display: block;
}

.content__title > span:last-child {
    /* transform: translateY(-25%); */
    font-family: scotch-display, sans-serif;
    font-weight: 500;
    font-style: italic;
    padding: 0 0 0 0.75rem;
}

.content .preview__img {
    grid-area: img;
}

.content__thumbs {
    grid-area: thumbs;
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    grid-gap: 2vw;
    justify-content: start;
}

.content__thumbs-item {
    width: 50px;
    aspect-ratio: 1.5;
}

.content__thumbs-item:hover {
    cursor: pointer;
}

.hidden {
    opacity: 0;
    pointer-events: none;
}

@media screen and (min-width: 53em) {
    main {
        grid-template-areas: "frame page";
        grid-template-columns: auto 1fr;
    }

    .preview {
        min-height: 90vh;
    }
    .preview__desc {
        margin: -2.5rem auto 0;
    }
    .content {
        grid-template-columns: 60% 1fr;
        grid-template-areas:
            "... ..."
            "img text"
            "thumbs text"
            "... ...";
        grid-template-rows: 2rem 1fr auto 1rem;
        width: 100%;
    }
    .content__thumbs-item {
        width: 100px;
    }
    .content__text {
        max-width: 400px;
    }
}
</style>
 -->

<template>
    <div class="c-card-project" @click="openModal(project)">
        <div class="c-card-project__preview">
            <div class="c-card-project__preview-image">
                <img
                    class="c-card-project__preview-image-img"
                    :src="project.image.url"
                    alt=""
                />
            </div>
            <div class="c-card-project__preview-title">
                <h2 class="c-card-project__preview-title-main">
                    {{ project.title }}
                </h2>
                <p class="c-card-project__preview-title-desc">
                    {{ project.description }}
                </p>
            </div>
        </div>
        <div class="c-card-project__content">
            <div class="c-card-project__content-inner">
                <div class="c-card-project__content-inner-tags">
                    <ListTag :tags="project.tags" />
                </div>
                <div class="c-card-project__content-inner-link">
                    <button-primary
                        label=""
                        :iconBefore="'external'"
                        class="c-card-project__content-inner-link-btn external wiggle"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    computed,
    ref,
    toRef,
    onMounted,
    onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";
import { gsap } from "gsap/all";

import ObjectAsset from "@/templates/objects/ObjectAsset.vue";
import ListTag from "@/templates/components/ListTag.vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "CardProject",
    components: {
        ListTag,
        ObjectAsset,
        ButtonPrimary,
    },
    props: {
        project: {
            type: Object,
            required: false,
        },
    },

    setup(props) {
        const store = useStore();
        const project = toRef(props, "project");

        function openModal(data) {
            store.dispatch("modal/open", {
                component: MODAL_COMPONENTS.Project,
                data,
            });
        }

        onMounted(() => {});

        onBeforeUnmount(() => {});

        return {
            project,
            openModal,
        };
    },
});
</script>

<style lang="scss">
.c-card-project {
    width: 100%;
    background-color: black;

    aspect-ratio: 1/1;
    cursor: pointer;
    transition: all 0.8s ease;
    &:hover {
        .c-card-project__preview-image-img {
            transform: scale(1.03);
        }
        .c-card-project__preview-image {
            @include radius(8rem);
        }
        .wiggle {
            animation: wigglecontinue 0.3s 1;
        }
        @include radius(8rem);
    }

    &__preview {
        width: 100%;
        height: 100%;
        &-image {
            width: 100%;
            height: 100%;
            overflow: hidden;

            transition: all 0.8s ease;

            &-img {
                width: 100%;
                height: auto;

                max-width: 100%;
                max-height: 100%;
                object-fit: cover;

                transition: all 0.8s ease;
            }
        }
        &-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            &-main {
                font-size: var(--fs-large);
                font-family: var(--ff-heading);
                text-transform: uppercase;
            }
            &-desc {
            }
        }
    }
    &__content {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        @include min(md) {
            padding: 2rem;
        }
        &-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-tags {
            }
            &-link {
                &-btn {
                    @include max(md) {
                        display: none;
                    }
                    &.external {
                        --btn-border-color: transparent;
                        --btn-hover-display: none;
                    }
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
