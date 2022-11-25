import { queryMaker } from '@/utils/former';
import request from '@/utils/request';

const url = 'transports'
export function getTransportsByPagination(page, query = "", sortParams = "", filterAttributes) {
    let urlParams = `page=${page}`;
    if (query) {
        urlParams += `&query=${query}`;
    }
    if (sortParams) {
        urlParams += `${sortParams}`;
    }
    urlParams += queryMaker(filterAttributes);
    console.log(urlParams, "params");
    return request({
        url: `/admin-api/${url}/?${urlParams}`,
        method: 'get',
    });
}

export function getTransport(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createTransport(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updateTransport(transport, id) {
    return request({
        url: `admin-api/${url}/${id}?_method=put`,
        method: 'post',
        data: transport
    });
}

export function deleteTransport(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

