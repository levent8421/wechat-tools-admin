import Home from '../component/Home';
import NotFound from '../component/NotFound';
import MerchantManagement from '../component/merchant/MerchantManagement';
import SetupMerchantWechat from '../component/merchant/SetupMerchantWechat';
import MerchantStatistics from '../component/merchant/MerchantStatistics';
import AdminManagement from '../component/admin/AdminManagement';
import Login from '../component/login/Login';

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
        path: '/login',
        exact: true,
        component: Login,
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
    {
        path: '/merchant-statistics',
        exact: true,
        component: MerchantStatistics,
    },
    {
        path: '/admin-management',
        exact: true,
        component: AdminManagement,
    },
];
export {routes};
