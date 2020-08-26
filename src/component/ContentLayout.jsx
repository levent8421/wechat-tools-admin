import React, {Component} from 'react';
import {Layout, Typography} from "antd";
import './ContentLayout.less';
import ContentHeader from './ContentHeader';
import ContentMenu from './ContentMenu';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import MerchantManagement from './merchant/MerchantManagement';
import MerchantStatistics from './merchant/MerchantStatistics';
import AdminManagement from './admin/AdminManagement';
import history from '../router/History';

const {Sider, Header, Footer, Content} = Layout;
const {Text} = Typography;

class ContentLayout extends Component {
    render() {
        return (
            <Router history={history}>
                <Layout className="content-layout">
                    <Sider>
                        <ContentMenu/>
                    </Sider>
                    <Layout>
                        <Header>
                            <ContentHeader/>
                        </Header>
                        <Content>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/merchant-management" component={MerchantManagement}/>
                                <Route exact path="/merchant-statistics" component={MerchantStatistics}/>
                                <Route exact path="/admin-management" component={AdminManagement}/>
                            </Switch>
                        </Content>
                        <Footer>
                            Wechat Tools Admin, <Text type="success">Author: Levent</Text>
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default ContentLayout;
