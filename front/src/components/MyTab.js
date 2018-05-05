import React, {Component} from 'react';
import {Layout} from 'antd';
import {Tabs, Button} from 'antd';
const {Content} = Layout;
const TabPane = Tabs.TabPane;

class MyTab extends Component {

    constructor(props) {
        super(props);
        const panes = [
            {title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1'},
            {title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2'},
        ];
        let tabs = this.props.tabs;

        this.state = {
            activeKey: tabs[0].key,
        };
        this.newTabIndex = 3;
    }

    onChange = (activeKey) => {
        this.props.toggleTab(activeKey);
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        this.props.removeTab(targetKey);
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

export default MyTab;