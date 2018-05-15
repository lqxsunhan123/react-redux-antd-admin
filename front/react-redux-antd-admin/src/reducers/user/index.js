import { combineReducers } from 'redux'
const loading = (state = false, action) => {
    switch(action.type){
        case 'REQUEST_USER':
            return action.loading;
        default:
            return state;
    }
}

const data = (state = [], action) => {
    switch (action.type){
        case 'RECEIVE_USER':
            return action.data;
        default:
            return state;
    }
}

const pagination = (state = {}, action) => {
    switch (action.type){
        case 'RECEIVE_USER':
            return action.pagination;
        default:
            return state;
    }
}


export default combineReducers(
    {loading,data,pagination}
)

