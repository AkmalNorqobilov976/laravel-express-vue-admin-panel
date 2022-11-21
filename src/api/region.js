import request from '@/utils/request';

const url = 'regions'
export function getRegionsByPagination(page) {
    return request({
        url: `/admin-api/${url}/?page=${page}`,
        method: 'get',
    });
}

export function getRegion(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}




export function createRegion(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}




export function updateRegion(data, id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'put',
        data: data
    });
}

export function deleteRegion(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}




export function getDistrictsByRegionId(regionId) {
    return request({
        url: `/admin-api/${url}/${regionId}/districts`,
        method: 'get'
    });
}


export function getLocations() {
    return request({
        url: `/api/locations`,
        method: "get"
    })
}

export function createDistrict(data) {
    return request({
        url: `admin-api/${url}/districts`,
        method: 'post',
        data: data
    });
}

export function updateDistrict(data, districtId) {
    return request({
        url: `admin-api/${url}/districts/${districtId}`,
        method: 'put',
        data: data
    });
}

export function deleteDistrict(districtId) {
    return request({
        url: `admin-api/${url}/districts/${districtId}`,
        method: 'delete'
    })
}