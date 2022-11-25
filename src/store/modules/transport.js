import { createTransport, deleteTransport, getTransport, getTransportsByPagination, updateTransport } from "@/api/transport";
import { formerMultipleFile } from "@/utils/former";

const state = {
    transports: [],
    meta: {},
    transport: null
};

const mutations = {
    SET_TRANSPORTS(state, data) {
        state.transports = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_TRANSPORT(state, transport) {
        state.transport = { ...transport };
    }
}

const actions = {
    // transport get By Pagiantion
    getTransportsByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getTransportsByPagination(page).then(response => {
                commit('SET_TRANSPORTS', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getOneTransport({ commit }, id) {
        return new Promise((resolve, reject) => {
            getTransport(id).then(response => {

                const { data } = response;

                commit('SET_TRANSPORT', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createTransport({ commit }, transport) {
        const formedTransport = formerMultipleFile(transport);
        return new Promise((resolve, reject) => {
            createTransport(formedTransport).then(response => {
                const { data } = response;
                commit('SET_TRANSPORT', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateTransport({ commit }, transport) {
        delete transport.creator;

        // if (transport.transport_images.length==) {
        //     delete transport.transport_images;
        // }
        const formedTransport = formerMultipleFile(transport);

        return new Promise((resolve, reject) => {
            updateTransport(formedTransport, transport.id).then(response => {
                const { data } = response;
                commit('SET_TRANSPORT', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteTransport({ commit }, transportId) {
        return new Promise((resolve, reject) => {
            deleteTransport(transportId).then(response => {
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

