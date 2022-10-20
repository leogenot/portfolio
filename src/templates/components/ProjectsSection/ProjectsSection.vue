<template>
    <div class="c-projects | l-container -default">
        <div class="c-projects__list">
            <!-- <team-card :data="item" v-for="(item, i) in data.team" :key="`gallery-img-${i}`" /> -->
            <card-project
                v-for="(project, i) in projects"
                :key="`project-${i}`"
                :project="project"
            />

            <!-- <section id="red" class="panel red align-top" ref="red">
                <p ref="red_content">
                    <code>start: "top center"</code> pins this element when the
                    <strong>top</strong> of the red element hits the
                    <strong>center</strong> of the viewport, and remains pinned
                    for 200px because its <code>end</code> is defined as
                    <code>"+=200"</code>
                </p>
                <img
                    src="https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                />
            </section> -->
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    computed,
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick,
} from "vue";
import { useStore } from "vuex";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import ListTag from "@/templates/components/ListTag.vue";
import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";
import CardProject from "@/templates/components/_cards/CardProject.vue";

export default defineComponent({
    name: "ProjectsSections",
    components: {
        ListTag,
        ButtonPrimary,
        CardProject,
    },
    setup() {
        const projects = ref({
            project1: {
                title: "Sagacia",
                description: "project 1 description",
                image: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
                tags: [
                    {
                        highlighted: true,
                        label: "DEV",
                    },
                ],
            },
            project2: {
                title: "Deep Drawing",
                description:
                    "If you need to know how much space the actual displayed content takes up, including padding but not including the border, margins, or scrollbars, you want to use",
                image: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
                tags: [
                    {
                        highlighted: false,
                        label: "UI/UX",
                    },
                    {
                        highlighted: true,
                        label: "DEV",
                    },
                ],
            },
            project4: {
                title: "BNP",
                description: "This is a description",
                image: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
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
            },
            project5: {
                title: "Studimac",
                description: "This is a description",
                image: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
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
            },
        });

        return { projects };
    },
});
</script>

<style lang="scss">
.c-projects {
    //height: 100vh;
    /*&__list {
        margin-top: 5rem;
        //display: flex;
        //flex-direction: column;
        //gap: 5rem;

        display: grid;

        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
        gap: 5rem;
        @include min(md) {
            margin-top: 10rem;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
        }
        @include min(3xl) {
            margin-top: 10rem;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
        }
    }*/
}
</style>
