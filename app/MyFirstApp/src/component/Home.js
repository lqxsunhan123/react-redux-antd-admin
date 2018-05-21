/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,Image,PixelRatio
} from 'react-native';
import { NativeModules } from 'react-native';

// 下一句中的ToastExample即对应上文
// public String getName()中返回的字符串

const Badge = NativeModules.Badge;

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
        count: 1
    }

    updateBadge = () => {
        console.log(Badge);
        Badge.showBadge(this.state.count);
        let c = this.state.count + 1;
        this.setState({count: c})
    }

    a = () => {
        Alert.alert("ss")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width:190,height:30,marginTop:10}}>
                    <Button title="扫描收货"   onPress={() => this.props.navigation.navigate('ScanDelivery')} />
                </View>
                <View style={{width:190,height:30,marginTop:10}}>
                    <Button title="扫描入库"   onPress={() => this.updateBadge()} />
                </View>
                <View style={{width:190,height:30,marginTop:10}}>
                    <Button title="扫描出库"   onPress={() => this.a} />
                </View>
                <View style={{width:190,height:30,marginTop:10}}>
                    <Button title="扫描盘点"   onPress={() => this.props.navigation.navigate('Home')} />
                </View>
                <View style={{width:190,height:30,marginTop:10}}>
                    <Button title="移库操作"   onPress={() => this.props.navigation.navigate('Home')} />
                </View>
                <View style={{width:190,height:40,marginTop:10}}>
                    <Button title="退出"
                            color="red"  onPress={() => this.props.navigation.navigate('Home')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems:'center',
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