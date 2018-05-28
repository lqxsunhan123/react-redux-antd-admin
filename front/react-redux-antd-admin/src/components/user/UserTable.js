import React from 'react';
import '../../css/user.css';
import {Table} from 'antd';
import {Pagination, Modal, Checkbox} from 'antd';
import {Form, Row, Col, Input, Button, Radio} from 'antd';
import {connect} from 'react-redux'
import {requestData, changeCheckBox} from '../../actions/page'
import {fetchPost, fetchGet} from '../../utils/fetchUtils'
import { checkSingleRows, delData} from '../../utils/Utils'
import {HasPermission, MyTable} from '../common/index'
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item;
const columns = [{
    title: '用户名',
    dataIndex: 'userName',
    render: text => <a href="javascript:;">{text}</a>,
    width: 300
}, {
    title: 'ID',
    dataIndex: 'key',
    width: 100
}, {
    title: '姓名',
    dataIndex: 'name',
    width: 100
}];


class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            flag: '',
            allRoles: [], // 所有的角色
            userRoleIds: [] // 用户选择的角色id
        }
    }

    /**
     * 展示删除数据的modal
     */
    showConfirm = () => {
        const {selectedRowKeys} = this.props.page;
        // 删除数据
        delData(selectedRowKeys, "/user/del", () => {
            this.clearCheckboxAndRequestUser();
        })
    }


    handleOk = (obj) => {
        if (this.state.flag == 'add') {
            fetchPost("/user/save", obj, r => {
                this.clearCheckboxAndRequestUser();
            })
        } else {
            fetchPost("/user/update", obj, r => {
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
        // 请求数据
        this.props.requestData("/user/list");
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }


    // 获取角色信息的方法,若传入了用户id，则还要查询用户对应的角色
    getRoles = (id) => {
        fetchGet("/user/getAllRoles", r => {
            this.setState({allRoles: r.data})
        })
        if (id) {
            fetchGet("/user/getUserRoleIds?userId=" + id, r => {
                this.setState({userRoleIds: r.data})
            })
        }
    }

    showAdd = () => {
        // 获取所有角色信息
        this.getRoles(null);

        this.setState({
            visible: true,
            flag: 'add'
        })
    }

    showEdit = () => {
        // 检查用户选取的行数,如果通过则执行自定义的方法
        checkSingleRows(this.props.page.selectedRowKeys, () => {
            // 获取所有角色信息以及该用户现在的角色信息  this.state.objs[0].key是id
            this.getRoles(this.props.page.obj.key);
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
                                           flag={this.state.flag} allRoles={this.state.allRoles}
                                           userRoleIds={this.state.userRoleIds}/>
                <HasPermission component={ <Button className="mybtn" onClick={this.showAdd}>Add</Button> } perms="user-save" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showEdit}>Edit</Button> } perms="user-update" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showConfirm}>del</Button> } perms="user-del" />
                <MyTable url="/user/list" columns={columns} />
            </div>
        );
    }
}


/**
 * 用户新增时的表单
 */
class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleOk = () => {
        const {handleOk, flag} = this.props;
        this.props.form.validateFields((e, obj) => {
            if (!e) {
                let o = obj;
                // 如果是更新,这里需要为对象加上id字段
                console.log(obj);
                console.log(this.props.obj)
                if(flag == 'edit'){
                    o = {...obj, key: this.props.obj.key}
                }
                console.log(o)
                handleOk(o);
            }
        })
    }

    handleCancel = () => {
        // this.props.form.resetFields();
        this.props.handleCancel();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {allRoles, userRoleIds, flag, obj} = this.props;
        let passwordRules = {}
        // 编辑的时候,密码不为必选项,导致那个红色的提示不在,所以需要价格样式让页面与原来效果一致
        let passwordStyle = {marginLeft: "10px"}
        // 编辑的时候userName是禁止修改的
        let disabled = true;
        // 如果是添加的话，则把用户的角色id删掉
        if (flag == 'add') {
            disabled = false;
            // 添加的话把用户的角色id和用户信息都清除掉
            userRoleIds = [];
            obj = {};
            // 添加的时候密码是必选的
            passwordRules = {rules: [{required: true, message: '请输入密码!'}]}
            passwordStyle = {}
        }
        return (
            <Modal
                title="Basic Modal"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="700px"
                destroyOnClose={true}
                maskClosable={false}
            >
                <Form layout="inline">
                    <FormItem label="用户名">
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input disabled={disabled} />
                        )}
                    </FormItem>
                    <FormItem label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入姓名!'}],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="密&nbsp;&nbsp;&nbsp;&nbsp;码" style={passwordStyle}>
                        {getFieldDecorator('password', passwordRules)(<Input type="password"/>)}
                    </FormItem>
                    <FormItem label="角色" style={{display: 'block', marginLeft: 26}}>
                        {getFieldDecorator('roleIds', {initialValue: userRoleIds})(<CheckboxGroup options={allRoles}/>)}
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
    },
    // 映射字段到表单上
    mapPropsToFields(props){
        // 对象
        let obj = props.obj;
        if (props.flag == 'add') {
            // 如果是添加则不映射数据
            obj = null;
        }
        if (obj != null) {
            return {
                userName: Form.createFormField({
                    value: obj.userName
                }),
                name: Form.createFormField({
                    value: obj.name
                }),
            }
        }
    }
})(UserForm);
const mapStateToProps = (state, ownProps) => {
    return {
        page: state.page
    };
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    // 获取用户的方法，接收分页器和查询参数
    requestData: (url, pagination, params) => dispatch(requestData(url, pagination, params)),
    changeCheckBox: (selectedRowKeys, selectedRows) => dispatch(changeCheckBox(selectedRowKeys, selectedRows))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTable)
