<template>
    <component
        :is="tag"
        :href="btnHref"
        :to="btnTo"
        :rel="tag == 'a' ? 'noopener' : null"
        :class="className"
        :aria-disabled="isDisabled ? true : null"
        :disabled="isDisabled ? true : null"
        :target="btnTarget"
    >
        <object-icon
            v-if="iconBefore"
            class="c-button-primary__icon c-button-primary__icon--before"
            :name="iconBefore"
        />
        <span class="c-button-primary__label">
            <slot>{{ label }}</slot>
        </span>
        <object-icon
            v-if="iconAfter"
            class="c-button-primary__icon c-button-primary__icon--after"
            :name="iconAfter"
        />
    </component>
</template>

<script>
import { defineComponent, computed } from "vue";

import ObjectIcon from "@/templates/objects/ObjectIcon.vue";

export default defineComponent({
    name: "ButtonPrimary",
    components: {
        ObjectIcon,
    },
    props: {
        //--- Base ---//
        href: {
            type: String,
            default: null,
        },
        label: {
            type: [String, Number],
            default: "Button Label",
        },
        tag: {
            type: String,
            default: "button",
        },
        isDisabled: {
            type: Boolean,
            default: null,
        },
        isTargetBlank: {
            type: Boolean,
            default: false,
        },

        //--- Visual ---//
        color: {
            type: String,
            required: false,
            default: "dark",
            validator: (val) => ["dark", "light"].includes(val),
        },

        //--- Icons ---//
        iconBefore: {
            type: String,
            default: null,
        },
        iconAfter: {
            type: String,
            default: null,
        },
    },
    setup(_) {
        const className = computed(() => [
            "c-button-primary",
            `-color-${_.color}`,
        ]);

        const btnHref = computed(() =>
            (_.tag == "a" || _.tag == "router-link") && _.href !== null
                ? _.href
                : null
        );
        const btnTo = computed(() =>
            _.tag == "router-link" && _.href !== null ? href : null
        );

        const isTargetBlank = computed(() =>
            _.isTargetBlank ? "_blank" : "_self"
        );
        const btnTarget = computed(() =>
            _.tag === "a" ? isTargetBlank.value : null
        );

        return { className, btnHref, btnTo, btnTarget };
    },
});
</script>

<style lang="scss" scoped>
.c-button-primary {
    --btn-color: var(--color-light);
    --btn-bg-color: var(--color-dark);
    --svg-spacing: 0.5em;

    display: inline-flex;
    align-items: center;
    gap: var(--svg-spacing);
    padding: 0.5em 1em;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    color: var(--btn-color);
    background: var(--btn-bg-color);
    border-radius: 0.5em;

    &__label {
    }

    &__icon {
        --svg-width: 0.9em;
    }

    /*==============================
    =      VISUAL VARIATIONS       =
    ==============================*/

    &.-color-light {
        --btn-color: var(--color-dark);
        --btn-bg-color: var(--color-light);
    }

    /*==============================
    =           STATES             =
    ==============================*/

    //--- Hover ---//
    &:hover {
        --btn-color: var(--color-light);
        --btn-bg-color: var(--color-accent);
    }

    //--- DISABLED ---//
    &[disabled],
    &[aria-disabled="true"] {
        pointer-events: none;
        text-decoration: none;
        cursor: not-allowed;
        opacity: 0.4;
    }

    @at-root span#{&} {
        pointer-events: none;
    }
}
</style>
