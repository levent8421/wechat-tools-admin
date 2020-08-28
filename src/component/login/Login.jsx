import React, {Component} from 'react';
import './Login.less';
import {Button, Card, Form, Input, message} from 'antd';
import {login} from '../../api/admin';
import {connect} from 'react-redux';
import {setToken} from '../../store/actionCreators';
import {withRouter} from 'react-router-dom';

const mapAction2Props = (dispatch, props) => {
    return {
        ...props,
        setToken: (...args) => dispatch(setToken(...args))
    };
};
const mapState2Props = (state, props) => {
    return {
        ...props,
        webToken: state.webToken,
        admin: state.admin,
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        if (this.props.webToken) {
            message.success('已登录,跳转到主页...');
            this.props.history.push({
                pathname: '/'
            });
            return;
        }
        this.setState({
            show: true,
        });
    }

    render() {
        const {show} = this.state;
        const mainClassList = ['login'];
        if (show) {
            mainClassList.push('show');
        }
        const mainClass = mainClassList.join(' ');
        return (
            <div className={mainClass}>
                <div className="form-wrapper">
                    <Card title="管理员登录">
                        <Form name="login" initialValues={{loginName: '', password: ''}}
                              onFinish={e => this.formLogin(e)}
                              onFinishFailed={() => message.error('请检查输入内容！')}>
                            <Form.Item label="账户" name="loginName" rules={[{required: true, message: '请输入账户名!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="口令" name="password" rules={[{required: true, message: '请输入密码！!'}]}>
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }

    formLogin(e) {
        login(e).then(res => {
            const {account, token} = res;
            this.props.setToken(account, token);
            message.success('登录成功，跳转到主页！');
            this.props.history.push({pathname: '/'});
        });
    }
}

let component = connect(mapState2Props, mapAction2Props)(Login);
component = withRouter(component);
export default component;
