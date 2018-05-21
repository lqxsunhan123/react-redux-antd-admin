import React from 'react';
import '../../css/user.css';
import {Row, Col, Card} from 'antd';
import SearchForm from './SearchForm'
import MyTable from './MyTable'
class ResourceComponent extends React.Component {

    render() {
        return (
                <Row>
                    <Col span={24}>
                        <Card title="Card title" bordered={true}>
                            <Col span={24}>
                                <SearchForm  />
                            </Col>
                            <Col span={24} style={{marginTop: '10px'}}>
                                <MyTable  />
                            </Col>
                        </Card>
                    </Col>
                </Row>
        );
    }
}


export default ResourceComponent;