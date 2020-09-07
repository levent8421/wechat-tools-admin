import {request} from './request';

export const applyTokenFetcherConfig = (merchantId, options) => {
    return request({
        url: `/api/token/token-fetch/merchant/${merchantId}`,
        method: 'post',
        data: options,
    });
};

export const fetchConfigByMerchant = merchantId => {
    return request({
        url: '/api/token/token-fetch/',
        method: 'get',
        params: {
            merchantId
        },
    });
};