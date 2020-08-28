import {request} from './request';

export const login = (option) => {
    return request({
        url: '/api/open/admin/_login',
        method: 'post',
        data: option,
    });
};


export const currentAmdin = () => {
    return request({
        url: '/api/token/admin/_me',
        method: 'get',
    });
};
