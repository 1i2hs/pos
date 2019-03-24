import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Table, Row, Col, Button, Modal, Input } from "antd";
import {
  incrementMenuCount,
  decrementMenuCount,
  deleteMenuInOrder,
  deleteAllMenuInOrder
} from "../../actions";
import { formatPriceString } from "../../util";
import "./Order.css";

const confirm = Modal.confirm;

const columns = [
  {
    title: "상품명",
    dataIndex: "mname"
  },
  {
    title: "수량",
    dataIndex: "mcount"
  },
  {
    title: "가격",
    dataIndex: "mnetsales",
    render: (text, row, index) => `${formatPriceString(text)} 원`
  }
];

const calculateTotalPrice = order => {
  return order.reduce(
    (prevTotalPrice, menu) => menu.mnetsales + prevTotalPrice,
    0
  );
};

class Order extends Component {
  state = {
    selectedMenu: null,
    phoneNumber: ""
  };

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value;
    this.setState({
      phoneNumber
    });
  };

  increment = () => {
    const { selectedMenu } = this.state;
    if (selectedMenu) {
      this.props.increment(selectedMenu);
    }
  };

  decrement = () => {
    const { selectedMenu } = this.state;
    if (selectedMenu) {
      this.props.decrement(selectedMenu);
    }
  };

  deleteMenu = () => {
    const { selectedMenu } = this.state;
    if (selectedMenu) {
      this.props.deleteMenu(selectedMenu);
      this.setState({
        selectedMenu: null
      });
    }
  };

  deleteAllMenu = () => {
    this.props.deleteAllMenu();
    this.setState({
      selectedMenu: null
    });
  };

  cashPayment = () => {
    confirm({
      title: "현금 결제 처리하시겠습니까?",
      content: (
        <div className="Order-input-point">
          <div className="Order-input-point-title">
            포인트를 적립하시려면 전화번호를 입력해주세요
          </div>
          <Input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            onChange={this.handlePhoneNumberChange}
          />
        </div>
      ),
      okText: "예",
      cancelText: "아니오",
      onOk() {
        // TODO http request for cash payment
        this.deleteAllMenu();
      }
    });
  };

  creditCardPayment = () => {
    confirm({
      title: "카드 결제 처리하시겠습니까?",
      content: (
        <div className="Order-input-point">
          <div className="Order-input-point-title">
            포인트를 적립하시려면 전화번호를 입력해주세요
          </div>
          <Input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            onChange={this.handlePhoneNumberChange}
          />
        </div>
      ),
      okText: "예",
      cancelText: "아니오",
      onOk() {
        // TODO http request for credit card payment
        this.deleteAllMenu();
      }
    });
  };

  render() {
    const { order } = this.props;
    const { selectedMenu } = this.state;
    return (
      <Card
        className="Order"
        title="주문서"
        bodyStyle={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Table
            columns={columns}
            dataSource={order}
            pagination={false}
            rowSelection={{
              type: "radio",
              selectedRowKeys: selectedMenu ? [selectedMenu.key] : []
            }}
            onRow={(record, _) => ({
              onClick: _ => {
                this.setState({
                  selectedMenu: record
                });
              }
            })}
          />
          <div className="Order-control-button-pane">
            <div className="Order-total-price-row">
              {`총계 : ${formatPriceString(calculateTotalPrice(order))} 원`}
            </div>
            <Row className="Order-control-button-row" gutter={8}>
              <Col span={6}>
                <Button onClick={this.decrement} disabled={!selectedMenu}>
                  -1
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={this.increment} disabled={!selectedMenu}>
                  +1
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  onClick={this.deleteMenu}
                  type="danger"
                  disabled={!selectedMenu}
                >
                  삭제
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  onClick={this.deleteAllMenu}
                  type="danger"
                  disabled={order.length === 0}
                >
                  전체삭제
                </Button>
              </Col>
            </Row>
            <Row className="Order-control-button-row" gutter={8}>
              <Col span={12}>
                <Button
                  onClick={this.cashPayment}
                  type="primary"
                  size="large"
                  disabled={order.length === 0}
                >
                  현금결제
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={this.creditCardPayment}
                  type="primary"
                  size="large"
                  disabled={order.length === 0}
                >
                  카드결제
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    );
  }
}

Order.propTypes = {
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      mno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      mname: PropTypes.string,
      mtype: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      mcount: PropTypes.number
    })
  )
};

const mapStateToProps = (state, ownProps) => ({
  order: state.order
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: menu => dispatch(incrementMenuCount(menu)),
  decrement: menu => dispatch(decrementMenuCount(menu)),
  deleteMenu: menu => dispatch(deleteMenuInOrder(menu)),
  deleteAllMenu: () => dispatch(deleteAllMenuInOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
