
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import fetch from '../../utils/fetchUtils'

import {
    withRouter,
    Redirect,
} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refer: false
        }
    }

    handleSubmit = (e) => {
        const {history} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch( history, '/login', values, (r) => {
                    console.log(r.data.status);
                    let map = r.data;
                    if (map.status == 1) {
                        let d = map.data;
                        localStorage.setItem("token", d.token);
                        localStorage.setItem("menus", JSON.stringify(d.menus));
                        this.setState({refer: true})
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        if (this.state.refer) {
            return <Redirect to={from}/>
        }

        return (
            <Row justify='center' type="flex" align="middle" style={{height: '100%'}}>
                <Col md={4}>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}
const WrappedNormalLoginForm = withRouter(Form.create()(NormalLoginForm));
export default WrappedNormalLoginForm;