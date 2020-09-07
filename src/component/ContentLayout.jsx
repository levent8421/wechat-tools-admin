import React, {Component} from 'react';
import {Layout, message, Modal, PageHeader, Typography} from "antd";
import './ContentLayout.less';
import ContentHeader from './ContentHeader';
import ContentMenu from './ContentMenu';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {currentAmdin} from '../api/admin';
import {setToken, toggleLoginDialog} from '../store/actionCreators';
import {renderRoutes} from 'react-router-config';
import {routes} from '../router/routes';

const {Sider, Header, Footer, Content} = Layout;
const {Text} = Typography;
const mapState2Props = (state, props) => {
    return {
        ...props,
        webToken: state.webToken,
        admin: state.admin,
        loginDialogVisible: state.loginDialogVisible,
        header: state.header,
    };
};
const mapAction2Props = (dispatch, props) => {
    return {
        ...props,
        setToken: (...args) => dispatch(setToken(...args)),
        toggleLoginDialog: (...args) => dispatch(toggleLoginDialog(...args)),
    };
};

class ContentLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDialogVisible: true,
        };
    }

    componentDidMount() {
        const {webToken} = this.props;
        if (!webToken) {
            message.warn('未登录，请先登录！');
            this.props.history.push({pathname: '/login'});
        } else {
            this.fetchAdminInfo(admin => {
                this.props.setToken(admin, webToken);
            });
        }
    }

    render() {
        const {header} = this.props;
        return (
            <>
                <Layout className="content-layout">
                    <Sider>
                        <ContentMenu/>
                    </Sider>
                    <Layout>
                        <Header>
                            <ContentHeader/>
                        </Header>
                        <Content>
                            <PageHeader title={header.title} subTitle={header.subTitle}/>
                            {renderRoutes(routes)}
                        </Content>
                        <Footer>
                            Wechat Tools Admin, <Text type="success">Author: Levent</Text>
                        </Footer>
                    </Layout>
                </Layout>
                <Modal title="登录失效或权限不足"
                       visible={this.props.loginDialogVisible}
                       onOk={() => this.reLogin()}
                       onCancel={() => this.props.toggleLoginDialog(false)}>
                    登录失效或权限不足，需重新登录
                </Modal>
            </>
        );
    }

    fetchAdminInfo(cb) {
        const {admin} = this.props;
        if (admin) {
            cb(admin);
        } else {
            currentAmdin().then(res => {
                cb(res);
            });
        }
    }

    reLogin() {
        this.props.setToken(null, null);
        this.props.toggleLoginDialog(false);
        this.props.history.push({pathname: '/login'});
    }
}

let component = connect(mapState2Props, mapAction2Props)(ContentLayout);
component = withRouter(component);
export default component;
