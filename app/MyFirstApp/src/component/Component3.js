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
import fetch from '../utils/fetchUtils'
import Barcode from 'react-native-smart-barcode'
var ImagePicker = require('react-native-image-picker');
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap ggR on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
export default class Component3 extends Component {

    static navigationOptions = {
        title: 'Component3',
        headerStyle: {
            backgroundColor: '#f4511e',
            justifyContent:'center',
            alignItems:'center'
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
        avatarSource:'',
        source1:'',
        viewAppear: false,

    }
    handleClick = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }




    handleClick1 = () => {
        Alert.alert("ss")
        this.setState({viewAppear: true})
    }

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        Alert.alert("二维码扫描结果", e.nativeEvent.data.code, [
            {text: '确认', onPress: () => {
                this._stopScan();
                this.setState({viewAppear: false})
            }},
        ])
    }

    uploadImg = () => {
        let formData = new FormData();
        let file = {uri: this.state.avatarSource.uri, type: 'multipart/form-data', name: 'a.jpg'};
        console.log("****************************")
        console.log(file);
        formData.append("file", file)
        fetch('/uploadImg', formData,(r) => {
            console.log("88888888888888888888888888888")
            console.log(r.data);
        })
        // {headers:{'Content-Type':'multipart/form-data'}}
    }


    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.viewAppear ?
                    <Barcode style={{flex: 1,}} ref={component => this._barCode = component}
                             onBarCodeRead={this._onBarCodeRead}/>
                    :
                    <View style={styles.container}>

                        <Text style={styles.welcome}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.instructions}>
                            To getc started, edit App.js
                        </Text>
                        <Text style={styles.instructions}>
                            {instructions}
                        </Text>
                        <TouchableHighlight
                            onPress={this.handleClick}
                        ><Text>拍照</Text></TouchableHighlight>
                        <Button
                            onPress={this.uploadImg}
                            title="上传图片"
                            color="blue"
                            accessibilityLabel="Learn more about this purple button"
                            style={{ height:230}}
                        />
                        <Button
                            onPress={this.handleClick1}
                            title="扫码"
                            color="blue"
                            accessibilityLabel="Learn more about this purple button"
                            style={{ height:230}}
                        />
                        <Image source={this.state.avatarSource} style={{width:150,height:150}} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
