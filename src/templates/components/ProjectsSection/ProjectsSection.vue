<template>
    <div class="c-projects | l-container -default">
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
                description: "Website made during my internship at MamboMambo",
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
                    image1: "/static/images/",
                },
            },
            project2: {
                title: "Deep Drawing",
                description: "Random sketches generation using AI",
                cover: {
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
                images: {
                    image1: "/static/images/",
                },
            },
            project4: {
                title: "BNP",
                description: "Loan simulation tool",
                cover: {
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
                images: {
                    image1: "/static/images/",
                },
            },
            project5: {
                title: "Studimac",
                description: "Organization app for students",
                cover: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
                tags: [
                    {
                        highlighted: false,
                        label: "UI/UX",
                    },
                ],
                images: {
                    image1: "/static/images/",
                },
            },
            project6: {
                title: "VisuTerre",
                description: "3D terrain visualization",
                cover: {
                    url: "https://images.unsplash.com/photo-1665687002482-8bcc38faceba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                },
                tags: [
                    {
                        highlighted: false,
                        label: "DEV",
                    },
                ],
                images: {
                    image1: "/static/images/",
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
    height: -webkit-fill-available;
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
