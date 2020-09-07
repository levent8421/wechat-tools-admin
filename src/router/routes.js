import Home from '../component/Home';
import NotFound from '../component/NotFound';
import MerchantManagement from '../component/merchant/MerchantManagement';
import SetupMerchantWechat from '../component/merchant/SetupMerchantWechat';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/404',
        exact: true,
        component: NotFound,
    },
    {
        path: '/merchant-management',
        exact: true,
        component: MerchantManagement,
    },
    {
        path: '/merchant-management/:merchantId/setup-wechat',
        exact: true,
        component: SetupMerchantWechat,
    },
];
export {routes};