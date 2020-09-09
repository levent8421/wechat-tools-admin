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


export const fetchAdminList = () => {
    return request({
        url: '/api/token/admin/',
        method: 'get',
    });
};


export const createAdmin = data => {
    return request({
        url: '/api/token/admin/',
        method: 'put',
        data,
    });
};

export const deleteAdmin = adminId => {
    return request({
        url: `/api/token/admin/${adminId}`,
        method: 'delete',
    });
};
