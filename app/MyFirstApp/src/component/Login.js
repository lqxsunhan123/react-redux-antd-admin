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
    TextInput,
    Button,Image,PixelRatio
} from 'react-native';

export default class Home extends Component {

    static navigationOptions = {
        title: '登录页',
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
                <Text style={{fontSize:24,marginBottom:30}}>仓库管理系统</Text>
                <View style={{alignItems:'flex-start'}}>
                <View style={styles.userInput}>
                    <Text>用户名</Text><TextInput style={{height: 20, width: 150, borderColor: 'gray', borderWidth: 1}}
                                               onChangeText={(text) => {
                                                   console.log(text)
                                               }}
                />
                </View>
                <View style={styles.userInput}>
                    <Text>密码</Text><TextInput style={{height: 20, width: 150, borderColor: 'gray', borderWidth: 1,marginLeft:14}}
                                              onChangeText={(text) => {
                                                  console.log(text)
                                              }}
                />

                </View>
                    </View>
                <View style={{width:190,height:30,marginTop:30}}>
                <Button title="登录"   onPress={() => this.props.navigation.navigate('Home')} />
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        // flexDirection: 'row',
        alignItems:'center',
        borderWidth:1
    },
    userInput:{
        flexDirection:'row',
        marginBottom:10
        // borderWidth:1
    },
    leftBox:{
        flex:3,
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'red',
        alignItems:'center',
        justifyContent:'space-around',
        flexWrap:'nowrap'
        // padding:5
    },
    rightBox:{
        flex:1,
        flexDirection: 'column',
        // padding:5
    },
    box1:{
        // flex:2
        // width:60,
        // height:30
        // marginRight:5
        flexShrink:0
    },
    box2:{
        // flex:2
        // width:60,
        // height:30

    },
    box3:{
        // flex:2
        width:50,
        height:50
    },
    box4:{
        width:50,
        height:50
    },
    box5:{},
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