import React, {Component} from 'react';
import {Layout} from 'antd';
import SiderMenuContainer from '../../components/SiderMenu'
import { connect } from 'react-redux'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import {Icon,Row, Col} from 'antd';
import MyTabContainer from '../../components/MyTab'
import {history} from '../../constants/config'
const {Header, Sider, Content} = Layout;
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
class PrivateRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // collapsed: true,
            // panes,
            // activeKey: panes[0].key
        };
        // this.newTabIndex = 3;
    }


   logout = () => {
       localStorage.removeItem("token");
       localStorage.removeItem("expireDate");
       localStorage.removeItem("menus");
       setCookie('JSESSIONID', "", -1);
       history.replace("login");
   }

    render() {
        const {component: Component, ...rest}  = this.props;
        let flag = true;

        // 获取token
        const token = localStorage.getItem("token")
        if (token != null) {
            // 获取token过期时间
            const expireDate = parseFloat(localStorage.getItem("expireDate"));

            let now = new Date();
            if (expireDate < now.getTime()) {
                // token过期
                flag = false;
            }
        } else {
            flag = false;
        }
        return (
            <Route {...rest} render={props => {
                return (
                    flag ? (
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
                                 <Row type="flex" justify="space-between">
                                     <Col>
                                         <Icon
                                             className="trigger"
                                             type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                                             onClick={this.props.toggle}
                                         />

                                     </Col>
                                     <Col>
                                         <Icon type="logout"  className="trigger" title="退出" onClick={this.logout} />
                                     </Col>
                                 </Row>
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
    return {collapsed: state.tab.collapsed};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggle: () => {dispatch({type:'TOGGLE'})}
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);