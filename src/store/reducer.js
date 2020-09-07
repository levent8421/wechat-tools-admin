import {ACTION_LOGIN, ACTION_SET_TITLE, ACTION_SET_TOKEN, ACTION_TOGGLE_LOGIN_DIALOG} from './actionTypes';

const TOKEN_STORAGE_NAME = 'wechat_tools.web_token';
const getToken = () => {
    return sessionStorage.getItem(TOKEN_STORAGE_NAME);
};
const setToken = token => {
    sessionStorage.setItem(TOKEN_STORAGE_NAME, token);
};
const defaultState = {
    admin: null,
    webToken: getToken(),
    loginDialogVisible: false,
    header: {
        title: '',
        subTitle: '',
    }
};

const actionTable = {};
const registerReducer = (type, reducer) => {
    actionTable[type] = reducer;
};
registerReducer(ACTION_LOGIN, (state, action) => {
    console.log(state, action);
    setToken('');
});
registerReducer(ACTION_SET_TOKEN, (state, action) => {
    const {webToken} = action.data;
    setToken(webToken);
    return {
        ...state,
        ...action.data,
    };
});
registerReducer(ACTION_TOGGLE_LOGIN_DIALOG, (state, action) => {
    return {
        ...state,
        loginDialogVisible: action.data.loginDialogVisible,
    };
});
registerReducer(ACTION_SET_TITLE, (state, action) => {
    return {
        ...state,
        header: {
            ...action.data
        }
    };
});
export default (state = defaultState, action) => {
    const type = action.type;
    if (type in actionTable) {
        const handler = actionTable[type];
        return handler(state, action);
    }
    return state;
}
