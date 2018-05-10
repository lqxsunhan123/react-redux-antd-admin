import React, {Component} from 'react';
import {Tabs, Button} from 'antd';
import { connect } from 'react-redux'
import {toggleTab, removeTab} from '../actions/tab'
import {history} from '../constants/config'
const TabPane = Tabs.TabPane;


class MyTab extends Component {

    constructor(props) {
        super(props);
    }

    onChange = (activeKey) => {
        // const {history} = this.props;
        // console.log(history)
        this.props.toggleTab(activeKey, history);
        // history.replace(activeKey)
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        // const {history} = this.props;
        this.props.removeTab(targetKey, history);
    }

    render() {
        return (
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.props.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.props.tabs ? this.props.tabs.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>) : null}
            </Tabs>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tabs: state.tabs,
        activeKey: state.activityKey,
        history: ownProps.history
    }
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleTab: (activityKey, history) => dispatch(toggleTab(activityKey, history)),
    removeTab: (targetKey, history) => {
        console.log(targetKey)
        dispatch(removeTab(targetKey, history))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTab)
