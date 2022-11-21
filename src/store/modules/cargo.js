import { getCargo, getCargosByPagination, createCargo, updateCargo, deleteCargo } from "@/api/cargo";

const state = {
    cargos: [],
    meta: {},
    cargo: null
};

const mutations = {
    SET_CARGOS(state, data) {
        state.cargos = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_CARGO(state, cargo) {
        state.cargo = { ...cargo };
    }
}

const actions = {
    // cargo get By Pagiantion
    getCargosByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getCargosByPagination(page).then(response => {
                commit('SET_CARGOS', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getCargo({ commit }, id) {
        return new Promise((resolve, reject) => {
            getCargo(id).then(response => {

                const { data } = response;

                commit('SET_CARGO', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createCargo({ commit }, cargo) {
        return new Promise((resolve, reject) => {
            createCargo(cargo).then(response => {
                const { data } = response;
                commit('SET_CARGO', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateCargo({ commit }, cargo) {
        
        return new Promise((resolve, reject) => {
            updateCargo(cargo, cargo.id).then(response => {
                const { data } = response;
                commit('SET_CARGO', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteCargo({ commit }, storagesId) {
        return new Promise((resolve, reject) => {
            deleteCargo(storagesId).then(response => {
                const { data } = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

