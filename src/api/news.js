import request from '@/utils/request';

const url = 'news'
export function getNewsByPagination(page) {
    return request({
        url: `/admin-api/${url}/?page=${page}`,
        method: 'get',
    });
}

export function getNew(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'get'
    });
}

export function createNew(data) {
    return request({
        url: `admin-api/${url}`,
        method: 'post',
        data: data
    });
}

export function updateNew(news, id) {
    return request({
        url: `admin-api/${url}/${id}?_method=put`,
        method: 'post',
        data: news
    });
}

export function deleteNew(id) {
    return request({
        url: `admin-api/${url}/${id}`,
        method: 'delete'
    });
}

