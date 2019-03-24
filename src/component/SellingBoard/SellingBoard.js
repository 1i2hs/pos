import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import MenuGrid from "./MenuGrid";
import Order from "./Order";
import "./SellingBoard.css";

class SellingBoard extends Component {
  render() {
    return (
      <Row className="SellingBoard" gutter={16}>
        <Col className="SellingBoard-row-col" xs={24} sm={24} lg={12} xl={14}>
          <MenuGrid />
        </Col>
        <Col className="SellingBoard-row-col" xs={24} sm={24} lg={12} xl={10}>
          <Order />
        </Col>
      </Row>
    );
  }
}

export default connect()(SellingBoard);
