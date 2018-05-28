import MyTable from './MyTable'


/**
 * 一个校验用户权限的组件
 * @param component 需要渲染的组件
 * @param perms 用户权限  类似 user-select
 * @returns {*}
 * @constructor
 */
const HasPermission = ({component, perms}) => {
    if(localStorage.getItem("perms").indexOf(perms) >= 0){
        return component;
    }
    return null;
}


export {
    MyTable,
    HasPermission
}