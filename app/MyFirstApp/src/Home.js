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
    Button,Image,PixelRatio
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
                <View style={styles.leftBox}>
                    <View style={styles.box1}>
                        <Button  title="页面1"    onPress={() => this.props.navigation.navigate('Component1')} />
                    </View>
                    <View style={styles.box2}>
                        <Button title="页面2"   onPress={() => this.props.navigation.navigate('Component2')} />
                    </View>

                </View>
                <View style={styles.rightBox}>
                    <Button title="页面3" style={styles.box3}  onPress={() => this.props.navigation.navigate('Component3')} />
                    <Button title="页面3" style={styles.box4}  onPress={() => this.props.navigation.navigate('Component3')} />
                </View>
                <Text>
                    window.width={Dimensions.get('window').width + '\n'}
                    window.height={Dimensions.get('window').height + '\n'}
                    pxielRatio={PixelRatio.get()}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        flexDirection: 'row',
        // alignItems:'space-around',
        borderWidth:1
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