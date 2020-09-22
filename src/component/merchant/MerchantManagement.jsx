import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Form, Input, message, Modal, Space, Table} from 'antd';
import {createMerchant, fetchMerchants} from '../../api/merchant';
import './MerchantManagement.less';
import {PlusCircleOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

class MerchantManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            merchants: [],
            merchantPage: 1,
            merchantRows: 10,
            merchantTotal: 0,
            createModalVisible: false,
            createModalLoading: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('商户管理', '入驻商户信息管理');
        const {merchantPage, merchantRows} = this.state;
        this.fetchTableData(merchantPage, merchantRows);
    }

    fetchTableData(page, rows) {
        fetchMerchants(page, rows).then(res => {
            const {list, total} = res;
            const dataSource = list.map(o => {
                o.key = o.id;
                return o;
            });
            this.setState({
                merchants: dataSource,
                merchantTotal: total,
            });
        })
    }

    setTableRows(page, size) {
        this.setState({
            merchantPage: page, merchantRows: size,
        });
        this.fetchTableData(page, size);
    }

    paginationConf() {
        const {merchantPage, merchantTotal, merchantRows} = this.state;
        return {
            current: merchantPage,
            total: merchantTotal,
            pageSize: merchantRows,
            pageSizeOptions: [10, 50, 100],
            showSizeChanger: true,
            onShowSizeChange: (page, size) => this.setTableRows(page, size),
            onChange: (page, rows) => this.fetchTableData(page, rows),
        };
    }

    render() {
        const {merchants, createModalVisible, createModalLoading} = this.state;
        return (
            <div className="merchant-management">
                <Form layout="inline" className="search-form">
                    <Form.Item name="name" label="商户名">
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">搜索</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<PlusCircleOutlined/>}
                                onClick={() => this.showCreateMerchantDialog()}>创建商户</Button>
                    </Form.Item>
                </Form>
                <Table dataSource={merchants} pagination={this.paginationConf()}>
                    <Table.Column title="#" dataIndex="id" width={30} fixed={true}/>
                    <Table.Column title="商户名" dataIndex="name" fixed={true}/>
                    <Table.Column title="登录名" dataIndex="loginName"/>
                    <Table.Column title="权限代码" dataIndex="authorizationCode"/>
                    <Table.Column title="序列号" dataIndex="sn"/>
                    <Table.Column title="操作" render={row => this.renderTableRowOperations(row)}/>
                </Table>
                <Modal title="创建商户"
                       visible={createModalVisible}
                       confirmLoading={createModalLoading}
                       onOk={() => this.submitCreateMerchantForm()}
                       onCancel={() => this.setState({createModalVisible: false})}>
                    <Form ref={form => this.createMerchantForm = form} onFinish={data => this.doCreateMerchant(data)}>
                        <Form.Item name="name" label="商户名" rules={[{required: true, message: '请输入商户名称'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="loginName" label="登录名" rules={[{required: true, message: '请输入登录名'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="password" label="登录密码" rules={[{required: true, message: '请输入登录密码'}]}>
                            <Input.Password/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

    renderTableRowOperations(row) {
        return (<Space>
            <Button type="link" onClick={() => this.setupWechat(row)}>配置公众号</Button>
            <Button type="link" onClick={() => this.appManagement(row)}>应用管理</Button>
        </Space>);
    }

    setupWechat(merchant) {
        const history = this.props.history;
        history.push({
            pathname: `/merchant-management/${merchant.id}/setup-wechat/`
        })
    }

    showCreateMerchantDialog() {
        this.setState({
            createModalVisible: true
        });
    }

    submitCreateMerchantForm() {
        this.setState({
            createModalLoading: true,
        });
        this.createMerchantForm.submit();
    }

    doCreateMerchant(data) {
        createMerchant(data).then(res => {
            this.setState({
                createModalLoading: false,
                createModalVisible: false,
            });
            const {merchantPage, merchantRows} = this.state;
            this.fetchTableData(merchantPage, merchantRows);
            message.success(`商户[${res.name}]创建成功！`);
        }).catch(() => {
            this.setState({
                createModalLoading: false,
            });
        });
    }

    appManagement(merchant) {
        this.props.history.push({
            pathname: '/merchant-apps',
            search: `?merchantId=${merchant.id}`,
        });
    }
}

const component = mapStateAndActions(MerchantManagement);
export default withRouter(component);