<template>
    <div class="c-project-card">
        <div class="c-project-card__inner">
            <div class="c-project-card__image">
                <object-asset
                    v-if="project.image"
                    :asset="project.image"
                    :is-cover="true"
                    :is-lazy="true"
                    class="c-project-card__image-img"
                ></object-asset>
            </div>
            <div class="c-project-card__infos">
                <h2 class="c-project-card__infos-title">
                    <span>Pio.</span>
                    <span><span>Redefining warehouse automation.</span></span>
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
        //const project = toRef(props, "project");

        const project = ref({
            title: "Hello",
            description: "This is a description",
            tags: [
                {
                    highlighted: false,
                    label: "hello",
                },
                {
                    highlighted: true,
                    label: "goodbye",
                },
                {
                    highlighted: false,
                    label: "reset",
                },
            ],
            image: {
                url: "https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
            },
        });

        return {
            project,
        };
    },
});
</script>

<style lang="scss">
.c-project-card {
    @include min(md) {
        height: 50rem;
    }
    &__inner {
        height: 100%;
    }
    &__image {
        height: inherit;
        overflow: hidden;
        &-img {
            overflow: hidden;
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
