import React from 'react';
import {Menu, Icon, Button} from 'antd';
import {
    Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import {addTab} from '../actions/tab'
import {history} from '../constants/config'


const SubMenu = Menu.SubMenu;



class SiderMenu extends React.Component {

    constructor(props){
        super(props);
    }

    renderMenu = (menus) => {
        // const {history} = this.props;
        return menus.map(t => {
            return (
                t.type == 1 && t.sub != null && t.sub.length > 0 ?
                    <SubMenu key={t.key} title={<span><Icon type={t.icon}/><span>{t.text}</span></span>}>
                        {
                            this.renderMenu(t.sub)
                        }
                    </SubMenu>
                    :
                    <Menu.Item key={t.key}>
                        <Link onClick={() => this.props.handleLinkClick(t.text,t.path, history)} to={!t.path ? '' : t.path}> <Icon type={t.icon}/><span>{t.text}</span></Link>
                    </Menu.Item>
            )
        })
    }

    componentWillMount = () => {
        let menus = JSON.parse(localStorage.getItem("menus"));
        if(menus == null){ menus = [] }
        this.setState({menus: menus});
    }

    render() {
        const menus = this.state.menus;
        console.log(menus)
        return (
            // style={{backgroundColor:"#333745"}}
                <Menu
                    menus={this.state.menus}
                    inlineCollapsed={this.props.collapsed}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"

                >
                    {this.renderMenu(menus)}
                </Menu>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLinkClick: (text, key, history) => {dispatch(addTab(text, key, history))}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiderMenu)