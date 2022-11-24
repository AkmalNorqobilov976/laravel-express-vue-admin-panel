import { queryMaker } from '@/utils/former';
import request from '@/utils/request';

const url = 'storages'
export function getStoragesByPagination(page, query = "", sortParams = "", filterAttributes) {
    let urlParams = `page=${page}`;
    if (query) {
        urlParams += `&query=${query}`;
    }
    if (sortParams) {
        urlParams += `${sortParams}`;
    }
    urlParams += queryMaker(filterAttributes);
    console.log(urlParams);
    return request({
        url: `/admin-api/${url}/?${urlParams}`,
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
        url: `admin-api/${url}/${id}?_method=put`,
        method: 'post',
        data: storage
    });
}

export function deleteStorage(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

