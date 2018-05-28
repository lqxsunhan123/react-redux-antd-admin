
const initState = {
  resource:{

  },
  user: {

  },
  tab: {
    // 当前选择的tab
    activityKey: '/',
    // 控制菜单的收缩
    collapsed: false,
    tabs: [
      {
        title: '首页',
        content: '',
        key: '/'
      }
    ]
  },
  page: {
    // 请求时的loading
    loading: false,
    // 数据
    data: [],
    // 分页器,为false时不分页
    pager: {defaultPageSize:5, current: 1, pageSize: 5},
    selectedRowKeys:[],
    obj:{}
  }
}