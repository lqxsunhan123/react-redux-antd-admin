import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import UserComponent from '../user'
import PrivateRoute from './PrivateRoute'
import WrappedNormalLoginForm from './login'
class IndexComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        return (

            <h1>首页</h1>
        )
    }

}

export default (props) => (
    <Router>
        <div style={{width: '100%', height: '100%'}}>
            <Switch>
                <Route path="/login" component={WrappedNormalLoginForm}/>
                <PrivateRoute exact path="/" component={IndexComponent}></PrivateRoute>
                <PrivateRoute exact path="/user" component={UserComponent}></PrivateRoute>
            </Switch>
        </div>
    </Router>)