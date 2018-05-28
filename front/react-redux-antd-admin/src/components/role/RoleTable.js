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
    title: 'id',
    dataIndex: 'key',
    key:'key',
    width:50
},{
    title: '名称',
    dataIndex: 'name',
    key:'name',
    width:100
},{
    title: '编码',
    dataIndex: 'code',
    key:'code',
    width:100
}, {
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


class RoleTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            flag: '',
            allResources: [], // 所有的资源
            roleResourceIds: [] // 用户对应的资源id
        }
    }

    /**
     * 展示删除数据的modal
     */
    showConfirm = () => {
        const {selectedRowKeys} = this.props.page;
        // 删除数据
        delData(selectedRowKeys, "/role/del", () => {
            this.clearCheckboxAndRequestUser();
        })
    }


    handleOk = (obj) => {
        console.log(obj);
        // 因为此时 roleResources 是 [{label:xx,value:xx}, {}]  我们需要提取出ids
        let arr = obj.roleResources;
        var ids = arr.map(o => {
            return o.value;
        })
        obj.resourceIds = ids;
        if (this.state.flag == 'add') {
            fetchPost("/role/save", obj, r => {
                this.clearCheckboxAndRequestUser();
            })
        } else {
            fetchPost("/role/update", obj, r => {
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
        this.props.requestData("/role/list", false);
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }


    // 获取资源信息
    getRoles = (id) => {
        let p = fetchGet("/role/getAllResource", r => {
            let arr = r.data;

            this.setState({allResources: arr})
        })
        if(id){
           p.then(() => {
               fetchGet("/role/getRoleResource?id=" + id, r => {
                   this.props.changeObj({roleResources: r.data})
               })
           })
        }
        return p;
    }

    showAdd = () => {
        // 获取所有资源信息
        this.getRoles(null).then(() => {
            // 打开模态框,传入需要显示的类型
            this.props.openModal()
            this.setState({
                visible: true,
                flag: 'add'
            })
        });
    }

    showEdit = () => {
        // 检查用户选取的行数,如果通过则执行自定义的方法
        checkSingleRows(this.props.page.selectedRowKeys, () => {
            let obj = this.props.page.obj;
            // 获取所有角色信息
            this.getRoles(obj.key).then(() => {
                console.log(this.props.page.obj)
                this.props.openModal(this.props.page.obj)
                this.setState({
                    visible: true,
                    flag: 'edit'
                })
            });
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
                <HasPermission component={ <Button className="mybtn" onClick={this.showAdd}>新增</Button> } perms="role-save" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showEdit}>编辑</Button> } perms="role-update" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showConfirm}>删除</Button> } perms="role-del" />
                <MyTable url="/role/list" columns={columns} isPage={false}  scroll={{ y:540 }} />
            </div>
        );
    }
}


/**
 * 角色新增时的表单
 */
class RoleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    getParentAndChildren = (id, arr, obj) => {
        // [基础管理{children: 用户, 增删改, 角色, 资源}]
        let children;
        for(let o of arr){
            // 如果匹配到了,则直接吧children返回
            if(o.key == id){
                children = o.children;
                return children;
            }
            if(o.children != null && o.children.length > 0){
                let r =  this.getParentAndChildren(id, o.children, obj);
                if(r != null){
                    let {label: pLabel, value: pValue} = o;

                    obj.parent = {label: pLabel, value: pValue};
                    obj.child = r;
                    console.log(obj);
                    return;
                }
            }
        }
    }

    /**
     * 树结构转换成简单数组结构  [{label:xx, value:xx},{}]
     * @param tree
     */
    treeToArr = (tree, arr) => {
        console.log(tree);
        for(let obj of tree){
            let {label, value} = obj;
            arr.push({label: label, value: value});
            if(obj.children != null && obj.children.length > 0){
                this.treeToArr(obj.children, arr)
            }
        }
    }

    onChange = (value, label, extra) => {



        // console.log(value)
        // // 当前选择的id
        // let id = extra.triggerValue;
        // // 是选择还是取消选择 true or false
        // let checked = extra.checked;
        // // 将新值存入redux的obj,将obj的子父菜单都选中
        // let arr = this.props.allResources;
        // // 定义变量接收递归过程中取得的值
        // let o = new Object();
        // // 获取值
        // this.getParentAndChildren(id, arr, o);
        // // 父菜单和子菜单
        // const {parent, child} = o;
        // let childrenArr = new Array();
        // this.treeToArr(child,childrenArr)
        // // 如果是选择
        // let roleResources;
        // if (checked) {
        //     // 将子菜单所有值都存入redux的obj中
        //     roleResources = [...value, parent, ...childrenArr];
        // } else {
        //     // 如果是取消选择
        //
        // }
        // console.log(roleResources)
        // // 获取
        // this.props.changeObj({roleResources: roleResources})



        // let roleResources;
        // // // 当前选择的id
        // let id = extra.triggerValue;
        // // // 是选择还是取消选择 true or false
        // let checked = extra.checked;
        // // 获取简单数据格式的tree
        // let checkObj;
        // fetchGet("/role/getSimpleTree", r => {
        //     // 遍历查看,根据用户选择的id获取用户选择的obj
        //     for(var obj of r.data){
        //         if(obj.id == id){
        //             checkObj = obj;
        //         }
        //     }
        //     // 父菜单
        //     let pId = checkObj.pId;
        //     // 查看是否需要添加父菜单,如果父菜单已经在当前用户的选择当中了,则不需要
        //     let flag = true;
        //     console.log(this.props.obj)
        //     for(let item of this.props.obj.resourceIds){
        //         if(item.value == pId){
        //             flag = false;
        //         }
        //     }
        //     let parent;
        //     let childArr = new Array();
        //     // 遍历获取父菜单 与 子菜单
        //     for(var obj of r.data){
        //         // 如果元素的父id是他，则该元素为他的子菜单，并且这个元素的子菜单也要选择
        //         if(id.toString().indexOf(obj.pId) >= 0){
        //             let {label, value} = obj;
        //             childArr.push({label, value});
        //             id = id + "," + obj.id
        //         }
        //         if(obj.id == pId){
        //             // 父菜单
        //             parent = obj;
        //         }
        //     }
        //     if(checked){
        //         // 选择
        //         roleResources = [...value, ...childArr]
        //         if(flag){
        //             roleResources.push(parent)
        //         }
        //     } else {
        //         // 取消选择 子菜单移除,如果当前用户选择的选项中没有pId为父菜单的,则父菜单移除
        //
        //         // 将用户选择的菜单中的子菜单项移除
        //         // for(let i = 0; i < childArr.length; i++){
        //         //     let cId = childArr[i].value;
        //         //     for(let m = 0; m < value.length; m++){
        //         //         let id = value[m].value;
        //         //         if(id == cId){
        //         //             value.splice(m, 1);
        //         //             break;
        //         //         }
        //         //         if(id == parent.value){
        //         //             // 父菜单移除
        //         //             value.splice(m, 1);
        //         //         }
        //         //     }
        //         // }
        //
        //         for(let i = 0; i < value.length; i++){
        //             let id = value[i].value;
        //             if(id == parent.value){
        //                 // 父菜单移除
        //                 value.splice(i, 1);
        //             }
        //             for(let m = 0; m < childArr.length; m++){
        //                 let cId = childArr[m].value;
        //                 if(id == cId){
        //                     value.splice(i, 1);
        //                     break;
        //                 }
        //             }
        //         }
        //         roleResources = [...value]
        //     }
        //     this.props.changeObj({roleResources: roleResources})
        //     console.log(roleResources);
        // })
        this.props.changeObj({roleResources: value})
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {allRoles, obj} = this.props;

        let formLayout = {
            labelCol: {span: 5},
            wrapperCol: {span : 17}
        }
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
                        {getFieldDecorator('id')(<Input type="hidden"/>)}
                    </FormItem>
                    <FormItem label="名称" {...formLayout}>
                        {getFieldDecorator('name')(<Input />)}
                    </FormItem>
                    <FormItem label="编码" {...formLayout}>
                        {getFieldDecorator('code', {})(<Input />)}
                    </FormItem>
                    <FormItem label="权限" {...formLayout}>
                        {getFieldDecorator('resourceIds')(<TreeSelect
                            style={{width: 240}}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={this.props.allResources}
                            placeholder="请选择"
                            treeCheckable={true}
                            treeDefaultExpandAll
                            treeCheckStrictly={true}
                            onChange={this.onChange}
                        />)}
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
        console.log("***********")
        console.log(obj.roleResources);
            return {
                name:Form.createFormField({
                    value: obj.name
                }),
                code:Form.createFormField({
                    value: obj.code
                }),
                resourceIds:Form.createFormField({
                    value:obj.roleResources
                    // value: {value:"1", label:"举出谷"}
                })
            }
        // }
    }
})(RoleForm);
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
)(RoleTable)
