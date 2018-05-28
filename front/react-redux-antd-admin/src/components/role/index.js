import React from 'react';
import '../../css/user.css';
import {Row, Col, Card} from 'antd';
import RoleTable from './RoleTable'
class RoleComponent extends React.Component {

    render() {
        return (
                <Row>
                    <Col span={24}>
                        <Card title="角色列表" bordered={true}>
                            <Col span={24} style={{marginTop: '10px'}}>
                                <RoleTable  />
                            </Col>
                        </Card>
                    </Col>
                </Row>
        );
    }
}


export default RoleComponent;