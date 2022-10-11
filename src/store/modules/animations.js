import emitter from "@/services/emitter";
/*
 *
 * Scroll
 *
 */

// State
const state = {
    refreshCount: 0,
    isPaused: false,
};

// Getters
const getters = {};

// Actions
const actions = {
    toggleRefreshGlobally(store) {
        store.commit("toggleRefresh");
    },
    togglePauseGlobally(store) {
        store.commit("togglePause");
    },
};

// Mutations
const mutations = {
    toggleRefresh(state) {
        state.refreshCount = state.refreshCount + 1;
        emitter.emit("v-view-refresh");
    },
    togglePause(state) {
        state.isPaused = !state.isPaused;
        state.isPaused ? emitter.emit("v-view-pause") : emitter.emit("v-view-unpause");
    },
};

// Export module
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
};
