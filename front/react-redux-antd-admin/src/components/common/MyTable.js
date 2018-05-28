import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux'
import {requestData, changeCheckBox} from '../../actions/page'

/**
 * 通用的Table表格组件
 */
class MyTable extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount = () => {
        // 初始化选择框
        this.props.changeCheckBox([],[])
        // isPage,如果为false,则不分页
        this.props.requestData(this.props.url, this.props.isPage);
    }


    handleTableChange = (pagination, filters, sorter) => {
        // 首先获取此时的分页器
        const {pager} = {...this.props.page};
        // 更新当前页信息
        pager.current = pagination.current;
        // 请求
        this.props.requestData(this.props.url, pager)
    }

    render(){
        // 调用时传入columns, isPage是否分页,默认是,当传入false时不分页  ...rest 传入父组件的各种属性
        const {isPage = true, ...rest} = this.props;
        // 从redux中获取当前选择的行key, 分页器, 是否loading, 数据
        let {selectedRowKeys, pager, loading, data} = this.props.page;
        console.log(isPage)
        if(!isPage){
            pager = false;
        }
        const rowSelection = {
            selectedRowKeys,
            /**
             * 勾选复选框时
             * @param selectedRowKeys 当前选择的key数组
             * @param selectedRows 当前选择的所有行
             */

            onChange: (selectedRowKeys, selectedRows) => this.props.changeCheckBox(selectedRowKeys, selectedRows)
        };
        return(
            <Table rowSelection={rowSelection}  dataSource={data} bordered={true}
                   pagination={pager} onChange={this.handleTableChange}
                   loading={loading}  {...rest}  />
        )
    }
}

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
)(MyTable)