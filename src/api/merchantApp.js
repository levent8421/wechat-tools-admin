import {request} from './request';

export const fetchAppsByMerchant = merchantId => {
    return request({
        url: '/api/token/merchant-app/_by-merchant',
        method: 'get',
        params: {
            merchantId,
        }
    });
};