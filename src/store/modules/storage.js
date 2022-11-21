import { getStorage, getStoragesByPagination, createStorage, updateStorage, deleteStorage } from "@/api/storage";

const state = {
    storages: [],
    meta: {},
    storage: null
};

const mutations = {
    SET_STORAGES(state, data) {
        state.storages = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_STORAGE(state, storage) {
        state.storage = { ...storage };
    }
}

const actions = {
    // storage get By Pagiantion
    getStoragesByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getStoragesByPagination(page).then(response => {
                commit('SET_STORAGES', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getStorage({ commit }, id) {
        return new Promise((resolve, reject) => {
            getStorage(id).then(response => {

                const { data } = response;

                commit('SET_STORAGE', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createStorage({ commit }, storage) {
        return new Promise((resolve, reject) => {
            createStorage(storage).then(response => {
                const { data } = response;
                commit('SET_STORAGE', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateStorage({ commit }, storage) {
        delete storage.creator;
        return new Promise((resolve, reject) => {
            updateStorage(storage, storage.id).then(response => {
                const { data } = response;
                commit('SET_STORAGE', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteStorage({ commit }, storagesId) {
        return new Promise((resolve, reject) => {
            deleteStorage(storagesId).then(response => {
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

