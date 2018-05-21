/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button, Image, PixelRatio, TextInput, FlatList
} from 'react-native';


export default class Home extends Component {

    static navigationOptions = {
        title: '扫描收货',
        headerStyle: {
            backgroundColor: '#f4511e', alignItems: 'center'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props)
    }

    state = {}

    render() {
        return (
            <View style={styles.container}>
                <Text style={{alignSelf: 'center'}}>要货令列表</Text>
                <View style={styles.search}>
                    <Text>查询日期</Text>
                    <TextInput style={{height: 20, width: 150, borderColor: 'gray', borderWidth: 1, marginLeft: 14}}
                               onChangeText={(text) => {
                                   console.log(text)
                               }}
                    />
                    <TouchableOpacity onPress={() => {
                        console.log("点击了")
                    }}>
                        <View style={{
                            width: 50,
                            height: 25,
                            borderWidth: 1,
                            borderRadius: 5,
                            alignItems: 'center',
                            marginLeft: 5
                        }}>
                            <Text >查询</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.myTable}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableTh}>
                            <Text>序号</Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text>单号</Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text>供应商</Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text>操作</Text>
                        </View>
                    </View>
                    <FlatList
                        data={[{key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'}, {
                            key: '1',
                            order: 'KJFDIWO92',
                            supplier: '上海四方'
                        }, {key: '1', order: 'KJFDIWO92', supplier: '上海四方'},]}
                        renderItem={({item}) =>
                            <View style={styles.td}>
                                <View style={styles.tdContent}>
                                    <Text>{item.key}</Text>
                                </View>
                                <View style={styles.tdContent}>
                                    <Text>{item.order}</Text>
                                </View>
                                <View style={styles.tdContent}>
                                    <Text>{item.supplier}</Text>
                                </View>
                                <View style={styles.tdContent}>
                                    <Text>收货</Text>
                                </View>
                            </View>}
                    />
                </View>
                <View style={styles.footer}>
                    <View>
                        <Button title="手工收货"   onPress={() => this.props.navigation.navigate('Home')} />
                    </View>
                    <View>
                        <Button title="退出"   onPress={() => this.props.navigation.navigate('Home')} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems:'center',
        flex: 1,
        borderWidth: 1
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 30
    },
    myTable: {
        borderWidth: 1,
        flex: 5
    },
    footer:{
        flex:1,
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    tableHeader: {
        flexDirection: 'row'
    },
    tableTh: {
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        height: 30,
        justifyContent: 'center'
    },
    td: {
        flexDirection: 'row',
    },
    tdContent: {
        flex: 1,
        alignItems: 'center',
        height: 30,
        justifyContent: 'center'
    },

    leftBox: {
        flex: 3,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap'
        // padding:5
    },
    rightBox: {
        flex: 1,
        flexDirection: 'column',
        // padding:5
    },
    box1: {
        // flex:2
        // width:60,
        // height:30
        // marginRight:5
        flexShrink: 0
    },
    box2: {
        // flex:2
        // width:60,
        // height:30

    },
    box3: {
        // flex:2
        width: 50,
        height: 50
    },
    box4: {
        width: 50,
        height: 50
    },
    box5: {},
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
    },

});