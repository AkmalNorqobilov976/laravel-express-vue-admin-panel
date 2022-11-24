import request from '@/utils/request';

const url = 'news'
export function getNewsByPagination(page, query= "", sortParams = "") {
    let urlParams = `page=${page}`;
    if(query){
        urlParams+= `&query=${query}`;
    }
    if(sortParams){
        urlParams += `${sortParams}`;
    }
    return request({
        url: `/admin-api/${url}/?${urlParams}`,
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

export function activateNews(id){
    return request({
        url: `admin-api/${url}/${id}/activate`,
        method: 'patch'
    })
}
