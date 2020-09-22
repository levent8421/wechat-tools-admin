import {request} from './request';

export const updateInviteFollowAppState = (id, state) => {
    return request({
        url: `/api/token/invite-follow-app/${id}/state`,
        method: 'post',
        data: {
            state: state,
        }
    });
};