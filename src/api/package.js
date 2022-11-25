import request from '@/utils/request';

const url = 'packages';
export function getPackagesByPagination(page, query = "", sortParams = "", filterAttributes) {
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

export function getPackage(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createPackage(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updatePackage(Package, id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'put',
        data: Package
    });
}

export function deletePackage(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

