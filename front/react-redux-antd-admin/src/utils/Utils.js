/**
 * 在表格中操作时,应至少选择一行
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

const wrapIds = (ids) => {
    let formData = new FormData();
    for(let id of ids){
        formData.append("ids[]", id);
    }
    return formData;
}

export {checkSelectedRows, checkSingleRows, wrapIds}

