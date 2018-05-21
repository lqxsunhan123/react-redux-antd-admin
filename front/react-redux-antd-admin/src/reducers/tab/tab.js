import {history} from '../../constants/config'

/**
 * 选项卡数组
 * @param state
 * @param action
 * @returns {*}
 */
export const tabs = (state=[{title: '首页', content: '', key: '/'}], action) => {
    switch (action.type){
        case 'ADD_TAB':
            // 如果tab已经存在，则设置起为activity,如果不存在，add后再设置其为activity
            // state.map(t => {
            //
            // })
            return [...state, {title: action.text, content: '', key: action.key}]
        case 'REMOVE_TAB':
            console.log(state);
            return action.tabs;
        default:
            return state;
    }
}
/**
 * 当前的活动选项卡
 * @param state
 * @param action
 * @returns {*}
 */
export const activityKey = (state='/', action) => {
    switch (action.type){
        case 'TOGGLE_TAB':
            // antd  tab只能接受字符串的activityKey
            let path = action.activityKey.toString();
            history.replace(path)
            return action.activityKey.toString();
        default:
            return state;
    }
}

/**
 * 控制菜单栏的切换
 * @param state
 * @param action
 * @returns {boolean}
 */
export const collapsed = (state = false, action) => {
    switch (action.type){
        case 'TOGGLE':
            return !state
        default:
            return state;
    }
}
