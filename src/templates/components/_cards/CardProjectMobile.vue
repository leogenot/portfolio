<template>
    <div class="c-card-project-mobile" @click="openModal(project)">
        <div class="c-card-project-mobile__preview">
            <div class="c-card-project-mobile__preview-image">
                <img
                    class="c-card-project-mobile__preview-image-img"
                    :src="project.cover.url"
                    alt=""
                    data-speed="auto"
                />
            </div>
            <div class="c-card-project-mobile__preview-title">
                <h2 class="c-card-project-mobile__preview-title-main">
                    {{ project.title }}
                </h2>
                <p class="c-card-project-mobile__preview-title-desc">
                    {{ project.description }}
                </p>
            </div>
        </div>
        <div class="c-card-project-mobile__content">
            <div class="c-card-project-mobile__content-inner">
                <div class="c-card-project-mobile__content-inner-tags">
                    <ListTag :tags="project.tags" />
                </div>
                <div class="c-card-project-mobile__content-inner-link">
                    <button-primary
                        label=""
                        :iconBefore="'external'"
                        class="c-card-project-mobile__content-inner-link-btn external wiggle"
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

import ObjectAsset from "@/templates/objects/ObjectAsset.vue";
import ListTag from "@/templates/components/ListTag.vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "CardProjectMobile",
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
.c-card-project-mobile {
    width: 100%;

    aspect-ratio: 1/1;
    cursor: pointer;

    &__preview {
        width: 100%;
        height: 100%;
        &-image {
            width: 100%;
            height: 100%;
            overflow: hidden;

            transition: all 0.8s ease;
            @include radius(2rem);

            &-img {
                width: 110%;
                height: auto;

                max-width: 110%;
                max-height: 110%;
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
                font-size: var(--fs-xsmall);
                font-family: var(--ff-body);
                text-transform: uppercase;
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
