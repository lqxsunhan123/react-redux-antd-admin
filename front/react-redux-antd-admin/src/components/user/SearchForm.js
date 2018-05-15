import React from 'react';
import '../../css/user.css';
import {Form, Row, Col, Input, Button, Icon} from 'antd';
import {connect} from 'react-redux'
import {getUsers} from '../../actions/user'
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
            console.log(values);
            this.props.getUsers({}, values);
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
                    <Col span={4}>
                        <FormItem label='用户名'>
                            {
                                getFieldDecorator('userName', {
                                })(<Input  placeholder="用户名" />)
                            }
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label='姓名'>
                            {
                                getFieldDecorator('name', {
                                })(<Input placeholder="姓名"/>)
                            }
                        </FormItem>
                    </Col>

                    <Col span={4} style={{position:'relative',top:'4px'}}>
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


const mapStateToProps = (state, ownProps) => {
    return {

    }
}
//
const mapDispatchToProps = (dispatch, ownProps) => ({
    // 获取用户的方法，接收分页器和查询参数
    getUsers: (pagination, params) => dispatch(getUsers(pagination, params)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedAdvancedSearchForm)
// export default WrappedAdvancedSearchForm;