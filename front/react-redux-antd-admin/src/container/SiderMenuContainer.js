import React from 'react'
import { connect } from 'react-redux'
import {addTab} from '../actions/tab'
import SiderMenu from '../components/SiderMenu'

const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLinkClick: (text, key) => {dispatch(addTab(text, key))}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiderMenu)