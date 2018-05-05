 const menus = [
    { path: '/dashboard/login', text: '首页', icon: 'mobile', },
    {
        path: '/ui', text: 'UI', icon: 'scan',
        sub: [
            {
                path: '/ui/buttons', text: '按钮', icon: '',
                sub: [
                    { path: '/ui/buttons', text: '按钮', icon: '', },
                    { path: '/ui/icons', text: '图标', icon: '', },
                    { path: '/ui/spins', text: '加载中', icon: '', },
                    { path: '/ui/modals', text: '对话框', icon: '', },
                    { path: '/ui/notifications', text: '通知提醒框', icon: '', },
                    { path: '/ui/tabs', text: '标签页', icon: '', },
                    { path: '/ui/banners', text: '轮播图', icon: '', },
                    { path: '/ui/wysiwyg', text: '富文本', icon: '', },
                    { path: '/ui/drags', text: '拖拽', icon: '', },
                    { path: '/ui/gallery', text: '画廊', icon: '', },
                    { path: '/ui/map', text: '地图'},
                ],
            },
            { path: '/ui/icons', text: '图标', icon: '', },
            { path: '/ui/spins', text: '加载中', icon: '', },
            { path: '/ui/modals', text: '对话框', icon: '', },
            { path: '/ui/notifications', text: '通知提醒框', icon: '', },
            { path: '/ui/tabs', text: '标签页', icon: '', },
            { path: '/ui/banners', text: '轮播图', icon: '', },
            { path: '/ui/wysiwyg', text: '富文本', icon: '', },
            { path: '/ui/drags', text: '拖拽', icon: '', },
            { path: '/ui/gallery', text: '画廊', icon: '', },
            { path: '/ui/map', text: '地图'},
        ],
    },
    {
        path: '/animation', text: '动画', icon: 'rocket',
        sub: [
            { path: '/animation/basicAnimations', text: '基础动画', icon: '', },
            { path: '/animation/exampleAnimations', text: '动画案例', icon: '', },
        ],
    },
    {
        path: '/table', text: '表格', icon: 'copy',
        sub: [
            { path: '/table/basicTable', text: '基础表格', icon: '', },
            { path: '/table/advancedTable', text: '高级表格', icon: '', },
            { path: '/table/asynchronousTable', text: '异步表格', icon: '', },
        ],
    },
    {
        path: '/form', text: '表单', icon: 'edit',
        sub: [
            { path: '/form/basicForm', text: '基础表单', icon: '', },
        ],
    },
    {
        path: '/chart', text: '图表', icon: 'area-chart',
        sub: [
            { path: '/chart/echarts', text: 'echarts', icon: '', },
            { path: '/chart/recharts', text: 'recharts', icon: '', },
        ],
    },
    {
        path: '/sub4', text: '页面', icon: 'switcher',
        sub: [
            { path: '/login', text: '登录', icon: '', },
            { path: '/404', text: '404', icon: '', },
        ],
    },
    {
        path: '/auth', text: '权限管理', icon: 'safety',
        sub: [
            { path: '/auth/basic', text: '基础演示', icon: '', },
            { path: '/auth/routerEnter', text: '路由拦截', icon: '', },
        ],
    },
    {
        path: '/cssModule', text: 'cssModule', icon: 'star',
    },
];

 export default menus;