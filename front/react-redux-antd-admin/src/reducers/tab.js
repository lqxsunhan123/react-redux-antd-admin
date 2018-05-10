export const tabs = (state=[], action) => {
    switch (action.type){
        case 'ADD_TAB':
            console.log(state)
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
export const activityKey = (state='', action) => {
    switch (action.type){
        case 'TOGGLE_TAB':
            let path = action.activityKey.toString();
            action.history.replace(path)
            return action.activityKey.toString();
        default:
            return state;
    }
}

export const collapsed = (state=false, action) => {
    switch (action.type){
        case 'TOGGLE':
            return !state
        default:
            return state;
    }
}
