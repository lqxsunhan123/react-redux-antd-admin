import React, {Component} from 'react';
import {Layout} from 'antd';
import SiderMenuContainer from '../../container/SiderMenuContainer'
import { connect } from 'react-redux'
import SiderMenu from '../../components/SiderMenu'
import fetch from '../../utils/fetchUtils'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import {Icon} from 'antd';
import MyTabContainer from '../../container/MyTabContainer'
const {Header, Sider, Content} = Layout;

class PrivateRoute extends Component {

    constructor(props) {
        super(props);
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            collapsed: true,
            // panes,
            // activeKey: panes[0].key
        };
        // this.newTabIndex = 3;
    }

    toggle = () => {
        this.setState({
            collapsed: false,
        });
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
                                <SiderMenuContainer/>
                            </Sider>
                            <Layout>
                                <Header style={{background: '#353A42', padding: 0}}>
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.props.toggle}
                                    />
                                </Header>

                                <MyTabContainer/>

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
    console.log(state)
    console.log("******************7")
    return {collapsed: state.collapsed};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggle: () => {dispatch({type:'TOGGLE'})}
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);