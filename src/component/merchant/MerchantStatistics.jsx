import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import './MerchantStatistics.less';
import {Alert} from 'antd';

class MerchantStatistics extends Component {
    componentDidMount() {
        this.props.setTitle('商户统计分析', '入驻商户统计分析');
    }

    render() {
        return (
            <div className="merchant-statistics">
                Merchant Statistics
                <Alert type="success" message="开发中"/>
            </div>
        );
    }
}

export default mapStateAndActions(MerchantStatistics);
