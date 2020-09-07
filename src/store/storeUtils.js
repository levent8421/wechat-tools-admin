import {setTitle, setToken, toggleLoginDialog} from './actionCreators';
import {connect} from 'react-redux';

const mapAllState2Props = (state, props) => {
    return {
        ...props,
        ...state,
    };
};
const mapAllAction2Props = (dispatch, props) => {
    return {
        ...props,
        setToken: (...args) => dispatch(setToken(...args)),
        setTitle: (...args) => dispatch(setTitle(...args)),
        toggleLoginDialog: (...args) => dispatch(toggleLoginDialog(...args)),
    };
};

export const mapStateAndActions = component => {
    return connect(mapAllState2Props, mapAllAction2Props)(component);
};
