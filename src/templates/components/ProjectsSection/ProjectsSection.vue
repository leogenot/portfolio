<template>
    <div class="c-projects">
        <div class="c-projects__list |">
            <div class="c-project">
                <div class="c-project-left">
                    <h4 class="c-project-left-nb-project">
                        {{ count_projects }}/
                    </h4>
                </div>
                <div class="c-project-middle">
                    <card-project
                        v-for="(project, i) in projects"
                        :key="`project-${i}`"
                        :project="project"
                    />
                    <!-- <div class="mobile">
                        <card-project-mobile
                            v-for="(project, i) in projects"
                            :key="`project-${i}`"
                            :project="project"
                        />
                    </div> -->
                </div>
                <div class="c-project-right">
                    <h4 class="c-project-right-work">My work</h4>
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
import CardProjectMobile from "@/templates/components/_cards/CardProjectMobile.vue";

export default defineComponent({
    name: "ProjectsSections",
    components: {
        ListTag,
        ButtonPrimary,
        CardProject,
        CardProjectMobile,
    },
    setup() {
        const projects = ref({
            project1: {
                title: "Sagacia",
                description:
                    "Website made during my internship at MamboMambo. In collaboration with Aurélien Vigne. Animation first website using GSAP.",
                cover: {
                    url: "/static/images/sagacia/0.png",
                },
                tags: [
                    {
                        highlighted: true,
                        label: "DEV",
                    },
                ],
                images: {
                    1: "/static/images/sagacia/1.png",
                    2: "/static/images/sagacia/2.png",
                    3: "/static/images/sagacia/3.png",
                },

                link: {
                    url: "https://mambomambo.ca",
                    label: "Visit MamboMambo",
                },
            },
            project2: {
                title: "Deep Drawing",
                description:
                    "Web tool to generate random sketches using tensorflowjs (adapted from python to work as a standalone web page).",
                cover: {
                    url: "/static/images/generative_deep_learning/1.png",
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
                images: {
                    1: "/static/images/generative_deep_learning/1.png",
                    2: "/static/images/generative_deep_learning/2.png",
                    3: "/static/images/generative_deep_learning/3.png",
                    4: "/static/images/generative_deep_learning/sample_6500.png",
                },
                link: {
                    url: "https://leogenot.github.io/DeepDrawing/",
                    label: "Try it out",
                },
            },
            project4: {
                title: "BNP",
                description:
                    "Web tool to help customer and advisors see the benefits of loan insurances.",
                cover: {
                    url: "/static/images/bnp/1.png",
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
                images: {
                    1: "/static/images/bnp/1.png",
                    2: "/static/images/bnp/2.png",
                    3: "/static/images/bnp/3.png",
                    4: "/static/images/bnp/4.png",
                },
            },
            project5: {
                title: "Studimac",
                description:
                    "Help student stay organized when working from home or not, centralize all their favorite school apps",
                cover: {
                    url: "/static/images/studimac/1.jpg",
                },
                tags: [
                    {
                        highlighted: false,
                        label: "UI/UX",
                    },
                ],
                images: {
                    1: "/static/images/studimac/1.jpg",
                    2: "/static/images/studimac/2.jpg",
                    3: "/static/images/studimac/3.jpg",
                    4: "/static/images/studimac/4.png",
                },
            },
            project6: {
                title: "VisuTerre",
                description: "3D terrain visualizer made in OpenGL and C++",
                cover: {
                    url: "/static/images/visuterre/1.png",
                },
                tags: [
                    {
                        highlighted: false,
                        label: "DEV",
                    },
                ],
                images: {
                    1: "/static/images/visuterre/1.png",
                    2: "/static/images/visuterre/2.png",
                    3: "/static/images/visuterre/3.png",
                    4: "/static/images/visuterre/4.png",
                },
            },
        });

        const count_projects = computed(() => {
            return Object.keys(projects.value).length;
        });

        ////////////////////////////////
        //       START IMAGE TIMELINE
        ////////////////////////////////
        const imageContainer = ref();

        const imageAnimationTimeline = gsap.timeline({
            paused: true,
        });

        function initImageTimeline() {
            imageAnimationTimeline.to(imageContainer.value, {
                "--crop-path-btm-left": "100%",
                "--crop-path-btm-right": "100%",
                duration: 1,
                ease: "customEase",
            });

            //imageAnimationTimeline.play();
        }

        function playAnimation() {
            imageAnimationTimeline.play();
        }
        function stopAnimation() {
            imageAnimationTimeline.reverse();
        }
        ////////////////////////////////
        //       END IMAGE TIMELINE
        ////////////////////////////////

        onMounted(() => {
            initImageTimeline();
        });

        onBeforeUnmount(() => {
            imageAnimationTimeline ? imageAnimationTimeline.kill() : null;
        });

        return {
            projects,
            count_projects,
            imageContainer,
            imageAnimationTimeline,
            initImageTimeline,
            playAnimation,
            stopAnimation,
        };
    },
});
</script>

<style lang="scss">
.c-projects {
    //height: -webkit-fill-available;
    padding: 0px 5% 40px;
    @include min(md) {
        padding: 100px 5% 40px;
    }
}

.desktop {
    @include max(md) {
        display: none;
    }
}
.mobile {
    @include min(md) {
        display: none;
    }
}

.c-project {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px;
    margin-top: 5rem;
    font-size: var(--fs-small);
    font-family: var(--ff-body);
    color: var(--color-pistachio);

    @include min(md) {
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 2.5rem;
    }
    &-left {
        &-nb-project {
        }
    }
    &-middle {
        grid-column-start: 1;
        grid-column-end: -1;
        grid-row-start: 2;
        margin-top: 65px;

        @include min(md) {
            grid-column-start: 3;
            grid-column-end: 10;
            grid-row-start: 1;
            margin-top: 0;
        }
    }
    &-right {
        grid-column-start: 3;
        grid-column-end: 7;
        @include min(md) {
            grid-column-start: 11;
            grid-column-end: 13;
        }
        &-work {
        }
    }
}
</style>
