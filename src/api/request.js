import {httpRequest} from '../util/httpUtils';
import {message} from 'antd'
import store from '../store';
import {toggleLoginDialog} from '../store/actionCreators';

const showLoading = () => {
    return message.loading('Loading...', 0)
};
const hideLoading = (hide) => {
    hide();
};
const showError = msg => {
    message.warn(msg);
};
const showLoginModal = () => {
    store.dispatch(toggleLoginDialog(true));
};

export function request(options) {
    const state = store.getState();
    const {webToken} = state;
    const showLoadingToast = !options.hideLoading;
    let hideLoadingFunc;
    if (showLoadingToast) {
        hideLoadingFunc = showLoading();
    }
    return new Promise((resolve, reject) => {
        const headers = options.headers || {};
        headers['X-Token'] = webToken;
        options.headers = headers;
        httpRequest(options)
            .then(res => {
                if (showLoadingToast) {
                    hideLoading(hideLoadingFunc);
                }
                if (res.status !== 200) {
                    showError(`Http Response Status:${res.status}`);
                    reject(res);
                    return;
                }
                const body = res.data;
                if (body.code !== 200) {
                    showError(`Error [${body.code}]:${body.msg}`);
                    if (body.code === 401) {
                        showLoginModal(res);
                    }
                    reject(res);
                    return;
                }
                resolve(body.data);
            }).catch(err => {
                if (showLoadingToast) {
                    hideLoading(hideLoadingFunc);
                }
                const errStr = err.toString();
                showError(errStr);
                reject(err);
            }
        );
    })
}
