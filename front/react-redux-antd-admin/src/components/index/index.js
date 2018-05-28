import React, {Component} from 'react';

import {
     Router,
    Route,
    Switch
} from 'react-router-dom'
import UserComponent from '../user'
import ResourceComponent from '../resource'
import RoleComponent from '../role'
import PrivateRoute from './PrivateRoute'
import WrappedNormalLoginForm from './login'
import {history} from '../../constants/config'
class IndexComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        return (
            <div>
                <h1>首页</h1>
            </div>
        )
    }

}

export default (props) => (
    <Router history={history}>
        <div style={{width: '100%', height: '100%'}}>
            <Switch>
                <Route path="/login" component={WrappedNormalLoginForm}/>
                <PrivateRoute exact path="/" component={IndexComponent}></PrivateRoute>
                <PrivateRoute exact path="/user" component={UserComponent}></PrivateRoute>
                <PrivateRoute exact path="/resource" component={ResourceComponent}></PrivateRoute>
                <PrivateRoute exact path="/role" component={RoleComponent}></PrivateRoute>
            </Switch>
        </div>
    </Router>)