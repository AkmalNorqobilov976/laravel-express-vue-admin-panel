import { getPackage, getPackagesByPagination, createPackage, updatePackage, deletePackage } from "@/api/package";

const state = {
    packages: [],
    meta: {},
    package: null
};

const mutations = {
    SET_PACKAGES(state, data) {
        state.packages = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_PACKAGE(state, packge) {
        state.package = { ...packge };
    }
}

const actions = {
    // packge get By Pagiantion
    getPackagesByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getPackagesByPagination(page).then(response => {
                commit('SET_PACKAGES', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getPackage({ commit }, id) {
        return new Promise((resolve, reject) => {
            getPackage(id).then(response => {

                const { data } = response;

                commit('SET_PACKAGE', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createPackage({ commit }, packge) {
        return new Promise((resolve, reject) => {
            createPackage(packge).then(response => {
                const { data } = response;
                commit('SET_PACKAGE', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updatePackage({ commit }, packge) {
        delete packge.creator;
        return new Promise((resolve, reject) => {
            updatePackage(packge, packge.id).then(response => {
                const { data } = response;
                commit('SET_PACKAGE', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deletePackage({ commit }, packgesId) {
        return new Promise((resolve, reject) => {
            deletePackage(packgesId).then(response => {
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

