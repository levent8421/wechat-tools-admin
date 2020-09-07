import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {requireById} from '../../api/merchant';
import './SetupMerchantWechat.less';
import {Alert, Button, Card, Form, Input, message, Select} from 'antd';
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
            <Form.Item name="appId" label="APP_ID"
                       rules={[{required: '请输入公众号app id'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="secret" label="SECRET"
                       rules={[{required: '请输入公众号secret'}]}>
                <Input/>
            </Form.Item>
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

    render() {
        const _this = this;
        const {merchant} = this.state;
        return (
            <div className="setup-wechat">
                <Card size="large" title={merchant.name} extra={merchant.sn}>
                    <p>商户登录名： {merchant.loginName}</p>
                    <p>权限代码： {merchant.authorizationCode}</p>
                    <p>创建时间： {merchant.createTime}</p>
                    <p>上次更新时间： {merchant.updateTime}</p>
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