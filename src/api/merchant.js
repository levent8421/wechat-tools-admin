import {request} from './request';

export const fetchMerchants = (page = 1, rows = 10) => {
    return request({
        url: '/api/token/merchant/_paged',
        method: 'get',
        params: {
            page: page,
            rows: rows,
        }
    });
};


export const createMerchant = data => {
    return request({
        url: '/api/token/merchant/',
        method: 'put',
        data: data,
    });
};


export const requireById = id => {
    return request({
        url: `/api/token/merchant/${id}`,
        method: 'get',
    });
};

export const bindWechatAppId = (merchantId, config) => {
    return request({
        url: `/api/token/merchant/${merchantId}/wechat-app-id`,
        method: 'post',
        data: {
            wechatAppId: config.appId,
            wechatSecret: config.secret,
        }
    });
};