import {Modal} from 'antd';
import {fetchPost} from './fetchUtils'
const confirm = Modal.confirm;

/**
 * 在表格中操作时,应至少选择一行的确认方法
 * @param selectedRowKeys
 * @param handle
 * @returns {boolean}
 */
const checkSelectedRows = (selectedRowKeys, handle = () => {}) => {
    if (selectedRowKeys.length == 0) {
        alert("你没有选择任何行");
        return false;
    } else {
        handle();
    }
    return true;
}

/**
 * 用于表格中选择行数的判断,编辑时只能选择一行
 * @param selectedRowKeys
 * @returns {boolean}
 */
const checkSingleRows = (selectedRowKeys, handle) => {
    let flag = checkSelectedRows(selectedRowKeys);
    if (flag) {
        if (selectedRowKeys.length > 1) {
            alert("你只能选择一行!");
        } else {
            // 用户只选择了一行,则执行操作
            handle();
        }
    }
}

/**
 * 删除数据的基础方法
 * @param ids    删除数据的id数组
 * @param url    删除的路径
 * @param handle 删除完成后执行的方法
 */
const delData = (ids = [], url = '', handle = () => {}) => {
    checkSelectedRows(ids, () => {
        confirm({
            title: '你确实想删除选择项吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                fetchPost(url, {ids:ids}, r => {
                  handle();
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    })
}

export {checkSelectedRows, checkSingleRows, delData}

