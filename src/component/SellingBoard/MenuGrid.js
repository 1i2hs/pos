import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";
import { addMenuInOrder } from "../../actions";
import MenuBox from "./MenuBox";
import "./MenuGrid.css";

const tabList = [
  {
    key: "hot",
    tab: "Hot"
  },
  {
    key: "ice",
    tab: "Ice"
  },
  {
    key: "dessert",
    tab: "Dessert"
  }
];

class MenuGrid extends Component {
  state = {
    key: "hot"
  };

  handleTabChange = key => {
    this.setState({ key });
  };

  addMenuInOrderList = menu => {
    this.props.addMenuInOrder(menu);
  };

  buildContent = data => {
    let rows = [];
    let colCount = data.length;
    let sliceCount = Math.ceil(colCount / 4);
    let buffer = [];
    let singleData;
    let index;
    for (let i = 0; i < sliceCount; i++) {
      for (let j = 0; j < 4; j++) {
        index = i * 4 + j;
        if (data[index]) {
          singleData = data[index];
          buffer.push(
            <Col
              md={12}
              xs={12}
              lg={12}
              xl={6}
              className="MenuGrid-row-col"
              key={index}
            >
              <MenuBox
                key={index}
                name={singleData.mname}
                price={singleData.mprice}
                onClick={this.addMenuInOrderList.bind(this, singleData)}
              />
            </Col>
          );
        } else break;
      }
      rows.push(
        <Row gutter={16} className="MenuGrid-row" key={i}>
          {buffer}
        </Row>
      );
      buffer = [];
    }
    return <Fragment>{rows}</Fragment>;
  };

  render() {
    const { menuItems } = this.props;
    const { key } = this.state;
    return (
      <Card
        className="MenuGrid"
        title="메뉴 선택"
        tabList={tabList}
        activeTabKey={this.state.key}
        onTabChange={this.handleTabChange}
      >
        {this.buildContent(
          menuItems.filter(menuItem => key === menuItem.mtype)
        )}
      </Card>
    );
  }
}

MenuGrid.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      mno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      mname: PropTypes.string,
      mtype: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

MenuGrid.defaultProps = {
  menuItems: [
    {
      mno: 0,
      mname: "에스프레소",
      mtype: "hot",
      mprice: 2000
    },
    {
      mno: 1,
      mname: "아메리카노",
      mtype: "hot",
      mprice: 2500
    },
    {
      mno: 2,
      mname: "카페라떼",
      mtype: "hot",
      mprice: 3500
    },
    {
      mno: 3,
      mname: "카푸치노",
      mtype: "hot",
      mprice: 3500
    },
    {
      mno: 4,
      mname: "아이스 아메리카노",
      mtype: "ice",
      mprice: 3000
    },
    {
      mno: 5,
      mname: "아이스 카페레떼",
      mtype: "ice",
      mprice: 4000
    },
    {
      mno: 6,
      mname: "아이스 카푸치노",
      mtype: "ice",
      mprice: 4000
    },
    {
      mno: 7,
      mname: "티라미수",
      mtype: "dessert",
      mprice: 5000
    },
    {
      mno: 8,
      mname: "쇼콜라 케이크",
      mtype: "dessert",
      mprice: 5000
    }
  ]
};

const mapDispatchToProps = dispatch => ({
  addMenuInOrder: menu => dispatch(addMenuInOrder(menu))
});

export default connect(
  null,
  mapDispatchToProps
)(MenuGrid);
