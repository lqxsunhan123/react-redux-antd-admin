import React from 'react';
import {Menu, Icon, Button} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
const SubMenu = Menu.SubMenu;



export default class SiderMenu extends React.Component {
    state = {
        collapsed: true,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    renderMenu = (menus) => {
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
                        <Link onClick={() => this.props.handleLinkClick(t.text, t.key)} to={!t.path ? '' : t.path}> <Icon type={t.icon}/><span>{t.text}</span></Link>
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