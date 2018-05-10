import React, {Component} from 'react';
import {Layout} from 'antd';
import SiderMenuContainer from '../../components/SiderMenu'
import { connect } from 'react-redux'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import {Icon} from 'antd';
import MyTabContainer from '../../components/MyTab'
const {Header, Sider, Content} = Layout;

class PrivateRoute extends Component {

    constructor(props) {
        super(props);
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            // collapsed: true,
            // panes,
            // activeKey: panes[0].key
        };
        // this.newTabIndex = 3;
    }


    // onChange = (activeKey) => {
    //     this.setState({ activeKey });
    // }
    // onEdit = (targetKey, action) => {
    //     this[action](targetKey);
    // }
    // add = () => {
    //     const panes = this.state.panes;
    //     const activeKey = `newTab${this.newTabIndex++}`;
    //     panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    //     this.setState({ panes, activeKey });
    // }
    // remove = (targetKey) => {
    //     let activeKey = this.state.activeKey;
    //     let lastIndex;
    //     this.state.panes.forEach((pane, i) => {
    //         if (pane.key === targetKey) {
    //             lastIndex = i - 1;
    //         }
    //     });
    //     const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    //     if (lastIndex >= 0 && activeKey === targetKey) {
    //         activeKey = panes[lastIndex].key;
    //     }
    //     this.setState({ panes, activeKey });
    // }

    render() {
        const {component: Component, ...rest}  = this.props;
        const token = localStorage.getItem("token")
        return (
            <Route {...rest} render={props => {
                 const {history} = props;

                return (
                    token != null ? (
                        <Layout>
                            <Sider
                                trigger={null}
                                collapsible={true}
                                collapsed={this.props.collapsed}
                                style={{overflowY: 'auto'}}
                            >
                                <div className="logo"/>
                                <SiderMenuContainer history={history} />
                            </Sider>
                            <Layout>
                                <Header style={{backgroundColor: '#3C8DBC', padding: 0}}>
                                    <Icon
                                        className="trigger"
                                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.props.toggle}
                                    />
                                </Header>

                                <MyTabContainer history={history}/>

                                <Content style={{position:'relative',bottom:'16px', padding: 24, background: '#fff', minHeight: 280}}>
                                    <Component {...props}/>
                                </Content>
                            </Layout>
                        </Layout>
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}/>
                    )
                )
            }}/>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {collapsed: state.collapsed};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggle: () => {dispatch({type:'TOGGLE'})}
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);