import React from 'react';
import '../../css/user.css';
import {Table} from 'antd';
import {Pagination, Modal} from 'antd';
import {Form, Row, Col, Input, Button, Radio} from 'antd';
import {fetchPost} from '../../utils/fetchUtils'
import {HasPermission} from '../common'
const FormItem = Form.Item;
const columns = [{
    title: '用户名',
    dataIndex: 'userName',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'ID',
    dataIndex: 'key',
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
const pageObj = {
    defaultPageSize: 5
}

class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            pagination: {defaultPageSize: 5},
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
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
            loading: true
        });
        this.fetch({
            pageSize: pagination.pageSize,
            current: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = {current: 1, pageSize: 5}) => {

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
        // this.fetch();
    }

    componentWillUnmount() {
    }

    render() {
        let fields;
        if (this.state.flag == 'edit') {
            fields = this.state.objs[0];
            console.log(this.state.flag)
            console.log("fields: " + fields);
        }

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
                <HasPermission component={ <Button className="mybtn" onClick={this.showAdd}>Add</Button> } perms="resource-save" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showEdit}>Edit</Button> } perms="resource-update" />
                <HasPermission component={ <Button className="mybtn" onClick={this.showConfirm}>del</Button> } perms="resource-del" />
                <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.state.data} bordered={true}
                       pagination={this.state.pagination} onChange={this.handleTableChange}
                       loading={this.state.loading}/>
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
    },
    mapPropsToFields(props){
        console.log("mapPropsToFields:")
        console.log(props);
        return {
            id: Form.createFormField({
                value: props.key
            }),
            name: Form.createFormField({
                value: props.userName
            }),

        }
    }
})((props) => {
    const {getFieldDecorator, getFieldsValue} = props.form;
    return (
        <Form layout="vertical">
            <FormItem label="姓名">
                {getFieldDecorator('name', {
                    rules: [{required: true, message: 'Please input the title of collection!'}],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="ID">
                {getFieldDecorator('id')(<Input type="textarea"/>)}
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
export default MyTable;