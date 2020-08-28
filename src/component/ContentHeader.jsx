import React, {Component} from 'react';
import './ContentHeader.less';
import {Avatar, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

const {SubMenu} = Menu;
const mapState2Props = (state, props) => {
    return {
        ...props,
        admin: state.admin,
    };
};

class ContentHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const admin = this.props.admin || {name: '未登录'};
        return (
            <div className="content-header">
                <span className="banner">WechatTools</span>
                <Menu mode="horizontal" className="menu" theme="dark">
                    <SubMenu title="商户配置">
                        <Menu.ItemGroup title="支付配置">
                            <Menu.Item>微信商户号配置</Menu.Item>
                            <Menu.Item>模板订单配置</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="商户配置">
                            <Menu.Item>公众号配置</Menu.Item>
                            <Menu.Item>页面配置</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="qa">
                        常见问题
                    </Menu.Item>
                    <Menu.Item key="about">
                        关于
                    </Menu.Item>
                </Menu>
                <div className="account">
                    <span className="name">{admin.name}</span>
                    <Avatar icon={<UserOutlined/>}/>
                </div>
            </div>
        );
    }
}

export default connect(mapState2Props, null)(ContentHeader);
