import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Form, Input, message, Modal, Space, Table} from 'antd';
import './AdminManagement.less';
import {PlusCircleOutlined} from '@ant-design/icons';
import {createAdmin, deleteAdmin, fetchAdminList} from '../../api/admin';

class AdminManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminList: [],
            showCreateModal: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('管理员账户管理', '管理系统管理员');
        this.refreshAdminList();
    }

    showCreateModal(show) {
        this.setState({showCreateModal: show});
    }

    refreshAdminList() {
        fetchAdminList().then(res => {
            for (let row of res) {
                row.key = row.id;
            }
            this.setState({adminList: res});
        })
    }

    renderTableOperations(text, row) {
        return (<Space>
            <Button type="link" onClick={() => this.deleteAdmin(row)}>删除</Button>
        </Space>)
    }

    deleteAdmin(admin) {
        Modal.confirm({
            title: '删除管理员账户？',
            content: `确认删除${admin.name}?`,
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
                this.doDeleteAdmin(admin.id);
            }
        });
    }

    doDeleteAdmin(adminId) {
        deleteAdmin(adminId).then(() => {
            message.success('管理员删除成功');
            this.refreshAdminList()
        });
    }

    submitCreateAdminForm() {
        this.createAdminForm.submit();
    }

    doCreateAdmin(data) {
        createAdmin(data).then(res => {
            this.refreshAdminList();
            message.success(`账户${res.name}创建成功!`)
            this.showCreateModal(false);
        });
    }

    render() {
        const {adminList, showCreateModal} = this.state;
        return (
            <div className="admin-management">
                <Form layout="inline">
                    <Form.Item name="searchName" label="账户名">
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<PlusCircleOutlined/>}
                                onClick={() => this.showCreateModal(true)}>
                            新增管理员
                        </Button>
                    </Form.Item>
                </Form>
                <div className="table-wrapper">
                    <Table dataSource={adminList}>
                        <Table.Column title="#" dataIndex="id"/>
                        <Table.Column title="账户名" dataIndex="name"/>
                        <Table.Column title="登录名" dataIndex="loginName"/>
                        <Table.Column title="权限" dataIndex="authorizationStr"/>
                        <Table.Column title="创建时间" dataIndex="createTime"/>
                        <Table.Column title="更新时间" dataIndex="updateTime"/>
                        <Table.Column title="操作"
                                      key="operations"
                                      render={(text, row, index) => this.renderTableOperations(text, row, index)}/>
                    </Table>
                </div>
                <Modal title="创建管理员" visible={showCreateModal} onCancel={() => this.showCreateModal(false)}
                       onOk={() => this.submitCreateAdminForm()}>
                    <Form ref={form => this.createAdminForm = form} onFinish={data => this.doCreateAdmin(data)}>
                        <Form.Item name="name" label="账户名" rules={[{required: true, message: '请输入账户名'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="loginName" label="登录名" rules={[{required: true, message: '请输入登录名'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="password" label="密码" rules={[{required: true, message: '请输入密码'}]}>
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStateAndActions(AdminManagement);
