import React, {Component} from 'react';
import {PageHeader, Result} from 'antd';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <PageHeader title="主页" subTitle="微信公众号工具"/>
                <Result status="success" title="WechatTools" subTitle="Develop by levent!"/>
            </div>
        );
    }
}

export default Home;
