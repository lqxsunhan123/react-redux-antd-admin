export const tabs = (state=[], action) => {
    switch (action.type){
        case 'ADD_TAB':
            console.log(state)
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
            return action.activityKey.toString()
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
