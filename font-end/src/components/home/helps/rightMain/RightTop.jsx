import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row,Col,Icon,Input,Tooltip} from 'antd';

function mapStateToProps(state) {
    return {

    };
}

class RightTop extends Component {
    render() {
        const data = this.props.data
        return (
            <div className="top">
                <Row>
                    <Col span={8}>
                        To: <span><strong>{data.nickname? data.nickname : data.name}</strong></span>
                    </Col>
                    <Col span={3} offset={10}>
                    <div>
                        Image
                        <Icon type="file-image" />
                        </div>
                    </Col>
                    <Col span={3}>
                    <div>
                        File
                        <Icon type="paper-clip" />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(RightTop);