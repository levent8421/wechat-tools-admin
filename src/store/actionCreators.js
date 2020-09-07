import {ACTION_SET_TITLE, ACTION_SET_TOKEN, ACTION_TOGGLE_LOGIN_DIALOG} from './actionTypes';

export const setToken = (account, token) => {
    return {
        type: ACTION_SET_TOKEN,
        data: {
            admin: account,
            webToken: token,
        }
    };
};
export const toggleLoginDialog = show => {
    return {
        type: ACTION_TOGGLE_LOGIN_DIALOG,
        data: {
            loginDialogVisible: show,
        }
    };
};

export const setTitle = (title, subTitle) => {
    return {
        type: ACTION_SET_TITLE,
        data: {
            title,
            subTitle,
        }
    };
};
