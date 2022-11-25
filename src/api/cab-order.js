import { queryMaker } from '@/utils/former';
import request from '@/utils/request';

const url = 'cab-orders'
export function getCabOrdersByPagination(page, query = "", sortParams = "", filterAttributes) {
    let urlParams = `page=${page}`;
    if (query) {
        urlParams += `&query=${query}`;
    }
    if (sortParams) {
        urlParams += `${sortParams}`;
    }
    urlParams += queryMaker(filterAttributes);

    return request({
        url: `/admin-api/${url}/?${urlParams}`,
        method: 'get',
    });
}

export function getCabOrder(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createCabOrder(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updateCabOrder(data, id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'put',
        data: data
    });
}

export function deleteCabOrder(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

