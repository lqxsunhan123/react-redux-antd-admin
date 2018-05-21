import React from 'react';
import '../../css/user.css';
import {Table} from 'antd';
import {Pagination, Modal, Checkbox} from 'antd';
import {Form, Row, Col, Input, Button, Radio} from 'antd';
import {connect} from 'react-redux'
import {getUsers} from '../../actions/user'
import {fetchPost, fetchGet} from '../../utils/fetchUtils'
import {checkSelectedRows, checkSingleRows, wrapIds} from '../../utils/Utils'
import {HasPermission} from '../common'
const CheckboxGroup = Checkbox.Group
const confirm = Modal.confirm;
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
            selectedRowKeys: [],
            objs: [],
            flag: '',
            allRoles: [], // 所有的角色
            userRoleIds: [] // 用户选择的角色id
        }
    }

    showConfirm = () => {
        const {selectedRowKeys} = this.state;
        console.log(selectedRowKeys)
        checkSelectedRows(selectedRowKeys, () => {
            confirm({
                title: '你确实想删除选择项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    fetchPost("/user/del", {ids:selectedRowKeys}, r => {
                        this.clearCheckboxAndRequestUser();
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
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
            selectedRowKeys: []
        })
        this.props.getUsers();
    }

    handleCancel = () => {
        console.log("cancel")
        this.setState({
            visible: false
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        // console.log(pagination);
        // console.log(filters);
        // console.log(sorter);
        const pager = {...this.props.user.pagination};
        pager.current = pagination.current;
        // this.setState({
        //     pagination: pager,
        //     loading: true
        // });
        // this.fetch({
        //     pageSize: pagination.pageSize,
        //     current: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // });
        console.log(pager);
        this.props.getUsers(pager)
    }
    fetch = (params = {current: 1, pageSize: 5}) => {
        console.log("params: ")
        console.log(params);
        const pagination = {...this.state.pagination};
        fetchPost('/user/list', params, (r) => {
            let obj = r.data.data;
            pagination.total = obj.total;
            if (this._isMounted) {
                this.setState({
                    data: obj.result,
                    pagination: pagination,
                    loading: false
                })
            }
        }).catch(e => {
            console.log(e);
        })
        // fetch(history, 'http://localhost:8081/re/user/save').then(r => {
        //     console.log(r);
        // })
    }

    // 获取角色信息的方法,若传入了用户id，则还要查询用户对应的角色
    getRoles = (id) => {
        fetchGet("/user/getAllRoles", r => {
            console.log(r)
            this.setState({allRoles: r.data})
        })
        if (id) {
            fetchGet("/user/getUserRoleIds?userId=" + id, r => {
                console.log(r);
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
        checkSingleRows(this.state.selectedRowKeys, () => {
            // 获取所有角色信息以及该用户现在的角色信息  this.state.objs[0].key是id
            this.getRoles(this.state.objs[0].key);
            this.setState({
                visible: true,
                flag: 'edit'
            })
        });
    }


    componentWillMount() {
        this._isMounted = true;
        this.props.getUsers();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(selectedRowKeys.length)
        this.setState({
            objs: selectedRows,
            selectedRowKeys: selectedRowKeys
        })
    }

    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div>

                <WrappedAdvancedSearchForm obj={this.state.objs[0]} visible={this.state.visible}
                                           handleOk={this.handleOk} handleCancel={this.handleCancel}
                                           flag={this.state.flag} allRoles={this.state.allRoles}
                                           userRoleIds={this.state.userRoleIds}/>


                <HasPermission component={ <Button className="mybtn" onClick={this.showAdd}>Add</Button> } perms="user-save" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showEdit}>Edit</Button> } perms="user-update" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showConfirm}>del</Button> } perms="user-del" />
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.user.data} bordered={true}
                       pagination={this.props.user.pagination} onChange={this.handleTableChange}
                       loading={this.props.user.loading}/>
            </div>
        );
    }
}



class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleOk = () => {
        const {handleOk} = this.props;
        this.props.form.validateFields((e, obj) => {
            if (!e) {
                // 这里需要为对象加上id字段
                handleOk({...obj, id: this.props.obj.key});
            }
        })
        // this.props.form.resetFields();
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
        let disabled = true;
        // 如果是添加的话，则把用户的角色id删掉
        if (flag == 'add') {
            disabled = false;
            // 添加的话把用户的角色id和用户信息都清楚掉
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
    onFieldsChange(props, changedFields) {
        console.log("onFieldsChange:")
        console.log(props);
        console.log(changedFields);
    },
    onValuesChange(props, _value){
        console.log("onValuesChange:")
        console.log(props);
        console.log(_value)
    },
    mapPropsToFields(props){
        console.log("mapPropsToFields:")
        console.log(props);
        let obj = props.obj;
        if (props.flag == 'add') {
            obj = {};
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
    return state;
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    // 获取用户的方法，接收分页器和查询参数
    getUsers: (pagination, params) => dispatch(getUsers(pagination, params)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTable)

// export default withRouter(UserTable);