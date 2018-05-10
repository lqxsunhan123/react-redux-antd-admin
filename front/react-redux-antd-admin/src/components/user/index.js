import React from 'react';
import '../../css/user.css';
import {Row, Col, Card} from 'antd';
import SearchForm from './SearchForm'
import UserTable from './UserTable'
class UserComponent extends React.Component {

    render() {
        const {history} = this.props;
        const filed = {supplier: '111', supplier1: '222'}
        return (
                <Row>
                    <Col span={24}>
                        <Card title="Card title" bordered={true}>
                            <Col span={24}>
                                <SearchForm {...filed} history={history} />
                            </Col>
                            <Col span={24} style={{marginTop: '10px'}}>
                                <UserTable history={history} />
                            </Col>
                        </Card>
                    </Col>
                </Row>
        );
    }
}


export default UserComponent;