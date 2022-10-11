
// Vuex Stores
export const STORE_MODULES = Object.freeze([
    "global",
    "loader",
    "modal",
    "navigations",
    "scroll",
    "userContext",
    "animations"
]);

export const MODAL_COMPONENTS = Object.freeze({
    EMBED: "ModalEmbed",
    VIDEO: "ModalVideo",
});

// Loader settings
export const LOADER = Object.freeze({
    toCover: 0.5,
    cover: 0.4,
    firstLoad: 2,
    toUncover: 0.5,
});

