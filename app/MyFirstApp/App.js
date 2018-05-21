/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
Alert,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
Button,Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Component1 from './src/component/Component1'
import Component2 from './src/component/Component2'
import Component3 from './src/component/Component3'
import Home from './src/component/Home'
import Login from './src/component/Login'
import ScanDelivery from './src/component/ScanDelivery'
const RootStack = createStackNavigator(
    {
        Home: Home,
        Component1: Component1,
        Component2: Component2,
        Component3: Component3,
        Login: Login,
        ScanDelivery:ScanDelivery
    },
    {
        initialRouteName: 'Login',
    }
);
export default class App extends Component {

    constructor(props){
        super(props)
    }
    state={

    }



  render() {
    return (
        <RootStack />
    );
  }
}


