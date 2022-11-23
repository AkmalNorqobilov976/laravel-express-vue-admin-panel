import { getNew, getNewsByPagination, createNew, updateNew, deleteNew } from "@/api/news";
import { former } from "@/utils/former";

const state = {
    news: [],
    meta: {},
    anews: null
};

const mutations = {
    SET_NEWS(state, data) {
        state.news = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_NEW(state, anews) {
        state.anews = { ...anews };
    }
}

const actions = {
    // anews get By Pagiantion
    getNewsByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getNewsByPagination(page).then(response => {
                commit('SET_NEWS', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getNew({ commit }, id) {
        return new Promise((resolve, reject) => {
            getNew(id).then(response => {

                const { data } = response;

                commit('SET_NEW', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createNew({ commit }, anews) {
        const datass = former(anews);
        return new Promise((resolve, reject) => {
            createNew(datass).then(response => {
                const { data } = response;
                commit('SET_NEW', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateNew({ commit }, anews) {
        const preparedData = former(anews);
        return new Promise((resolve, reject) => {
            updateNew(preparedData, anews.id).then(response => {
                const { data } = response;
                commit('SET_NEW', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteNew({ commit }, newsId) {
        return new Promise((resolve, reject) => {
            deleteNew(newsId).then(response => {
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

