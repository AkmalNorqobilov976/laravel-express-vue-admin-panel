import request from '@/utils/request';

const url = 'storages'
export function getStoragesByPagination(page) {
    return request({
        url: `/admin-api/${url}/?page=${page}`,
        method: 'get',
    });
}

export function getStorage(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createStorage(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updateStorage(storage, id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'put',
        data: storage
    });
}

export function deleteStorage(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

