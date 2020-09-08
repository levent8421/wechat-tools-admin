import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {bindWechatAppId, requireById} from '../../api/merchant';
import './SetupMerchantWechat.less';
import {Alert, Button, Card, Form, Input, message, Modal, Select, Space} from 'antd';
import {applyTokenFetcherConfig, fetchConfigByMerchant} from '../../api/tokenFetcherStrategy';

const WechatTokenFetchStrategies = [
    {
        code: 1,
        name: '标准微信接口'
    },
    {
        code: 2,
        name: 'HTTP JSON API (未实现)',
        disabled: true
    },
    {
        code: 3,
        name: 'HTTP XML API (未实现)',
        disabled: true
    }
];

const FetcherConfigRenderTable = {
    1: () => {
        return (<>
            <Alert type="success" message="该模式无需额外配置参数"/>
        </>);
    }
};

class SetupMerchantWechat extends Component {
    constructor(props) {
        super(props);
        const {merchantId} = props.match.params;
        this.state = {
            merchantId: merchantId,
            merchant: {},
            selectedStrategyCode: -1,
            strategy: {},
            showBindWechatAppModal: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('微信公众号配置', '配置商户微信公众号');
        this.fetchMerchantInfo();
        fetchConfigByMerchant(this.state.merchantId).then(res => {
            res.config = JSON.parse(res.configJson);
            const formInitValue = {
                ...res.config,
                strategyCode: res.strategyCode,
            };
            this.form.setFieldsValue(formInitValue);
            this.setState({strategy: res, selectedStrategyCode: res.strategyCode});
        });

    }

    fetchMerchantInfo() {
        requireById(this.state.merchantId).then(res => {
            this.setState({
                merchant: res,
            })
        })
    }

    renderTokenFetcherConfigFormItems() {
        const {selectedStrategyCode, merchant, strategy} = this.state;
        if (selectedStrategyCode in FetcherConfigRenderTable) {
            return FetcherConfigRenderTable[selectedStrategyCode](strategy, merchant);
        }
        return (<Alert type="warning" message="请选择正确的令牌获取策略"/>);
    }

    showBindWechatAppModal(show) {
        this.setState({showBindWechatAppModal: show});
    }

    doBindWechatApp() {
        if (!this.bindingAppId) {
            message.warn('请输入正确的APP_ID');
            return;
        }
        if (!this.bindingSecret) {
            message.warn('请输入正确的SECRET');
            return;
        }
        const appId = this.bindingAppId;
        const secret = this.bindingSecret;
        const {merchant} = this.state;
        bindWechatAppId(merchant.id, {appId, secret}).then(res => {
            this.setState({merchant: res});
            message.success('绑定成功');
            this.showBindWechatAppModal(false);
        });
    }

    render() {
        const _this = this;
        const {merchant, showBindWechatAppModal} = this.state;
        return (
            <div className="setup-wechat">
                <Card size="large" title={merchant.name} extra={merchant.sn}>
                    <p>商户登录名： {merchant.loginName}</p>
                    <p>权限代码： {merchant.authorizationCode}</p>
                    <p>创建时间： {merchant.createTime}</p>
                    <p>上次更新时间： {merchant.updateTime}</p>
                    <p>微信公众号AppID：{merchant.wechatAppId}</p>
                    <Space>
                        微信公众号SECRET：
                        <span>{merchant.wechatSecret}</span>
                        <Button type="primary"
                                onClick={() => this.showBindWechatAppModal(true)}>
                            绑定公众号
                        </Button>
                    </Space>
                </Card>
                <div className="form-wrapper">
                    <Form name="setup-wechat" onFinish={options => this.applyWechatConfig(options)}
                          ref={form => this.form = form}>
                        <Form.Item
                            name="strategyCode"
                            label="微信令牌获取策略"
                            rules={[{required: '请选择令牌获取策略'}]}>
                            <Select onChange={e => this.onStrategyChange(e)} placeholder="请选择">
                                {
                                    WechatTokenFetchStrategies.map(sty => (
                                        <Select.Option key={sty.code}
                                                       value={sty.code}
                                                       disabled={sty.disabled}>
                                            {sty.name}
                                        </Select.Option>))
                                }
                            </Select>
                        </Form.Item>
                        {
                            _this.renderTokenFetcherConfigFormItems()
                        }
                        <Form.Item>
                            <Button type="primary" htmlType="submit">使用配置</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Modal visible={showBindWechatAppModal} title="绑定公众号" onOk={() => this.doBindWechatApp()}
                       onCancel={() => this.showBindWechatAppModal(false)}>
                    <Form name="bind-wechat-app">
                        <Form.Item name="appId" label="APP_ID">
                            <Input onChange={e => this.bindingAppId = e.target.value}/>
                        </Form.Item>
                        <Form.Item name="secret" label="SECRET">
                            <Input onChange={e => this.bindingSecret = e.target.value}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

    applyWechatConfig(options) {
        const {merchantId} = this.state;
        applyTokenFetcherConfig(merchantId, options).then(() => {
            message.success('令牌获取策略配置已生效！');
        });
    }

    onStrategyChange(code) {
        this.setState({
            selectedStrategyCode: code,
        })
    }
}

export default mapStateAndActions(SetupMerchantWechat);