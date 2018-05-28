import React from 'react';
import '../../css/user.css';
import {Table, Icon, Tag, TreeSelect} from 'antd';
import {Pagination, Modal, Checkbox} from 'antd';
import {Form, Row, Col, Input, Button, Radio} from 'antd';
import {connect} from 'react-redux'
import {requestData, changeCheckBox, changeObj, openModal} from '../../actions/page'
import {fetchPost, fetchGet} from '../../utils/fetchUtils'
import { checkSingleRows, delData} from '../../utils/Utils'
import {HasPermission, MyTable} from '../common/index'
const RadioGroup = Radio.Group
const FormItem = Form.Item;
const columns = [{
    title: '名称',
    dataIndex: 'text',
    key:'text',
    width:150
},{
    title: 'id',
    dataIndex: 'key',
    key:'key',
    width:50
},  {
    title: '图标',
    dataIndex: 'icon',
    render: text => { return (<Icon type={text} />)},
    key: 'icon',
    width:50
},{
    title: '地址',
    dataIndex: 'path',
    key: 'path',
    width:100
},{
    title: '权限',
    dataIndex: 'perm',
    key: 'perm',
    width:100
},{
    title: '类型',
    dataIndex: 'type',
    render: text => {
        switch (text){
            case 1:
                return <Tag color="green">目录</Tag>
                    case 2:
                return <Tag color="#2db7f5">菜单</Tag>
            case 3:
                return <Tag color="yellow">资源</Tag>
            default:
                return <Tag color="red">未知</Tag>
        }
    },
    width:100,
    key: 'type'
},{
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    width:100
},{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width:100
}];


class ResourceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            flag: '',
            addFlag: 1, // 1-目录 2-菜单 3-资源
            allResources: [], // 所有的资源
        }
    }

    /**
     * 展示删除数据的modal
     */
    showConfirm = () => {
        const {selectedRowKeys} = this.props.page;
        // 删除数据
        delData(selectedRowKeys, "/resource/del", () => {
            this.clearCheckboxAndRequestUser();
        })
    }


    handleOk = (obj) => {
        if (this.state.flag == 'add') {
            fetchPost("/resource/save", obj, r => {
                this.clearCheckboxAndRequestUser();
            })
        } else {
            fetchPost("/resource/update", obj, r => {
                this.clearCheckboxAndRequestUser();
            })
        }

    }

    /**
     * 关闭模态框,刷新列表,刷新checkbox
     */
    clearCheckboxAndRequestUser = () => {
        this.setState({
            visible: false,
        })
        // 将selectedRowKeys和selectedRows设为空
        this.props.changeCheckBox([],[]);
        // 请求数据,false代表不分页
        this.props.requestData("/resource/list", false);
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }


    // 获取资源信息
    getResources = () => {
        fetchGet("/resource/getAllResource", r => {
            // allResource需要新增一个parentId为0的菜单, key和value用字符串形式,这样才符合antd的要求,数组是因为antd的treeData的参数为array
            let allResource = [{
                key: "0",
                label: "根菜单",
                value:"0",
                children: r.data
            }]
            this.setState({allResources: allResource})
        })
    }

    showAdd = () => {
        // 获取所有资源信息
        this.getResources();
        // 打开模态框,传入需要显示的类型
        this.props.openModal({type: 1})
        this.setState({
            visible: true,
            flag: 'add'
        })
    }

    showEdit = () => {
        // 检查用户选取的行数,如果通过则执行自定义的方法
        checkSingleRows(this.props.page.selectedRowKeys, () => {
            // 获取所有角色信息
            this.getResources();
            this.props.openModal(this.props.page.obj)
            this.setState({
                visible: true,
                flag: 'edit'
            })
        });
    }


    componentWillMount() {
    }

    componentWillUnmount() {
    }



    render() {
        return (
            <div>

                <WrappedAdvancedSearchForm obj={this.props.page.obj} visible={this.state.visible}
                                           handleOk={this.handleOk} handleCancel={this.handleCancel}
                                           flag={this.state.flag} allResources={this.state.allResources}
                                           changeObj={this.props.changeObj}
                                           />
                <HasPermission component={ <Button className="mybtn" onClick={this.showAdd}>新增</Button> } perms="resource-save" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showEdit}>编辑</Button> } perms="resource-update" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showConfirm}>删除</Button> } perms="resource-del" />
                <MyTable url="/resource/list" columns={columns} isPage={false} defaultExpandAllRows={true} scroll={{ y:540 }} />
            </div>
        );
    }
}


