import React, {Component} from 'react';
import {Result} from 'antd';
import {setTitle} from '../store/actionCreators';
import {connect} from 'react-redux';

const mapAction2Props = (dispatch, props) => {
    return {
        ...props,
        setTitle: (...args) => dispatch(setTitle(...args)),
    };
};

class Home extends Component {
    componentDidMount() {
        this.props.setTitle('主页', '微信公众号推广工具');
    }

    render() {
        return (
            <div className="home">
                <Result status="success" title="WechatTools" subTitle="Develop by levent!"/>
            </div>
        );
    }
}

export default connect(null, mapAction2Props)(Home);
