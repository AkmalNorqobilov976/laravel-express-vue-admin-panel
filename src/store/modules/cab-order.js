import { getCabOrder, getCabOrdersByPagination, createCabOrder, updateCabOrder, deleteCabOrder } from "@/api/cab-order";

const state = {
    cab_orders: [],
    meta: {},
    cab_order: null
};

const mutations = {
    SET_CAB_ORDERS(state, data) {
        state.cab_orders = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_CAB_ORDER(state, cab_order) {
        state.cab_order = { ...cab_order };
    }
}

const actions = {
    // cab_order get By Pagiantion
    getCabOrdersByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getCabOrdersByPagination(page).then(response => {
                commit('SET_CAB_ORDERS', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getCabOrder({ commit }, id) {
        return new Promise((resolve, reject) => {
            getCabOrder(id).then(response => {

                const { data } = response;

                commit('SET_CAB_ORDER', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createCabOrder({ commit }, cab_order) {
        return new Promise((resolve, reject) => {
            createCabOrder(cab_order).then(response => {
                const { data } = response;
                commit('SET_CAB_ORDER', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateCabOrder({ commit }, cab_order) {
        
        return new Promise((resolve, reject) => {
            updateCabOrder(cab_order, cab_order.id).then(response => {
                const { data } = response;
                commit('SET_CAB_ORDER', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteCabOrder({ commit }, storagesId) {
        return new Promise((resolve, reject) => {
            deleteCabOrder(storagesId).then(response => {
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

