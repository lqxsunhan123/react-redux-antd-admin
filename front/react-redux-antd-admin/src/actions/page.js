import {fetchPost} from '../utils/fetchUtils'
import {config} from '../constants/config'
/**
 * 请求开始
 * @param loading
 * @returns {{type: string, loading: *}}
 */
const request = (loading) => {
    return {
        type: 'REQUEST',
        loading: loading
    }
}

/**
 * 接收到数据后的方法
 * @param data
 * @param pager
 * @returns {{type: string, data: *, pagination: *}}
 */
const receiveData = (data,  pager) => {
    return {
        type: 'RECEIVE_DATA',
        data: data,
        pager: pager
    }
}

/**
 * 异步请求表格数据
 * @param url
 * @param pager 分页器,不传入时为默认分页器，如果传入false,则不分页
 * @param params
 */
export const requestData = (url = '', pager = config.pager, params = {}) => (dispatch, state) => {
    // 开始请求数据
    dispatch(request(true));
    // 请求成功
    fetchPost(url, {...pager, ...params}, r => {
        // 更新状态
        dispatch(receiveData(!pager ? r.data : r.data.result, {...pager, total: r.data.total}));
        // 结束请求数据
        dispatch(request(false));
    })
}

/**
 * 选择/反选时候的action
 * @param selectedRowKeys  当前选择的key
 * @param selectedRows     当前选择的所有行
 * @param defaultObj       当取消所有选择时,为了后面表单里取值，，类似  obj.type  不报错，需要给一个默认的对象结构
 * @returns {{type: string, selectedRowKeys: *, objs: *, defaultObj: {}}}
 */
export const changeCheckBox = (selectedRowKeys, selectedRows) => {
    return {
        type: 'CHANGE_CHECKBOX',
        selectedRowKeys: selectedRowKeys,
        objs: selectedRows
    }
}

/**
 * 表单中对象的字段发生变化时
 * @param obj
 * @returns {{type: string, obj: {}}}
 */
export const changeObj = (obj = {}) => {
    return{
        type: 'CHANGE_OBJ',
        obj: obj
    }
}

/**
 * 打开新增或者编辑弹框时
 * @param flag
 * @param obj
 * @returns {{type: string, obj: *, flag: string}}
 */
export const openModal = (obj) => {
    return{
        type: 'OPEN_MODAL',
        obj: obj
    }
}
