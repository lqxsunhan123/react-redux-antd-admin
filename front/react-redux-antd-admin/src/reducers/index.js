import tab from './tab/index'
import user from './user'
import page from './page'
import { combineReducers } from 'redux'

export default combineReducers({
    tab: tab,
    user: user,
    page: page
})