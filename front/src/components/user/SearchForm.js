import React from 'react';
import '../../css/user.css';
import {Form, Row, Col, Input, Button, Icon} from 'antd';
const FormItem = Form.Item;
class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    // static defaultProps = {
    //     supplier: 'sss'
    // }

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.props)
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    }


    render() {
        console.log(this.props);
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <FormItem label='供应商'>
                            {
                                getFieldDecorator('supplier', {
                                    rules: [{
                                        required: true,
                                        message: 'Input something!',
                                    }],
                                })(<Input  placeholder="placeholder" style={{height: '40px'}}/>)
                            }
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label='供应商2'>
                            {
                                getFieldDecorator('supplier1', {
                                    rules: [{
                                        required: true,
                                        message: 'Input something!',
                                    }],
                                })(<Input placeholder="placeholder" style={{height: '40px'}}/>)
                            }
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label='供应商3'>
                            {
                                getFieldDecorator('supplier2', {
                                    rules: [{
                                        required: true,
                                        message: 'Input something!',
                                    }],
                                })(<Input placeholder="placeholder" style={{height: '40px'}}/>)
                            }
                        </FormItem>
                    </Col>
                    <Col span={6} style={{position:'relative',top:'40px'}}>
                        <Button onClick={(e) => this.handleSearch(e)} style={{marginRight:10}}>Search</Button>
                        <Button onClick={this.handleReset}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
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
        return{}
    }
})(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;