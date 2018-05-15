import fetch from '../utils/fetchUtils'
const requestUser = (loading) => {
    return {
        type: 'REQUEST_USER',
        loading: loading
    }
}

const receiveUser = (data,  pagination) => {
    return {
        type: 'RECEIVE_USER',
        data: data,
        pagination: pagination
    }
}


export const getUsers = (pagination, params) => (dispatch, state) => {
    dispatch(requestUser(true));
    fetch('/user/list', {...pagination, ...params}, r => {
        dispatch(receiveUser(r.data.data.result, {...pagination, total: r.data.data.total}));
    })
    dispatch(requestUser(false));
}