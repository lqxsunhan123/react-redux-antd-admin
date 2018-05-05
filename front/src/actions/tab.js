export const addTab = (text, key) => {
    return {
        type: 'ADD_TAB',
        text: text,
        key: key
    }
}

export const toggleTab = activityKey => {
    return{
        type: 'TOGGLE_TAB',
        activityKey: activityKey
    }
}

const remove = (o) => {
    return{
        type: 'REMOVE_TAB',
        tabs: o.tabs,
    }
}

export const removeTab = targetKey => (dispatch, getState) => {
    let o = findNextActivityTab(targetKey, getState().tabs)
    dispatch(remove(o));
    if(getState().activityKey == targetKey){
    dispatch(toggleTab(o.activityKey));
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