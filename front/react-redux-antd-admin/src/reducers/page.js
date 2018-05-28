/**
 * 通用的分页reducer
 */
import { combineReducers } from 'redux'
// 控制加载loading显示
const loading = (state = false, action) => {
    switch(action.type){
        case 'REQUEST':
            return action.loading;
        default:
            return state;
    }
}

// 数据
const data = (state = [], action) => {
    switch (action.type){
        case 'RECEIVE_DATA':
            return action.data;
        default:
            return state;
    }
}

// 分页器
const pager = (state = {}, action) => {
    switch (action.type){
        case 'RECEIVE_DATA':
            return action.pager;
        default:
            return state;
    }
}

// 当前选中的key
const selectedRowKeys = (state = [], action) => {
    switch (action.type){
        case 'CHANGE_CHECKBOX':
            return action.selectedRowKeys;
        default:
            return state;
    }
}

// 当前操作的对象
const obj = (state = {}, action) => {
    switch (action.type){
        case 'CHANGE_CHECKBOX':
            // 当用户选择一行,在取消选择时,objs里没有东西,objs[0]为null, react不允许返回undefined,所以我们需要显示的返回一个null值
            return action.objs[0] == null ? {} : action.objs[0];
        case 'CHANGE_OBJ':
            // 为对象新增值
            return {...state, ...action.obj}
            // 打开modal时可以传入想渲染的obj
        case 'OPEN_MODAL':
                return action.obj
        default:
            return state;
    }
}


export default combineReducers(
    {loading,data,pager, selectedRowKeys, obj}
)

