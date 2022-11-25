import { queryMaker } from '@/utils/former';
import request from '@/utils/request';

const url = 'cargos'
export function getCargosByPagination(page, query = "", sortParams = "", filterAttributes) {
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

export function getCargo(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createCargo(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updateCargo(data, id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'put',
        data: data
    });
}

export function deleteCargo(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

