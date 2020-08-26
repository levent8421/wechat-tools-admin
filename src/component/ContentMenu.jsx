import React, {Component} from 'react';
import {
    AreaChartOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    OrderedListOutlined,
    ShopOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Avatar, Button, Menu} from 'antd';
import './ContentMenu.less';
import {withRouter} from 'react-router-dom';

const MenuItem = Menu.Item;
const {SubMenu} = Menu;
const menuKeyPathTable = {
    'home': '/',
    'merchant-management': '/merchant-management',
    'merchant-statistics': '/merchant-statistics',
    'admin-management': '/admin-management',
};

class ContentMenu extends Component {
    render() {
        return (
            <div className="content-menu">
                <Button icon={<MenuFoldOutlined/>} type="primary"/>
                <Avatar icon={<UserOutlined/>} size="large" className="avatar"/>
                <Menu theme="dark" mode="inline" onClick={item => this.onMenuClick(item)}
                      defaultSelectedKeys={['home']}>
                    <MenuItem key="home" icon={<HomeOutlined/>}>主页</MenuItem>
                    <SubMenu title="商户" icon={<ShopOutlined/>}>
                        <MenuItem key="merchant-management" icon={<OrderedListOutlined/>}>商户管理</MenuItem>
                        <MenuItem key="merchant-statistics" icon={<AreaChartOutlined/>}>统计分析</MenuItem>
                    </SubMenu>
                    <MenuItem key="admin-management" icon={<UserOutlined/>}>管理员</MenuItem>
                </Menu>
            </div>
        );
    }

    onMenuClick(item) {
        const key = item.key;
        const {history} = this.props;
        let path;
        if (key in menuKeyPathTable) {
            path = menuKeyPathTable[key];
        } else {
            path = '/404';
        }
        history.push({pathname: path});
    }
}

export default withRouter(ContentMenu);
