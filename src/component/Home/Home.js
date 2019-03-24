import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import SellingBoard from "../SellingBoard";
import MenuBoard from "../MenuBoard";
import "./Home.css";

const { Content, Sider } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    selectedMenuKey: 0
  };

  handleMenuCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };

  handleMenuSelect = ({ _, key }) => {
    this.setState({
      selectedKey: key
    });
  };

  selectView = key => {
    switch (Number(key)) {
      case 1:
        return <SellingBoard />;
      case 2:
        return <MenuBoard />;
      default:
        return <SellingBoard />;
    }
  };

  render() {
    const { selectedKey } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.handleMenuCollapse}
        >
          <div className="logo">
            <img src="https://via.placeholder.com/48" alt="아이콘" />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onSelect={this.handleMenuSelect}
          >
            <Menu.Item key="1">
              <Icon type="shop" />
              <span>판매 관리</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="file-text" />
              <span>메뉴 관리</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="profile" />
              <span>영수증 관리</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="team" />
              <span>고객 관리</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="line-chart" />
              <span>매출 관리</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "16px 16px" }}>
            {this.selectView(selectedKey)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
