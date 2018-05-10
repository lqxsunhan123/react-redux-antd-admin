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

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',alignItems:'center'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props)
    }
    state={

    }

  render() {
    return (
        <View style={styles.container}>
            <Button  title="页面1" style={{width:90,height:40}}   onPress={() => this.props.navigation.navigate('Component1')} />
            <Button title="页面2"  style={{width:40,height:40}} onPress={() => this.props.navigation.navigate('Component2')} />
            <Button title="页面3" style={{width:40,height:40}}  onPress={() => this.props.navigation.navigate('Component3')} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems:'center',
        width:300,
        height:100,
        borderWidth:5
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    container1: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});