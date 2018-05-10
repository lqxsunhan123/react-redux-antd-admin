import React from 'react'
import { connect } from 'react-redux'
import MyTab from '../components/MyTab'
import {toggleTab, removeTab} from '../actions/tab'
const mapStateToProps = (state, ownProps) => {
    return {
        tabs: state.tabs,
        activeKey: state.activityKey,
        history: ownProps.history
    }
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleTab: (activityKey) => dispatch(toggleTab(activityKey)),
    removeTab: (targetKey) => {
        console.log(targetKey)
        dispatch(removeTab(targetKey))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTab)