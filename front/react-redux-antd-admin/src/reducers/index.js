import tab from './tab/index'
import user from './user'
import { combineReducers } from 'redux'

export default combineReducers({
    tab: tab,
    user: user
})