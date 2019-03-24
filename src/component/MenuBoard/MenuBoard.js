import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Button } from "antd";
import MenuList from "./MenuList";
import MenuDetail from "./MenuDetail";
import NewMenu from "./NewMenu";
import { addMenu } from "../../actions";
import "./MenuBoard.css";

class MenuBoard extends Component {
  state = {
    selectedMenu: {
      mno: "",
      mname: "",
      mtype: "",
      mpriority: 0,
      mprice: 0
    },
    visible: false
  };

  handleMenuSelect = menu => {
    this.setState({
      selectedMenu: menu
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, menu) => {
      if (err) {
        return;
      }

      const newMenu = Object.assign({}, menu, {
        mno: Math.round(Date.now() / 1000)
      });
      this.props.addMenu(newMenu);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleDelete = () => {
    this.setState({
      selectedMenu: {
        mno: "",
        mname: "",
        mtype: "",
        mpriority: 0,
        mprice: 0
      }
    });
  };

  render() {
    const { menu, style } = this.props;
    const { selectedMenu, visible } = this.state;

    return (
      <Fragment>
        <Card className="MenuBoard" title="메뉴 관리" style={style}>
          <div className="MenuBoard-control-pane">
            <Button type="primary" icon="plus" onClick={this.showModal}>
              메뉴 추가
            </Button>
          </div>
          <Row>
            <Col sm={24} lg={12}>
              <MenuList
                menu={menu.map(menu => ({ ...menu, key: menu.id }))}
                onSelectMenu={this.handleMenuSelect}
              />
            </Col>
            <Col sm={24} lg={12}>
              <MenuDetail menu={selectedMenu} onDelete={this.handleDelete} />
            </Col>
          </Row>
        </Card>
        <NewMenu
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  menu: state.menu
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addMenu: menu => dispatch(addMenu(menu))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBoard);
