/*
 *
 * Navigation
 *
 */

// State
const state = {
    isNavOpen: false,
    navHeight: 90,
};

// Getters
const getters = {};

// Actions
const actions = {
    toggleNavigationGlobally(store, bool) {
        store.commit("toggleNavigation", bool);
    },
    setNavHeightGlobally(store, height) {
        store.commit("setNavHeight", height);
    }
};

// Mutations
const mutations = {
    toggleNavigation(state, bool) {
        state.isNavOpen = bool;
    },
    setNavHeight(state, height) {
        state.navHeight = height;
    }
};

// Export module
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
};
