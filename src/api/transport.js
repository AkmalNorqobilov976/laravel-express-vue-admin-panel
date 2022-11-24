import request from '@/utils/request';

const url = 'transports'
export function getTransportsByPagination(page) {
    return request({
        url: `/admin-api/${url}/?page=${page}`,
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

