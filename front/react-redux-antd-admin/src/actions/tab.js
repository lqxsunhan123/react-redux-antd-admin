/**
 * 新增tab选项卡的action
 * @param text
 * @param key
 * @param history
 */
export const addTab = (text, key) => (dispatch, getState) =>{
    let tabs = getState().tab.tabs;
    // 查看目前的tab中有没有用户点击的tab，如果没有则新增,有则直接将其设为active即可
    let activeTabs = tabs.filter(t => t.key == key);
    // 直接设置活动key
    dispatch(toggleTab(key))
    if(activeTabs.length == 0){
        // 新增
        dispatch({
            type: 'ADD_TAB',
            text: text,
            key: key
        });
    }
}

/**
 * 切换选项卡的action
 * @param activityKey
 * @returns {{type: string, activityKey: *, history}}
 */
export const toggleTab = (activityKey) => {
    return{
        type: 'TOGGLE_TAB',
        activityKey: activityKey
    }
}

/**
 * 移除选项卡的action  tabs是经过计算后目前的选项卡
 * @param o
 * @returns {{type: string, tabs: (*|Array)}}
 */
const remove = (tabs) => {
    return{
        type: 'REMOVE_TAB',
        tabs: tabs,
    }
}

/**
 * 移除选项卡  (移除后还会有个切换选项卡的动作)
 * @param targetKey
 */
export const removeTab = (targetKey) => (dispatch, getState) => {
    // 获取移除选项卡后的activeKey和tabs
    let {tabs, activityKey} = findNextActivityTab(targetKey, getState().tab.tabs)
    dispatch(remove(tabs));
    // 如果点击的选项卡是当前的选项卡,则需要切换,规则是,如果有下一个选项卡,则切下一个,如果没有则切上一个
    if (getState().tab.activityKey == targetKey) {
        dispatch(toggleTab(activityKey));
    }
}

/**
 * 删除选项卡时,找到下一个activeKey和计算tabs的方法
 * @param targetKey
 * @param tabs
 * @returns {{tabs: (Array|*), activityKey: *}}
 */
const findNextActivityTab = (targetKey, tabs) => {
    let index;
    let newTabs = tabs.map((t, i) => {
        if(t.key != targetKey){
            return t;
        }
        // 记录移除元素的索引,因为移除元素后,他还在数组中占了位置,值为null,记录索引之后清楚
        index = i;
    })
    let activityKey = tabs[index + 1] == null ? tabs[index - 1].key : tabs[index + 1].key;
    // 清除移除的元素
    newTabs.splice(index, 1);
    return {tabs: newTabs,activityKey: activityKey}
}