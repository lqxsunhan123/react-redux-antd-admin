export const addTab = (text, key, history) => (dispatch, getState) =>{

    let tabs = getState().tabs;
    console.log(tabs);
    let activiteTabs = tabs.filter(t => t.key==key);
    console.log("00000000000000000000000");
    console.log(activiteTabs)
    // 直接设置活动key
    dispatch(toggleTab(key, history))
    if(activiteTabs.length == 0){
        // 新增
        dispatch({
            type: 'ADD_TAB',
            text: text,
            key: key
        });
    }
}

export const toggleTab = (activityKey, history) => {
    return{
        type: 'TOGGLE_TAB',
        activityKey: activityKey,
        history: history
    }
}

const remove = (o) => {
    return{
        type: 'REMOVE_TAB',
        tabs: o.tabs,
    }
}

export const removeTab = (targetKey, history) => (dispatch, getState) => {
    let o = findNextActivityTab(targetKey, getState().tabs)
    dispatch(remove(o));
    if(getState().activityKey == targetKey){
    dispatch(toggleTab(o.activityKey, history));
    }
}

const findNextActivityTab = (targetKey, tabs) => {
    let index;
    console.log(tabs);
    let newTabs = tabs.map((t, i) => {
        console.log(i)
        if(t.key != targetKey){
            return t;
        }
        index = i;
    })
    let activityKey = tabs[index + 1] == null ? tabs[index - 1].key : tabs[index + 1].key;
    newTabs.splice(index, 1);
    return {tabs: newTabs,activityKey: activityKey}
}