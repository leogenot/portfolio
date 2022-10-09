<template>
    <button-primary
        class="c-contact-btn wiggle"
        label="Contact"
        color="light"
    />
</template>

<script>
import { defineComponent, computed } from "vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "ContactButton",
    components: {
        ButtonPrimary,
    },
    setup() {},
});
</script>

<style lang="scss">
.c-contact-btn {
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
    animation: wigglecontinue 0.3s 1;
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
