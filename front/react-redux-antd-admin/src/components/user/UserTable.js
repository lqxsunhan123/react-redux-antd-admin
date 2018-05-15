import React from 'react';
import '../../css/user.css';
import {Table} from 'antd';
import {Pagination, Modal} from 'antd';
import {Form, Row, Col, Input, Button, Radio} from 'antd';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getUsers} from '../../actions/user'
import fetch from '../../utils/fetchUtils'
const FormItem = Form.Item;
const columns = [{
    title: '用户名',
    dataIndex: 'userName',
    render: text => <a href="javascript:;">{text}</a>,
    width:300
}, {
    title: 'ID',
    dataIndex: 'key',
    width:100
}, {
    title: '姓名',
    dataIndex: 'name',
    width:100
}];

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     getCheckboxProps: record => ({
//         disabled: record.name === 'Disabled User', // Column configuration not to be checked
//         name: record.name,
//     }),
// };

class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRows: 0,
            objs: [],
            flag: ''
        }
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({
                selectedRows: selectedRows.length,
                objs: selectedRows
            })
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    handleOk = () => {
        console.log("ok");

        this.setState({
            visible: false
        })
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
        fetch('/user/list', params, (r) => {
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

    showAdd = () => {
        if (this.state.selectedRows > 1) {
            alert("只能选择一行")
        } else {
            this.setState({
                visible: true,
                flag: 'add'
            })
        }
    }

    showEdit = () => {
        if (this.state.selectedRows > 1) {
            alert("只能选择一行")
        } else {
            this.setState({
                visible: true,
                flag: 'edit'
            })
        }
    }


    componentWillMount() {
        this._isMounted = true;
        this.props.getUsers();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        let fields;
        if (this.state.flag == 'edit') {
            fields = this.state.objs[0];
            console.log(this.state.flag)
            console.log("fields: " + fields);
        }
        console.log("props--------------------------" + this.props.user.loading)
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <WrappedAdvancedSearchForm {...fields} />
                </Modal>
                <Button className="mybtn" onClick={this.showAdd}>Add</Button>
                <Button className="mybtn" onClick={this.showEdit}>Edit</Button>
                <Button className="mybtn">Add</Button>
                <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.props.user.data} bordered={true}
                       pagination={this.props.user.pagination} onChange={this.handleTableChange}
                       loading={this.props.user.loading}  />
            </div>
        );
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
        return {
            id: Form.createFormField({
                value: props.key
            }),
            userName: Form.createFormField({
                value: props.userName
            }),
            name: Form.createFormField({
                value: props.name
            }),

        }
    }
})((props) => {
    const {getFieldDecorator, getFieldsValue, validateFields} = props.form;
    console.log(validateFields)
    return (
        <Form layout="inline">
            <FormItem label="用户名">
                {getFieldDecorator('userName', {
                    rules: [{required: true, message: 'Please input the title of collection!'}],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="姓名">
                {getFieldDecorator('name')(<Input />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
                {getFieldDecorator('sex', {
                    initialValue: 'public',
                })(
                    <Radio.Group>
                        <Radio value={1}>Public</Radio>
                        <Radio value={2}>Private</Radio>
                    </Radio.Group>
                )}
            </FormItem>
        </Form>
    )
});
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