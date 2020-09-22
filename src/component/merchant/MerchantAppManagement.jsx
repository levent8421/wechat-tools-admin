import React, {Component} from 'react';
import {formatSearch} from '../../util/pathUtils';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Collapse, message, Modal, Select, Space, Table} from 'antd';
import {fetchAppsByMerchant} from '../../api/merchantApp';
import {asInviteFollowAppStateText} from '../../util/convert';
import {updateInviteFollowAppState} from '../../api/inviteFollowApp';

const INVITE_FOLLOW_APP_STATES = [
    {
        text: '待审核',
        value: 0x01,
    },
    {
        text: '已上线',
        value: 0x02,
    },
    {
        text: '拒绝',
        value: 0x03,
    },
    {
        text: '已结束',
        value: 0x04,
    },
];

class MerchantAppManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteFollowApps: [],
            editInviteFollowApp: {},
            inviteFollowAppStateModalVisible: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('商户APP管理', 'App Setting!');
        const {search} = this.props.location;
        const params = formatSearch(search);
        this.merchantId = params.merchantId;
        this.refreshApps();
    }

    refreshApps() {
        fetchAppsByMerchant(this.merchantId).then(res => {
            for (let app of res.inviteFollowApps) {
                app.key = app.id;
            }
            this.setState({
                ...res,
            });
        });
    }

    showInviteFollowAppStateModal(app, show) {
        this.setState({
            inviteFollowAppStateModalVisible: show,
            editInviteFollowApp: app,
        });
    }

    renderInviteFollowAppOperation(app) {
        return (<Space>
            <Button type="link" onClick={() => this.showInviteFollowAppStateModal(app, true)}>设置状态</Button>
        </Space>);
    }

    onInviteFollowAppStateChanged(state) {
        const {editInviteFollowApp} = this.state;
        this.setState({
            editInviteFollowApp: {
                ...editInviteFollowApp,
                state: state,
            }
        });
    }

    doUpdateInviteFollowAppState() {
        const {id, state} = this.state.editInviteFollowApp;
        updateInviteFollowAppState(id, state).then(res => {
            this.refreshApps();
            message.success(`关注抽奖APP[${res.title}]状态已更新！`);
            this.showInviteFollowAppStateModal({}, false);
        });
    }

    render() {
        const {inviteFollowApps, inviteFollowAppStateModalVisible, editInviteFollowApp} = this.state;
        return (
            <div className="app-management">
                <Collapse defaultActiveKey={['invite-app']}>
                    <Collapse.Panel header="关注邀请APP" key="invite-app">
                        <Table dataSource={inviteFollowApps} pagination={false}>
                            <Table.Column title="#" width={50} dataIndex="id"/>
                            <Table.Column title="标题" dataIndex="title"/>
                            <Table.Column title="副标题" dataIndex="subtitle"/>
                            <Table.Column title="状态" dataIndex="state"
                                          render={value => asInviteFollowAppStateText(value)}/>
                            <Table.Column title="操作" render={(_, row) => this.renderInviteFollowAppOperation(row)}/>
                        </Table>
                    </Collapse.Panel>
                </Collapse>
                <Modal title="设置APP状态"
                       closable={false}
                       maskClosable={false}
                       visible={inviteFollowAppStateModalVisible}
                       onCancel={() => this.showInviteFollowAppStateModal({}, false)}
                       onOk={() => this.doUpdateInviteFollowAppState()}
                       okText="确认更改"
                       cancelText="取消更改">
                    <Space>
                        <b>更新APP[{editInviteFollowApp.title}]状态为:</b>
                        <Select value={editInviteFollowApp.state}
                                onChange={state => this.onInviteFollowAppStateChanged(state)}>
                            {
                                INVITE_FOLLOW_APP_STATES.map(state => (
                                    <Select.Option key={state.value} value={state.value}>{state.text}</Select.Option>))
                            }
                        </Select>
                    </Space>
                </Modal>
            </div>
        );
    }
}

export default mapStateAndActions(MerchantAppManagement);