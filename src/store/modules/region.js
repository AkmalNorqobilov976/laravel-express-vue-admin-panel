import { createDistrict, createRegion, deleteDistrict, deleteRegion, getDistrictsByRegionId, getLocations, getRegion, getRegionsByPagination, updateDistrict, updateRegion } from "@/api/region";
import { getErrorMessage } from "@/utils/error-message";




const state = {
    regions: [],
    meta: {},
    region: null,

    // districts
    districts: [],
    locations: []
};

const mutations = {
    SET_REGIONS(state, data) {
        state.regions = [...data.data];
        state.meta = {
            ...data.meta
        }
    },
    SET_REGION(state, region) {
        state.region = { ...region };
    },

    SET_DISTRICTS(state, districts) {
        state.districts = [...districts];
    },

    SET_LOCATIONS(state, locations) {
        state.locations = [...locations];
    }
}

const actions = {
    // region get By Pagiantion
    getRegionsByPagination({ commit, state }, page = 1) {
        return new Promise((resolve, reject) => {
            getRegionsByPagination(page).then(response => {
                commit('SET_REGIONS', response.data);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getOneRegion({ commit }, id) {
        return new Promise((resolve, reject) => {
            getRegion(id).then(response => {

                const { data } = response;

                commit('SET_REGION', data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },



    createOneRegion({ commit }, region) {
        return new Promise((resolve, reject) => {
            createRegion(region).then(response => {
                const { data } = response;
                commit('SET_REGION', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    updateRegion({ commit }, region) {
        return new Promise((resolve, reject) => {
            updateRegion(region, region.id).then(response => {
                const { data } = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getLocations() {
        return new Promise((resolve, reject) => {
            getLocations().then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    getDistrictsByRegionId({ commit }, regionId) {
        return new Promise((resolve, reject) => {
            getDistrictsByRegionId(regionId).then(response => {
                const { data } = response;

                commit('SET_DISTRICTS', data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    createOneDistrict({ commit }, district) {
        if (!district?.is_enabled) {
            district = {
                ...district,
                is_enabled: 0
            };
        }
        const { country_id } = district;
        return new Promise((resolve, reject) => {
            createDistrict(district).then(response => {
                const { data } = response;

                resolve(data);

            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteRegion({ commit }, regionId) {
        return new Promise((resolve, reject) => {
            deleteRegion(regionId).then(response => {
                const { data } = response;

                resolve(data);
            }).catch(error => {
                reject(getErrorMessage(error));
            })
        })
    },

    updateDistrict({ commit }, district) {
        if (!district?.is_enabled) {
            district = {
                ...district,
                is_enabled: 0
            };
        }
        return new Promise((resolve, reject) => {
            updateDistrict(district, district.id).then(response => {
                const { data } = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },

    deleteDistrict({ commit }, districtId) {
        return new Promise((resolve, reject) => {
            deleteDistrict(districtId).then(response => {
                resolve(response.data);
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

