import {fetchPost} from '../utils/fetchUtils'

/**
 * 请求开始
 * @param loading
 * @returns {{type: string, loading: *}}
 */
const requestUser = (loading) => {
    return {
        type: 'REQUEST_USER',
        loading: loading
    }
}

/**
 * 接收到数据后的方法
 * @param data
 * @param pagination
 * @returns {{type: string, data: *, pagination: *}}
 */
const receiveUser = (data,  pagination) => {
    return {
        type: 'RECEIVE_USER',
        data: data,
        pagination: pagination
    }
}

/**
 * 异步请求
 * @param pagination
 * @param params
 */
export const getUsers = (pagination = {defaultPageSize: 5, current: 1, pageSize: 5}, params = {}) => (dispatch, state) => {
    // 开始请求数据
    dispatch(requestUser(true));
    // 请求成功
    fetchPost('/user/list', {...pagination, ...params}, r => {
        // 更新状态
        dispatch(receiveUser(r.data.result, {...pagination, total: r.data.total}));
        // 结束请求数据
        dispatch(requestUser(false));
    })
}