/**
 * 资源新增时的表单
 */
class ResourceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type:1  // 1目录 2菜单 3资源
        }
    }

    handleOk = () => {
        const {handleOk} = this.props;
        this.props.form.validateFields((e, obj) => {
            if (!e) {
                handleOk(this.props.obj);
            }
        })
    }

    handleCancel = () => {
        this.props.handleCancel();
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {allResources, obj} = this.props;

        let formLayout = {
            labelCol: {span: 5},
            wrapperCol: {span : 17}
        }
        // 分别计算每个表单控件的display
        let pathVisible = obj.type == 2 ? "" : "none";
        let permVisible =  obj.type == 3 ? "" : "none";
        let iconVisible =  obj.type == 3 ? "none" : "";
        // destroyOnClose关闭时清空数据, maskClosable遮罩层点击不会关闭
        return (
            <Modal
                title="操作"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="450px"
                destroyOnClose={true}
                maskClosable={false}
            >
                <Form layout="horizontal">
                    <FormItem style={{display: 'none'}}>
                        {getFieldDecorator('id')(<Input type="hidden" />)}
                    </FormItem>
                            <FormItem label="类型" {...formLayout}>
                                {getFieldDecorator('type', {
                                    rules: [{required: true, message: '请选择上级菜单!'}],
                                })(<RadioGroup>
                                    <Radio value={1}>目录</Radio>
                                    <Radio value={2}>菜单</Radio>
                                    <Radio value={3}>资源</Radio>
                                </RadioGroup>)}
                            </FormItem>
                    <FormItem label="名称" {...formLayout}>
                        {getFieldDecorator('text')(<Input />)}
                    </FormItem>
                            <FormItem label="上级菜单" {...formLayout}>
                                {getFieldDecorator('parentId', {
                                    rules: [{required: true, message: '请选择上级菜单!'}],

                                })(<TreeSelect
                                    style={{width: 240}}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={allResources}
                                    placeholder="请选择"
                                    treeDefaultExpandAll
                                />)}
                            </FormItem>
                            <FormItem label="地址" {...formLayout} style={{ display:pathVisible }}>
                                {getFieldDecorator('path', {
                                })(<Input />)}
                            </FormItem>
                    <FormItem label="权限信息" {...formLayout} style={{ display:permVisible }}>
                        {getFieldDecorator('perm', {
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="图标" {...formLayout} style={{ display:iconVisible }}>
                        {getFieldDecorator('icon', {
                        })(<Input />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrappedAdvancedSearchForm = Form.create({
    // 字段发生变化时  changedFields变化的字段的详细信息
    onFieldsChange(props, changedFields) {
    },
    // 值发生变化时,_value 变化的字段
    onValuesChange(props, _value){
        console.log(props);
        console.log(_value);
        // 更新redux中的值
        props.changeObj(_value)
    },
    // 映射字段到表单上
    mapPropsToFields(props){
        // 对象
        let obj = props.obj;
        // if (props.flag == 'add') {
        //     // 如果是添加则不映射数据
        //     obj = {};
        // }
        // if (obj.type != null) {
            return {
                parentId:Form.createFormField({
                    value: obj.parentId
                }),
                type:Form.createFormField({
                    value: obj.type
                }),
                icon:Form.createFormField({
                    value: obj.icon
                }),
                perm:Form.createFormField({
                    value: obj.perm
                }),
                path:Form.createFormField({
                    value: obj.path
                }),
                text:Form.createFormField({
                    value: obj.text
                }),
            }
        // }
    }
})(ResourceForm);
const mapStateToProps = (state, ownProps) => {
    return {
        page: state.page
    };
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    // 获取用户的方法，接收分页器和查询参数
    requestData: (url, pagination, params) => dispatch(requestData(url, pagination, params)),
    // 选择反选的方法
    changeCheckBox: (selectedRowKeys, selectedRows) => dispatch(changeCheckBox(selectedRowKeys, selectedRows)),
    changeObj: (obj) => {dispatch(changeObj(obj))},
    openModal: (obj = {}) => {dispatch(openModal(obj))}
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceTable)
