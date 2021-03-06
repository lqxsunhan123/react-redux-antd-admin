import React from 'react';
import '../../css/user.css';
import {Row, Col, Card} from 'antd';
import ResourceTable from './ResourceTable'
class ResourceComponent extends React.Component {

    render() {
        return (
                <Row>
                    <Col span={24}>
                        <Card title="Card title" bordered={true}>
                            <Col span={24} style={{marginTop: '10px'}}>
                                <ResourceTable  />
                            </Col>
                        </Card>
                    </Col>
                </Row>
        );
    }
}


export default ResourceComponent;