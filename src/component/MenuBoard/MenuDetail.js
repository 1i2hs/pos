import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, InputNumber, Select, Button, Icon, Upload } from "antd";
import { modifyMenu, deleteMenu } from "../../actions";
import "./MenuDetail.css";

const { Option } = Select;

// const uploadButton = (
//   <div>
//     <Icon type="plus" />
//     <div className="ant-upload-text">이미지 업로드</div>
//   </div>
// );

class MenuDetail extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, menu) => {
      if (!err) {
        console.log("Received values of form: ", menu);
        this.props.modifyMenu(menu);
      }
    });
  };

  handleDelete = () => {
    this.props.deleteMenu(this.props.menu);
    this.props.onDelete();
  }

  // normFile = e => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  render() {
    const { style, menu } = this.props;
    const { getFieldDecorator /*getFieldValue*/ } = this.props.form;
    const disabled = menu.mno ? false : true;

    return (
      <Form
        layout="vertical"
        onSubmit={this.handleSubmit}
        style={style}
        className="MenuDetail"
      >
        <Form.Item label="상품번호">
          {getFieldDecorator("mno")(<Input disabled />)}
        </Form.Item>
        <Form.Item label="상품명">
          {getFieldDecorator("mname", {
            rules: [
              {
                required: true,
                message: "필수 입력값입니다."
              }
            ]
          })(<Input disabled={disabled} />)}
        </Form.Item>
        <Form.Item label="종류">
          {getFieldDecorator("mtype", {
            rules: [
              { required: true, message: "상품 종류를 선택해주세요" },
              {
                required: true,
                message: "필수 입력값입니다."
              }
            ]
          })(
            <Select placeholder="상품 종류 선택" disabled={disabled}>
              <Option value="ice">차가운 음료</Option>
              <Option value="hot">뜨거운 음료</Option>
              <Option value="dessert">디저트</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="순서" hasFeedback>
          {getFieldDecorator("mpriority", {
            rules: [
              {
                type: "number",
                message: "순서는 숫자값이어야합니다."
              },
              {
                required: true,
                message: "필수 입력값입니다."
              }
            ]
          })(<InputNumber min={0} disabled={disabled} />)}
        </Form.Item>
        <Form.Item label="금액" hasFeedback>
          {getFieldDecorator("mprice", {
            rules: [
              {
                type: "number",
                message: "금액은 숫자값이어야합니다."
              },
              {
                required: true,
                message: "필수 입력값입니다."
              }
            ]
          })(<InputNumber min={0} disabled={disabled} />)}
        </Form.Item>
        {/* <Form.Item label="이미지 업로드">
          {getFieldDecorator("image", {
            valuePropName: "image",
            getValueFromEvent: this.normFile
          })(
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
            >
              {uploadButton}
              { {getFieldValue("image").length > 1 ? null : uploadButton} }
            </Upload>
          )}
        </Form.Item> */}
        <Form.Item className="MenuDetail-control-pane">
          <Button
            type="danger"
            size="large"
            className="MenuDetail-button-delete"
            disabled={disabled}
            onClick={this.handleDelete}
          >
            삭제하기
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="MenuDetail-button-modify"
            disabled={disabled}
          >
            수정하기
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyMenu: menu => dispatch(modifyMenu(menu)),
  deleteMenu: menu => dispatch(deleteMenu(menu))
});

export default connect(
  null,
  mapDispatchToProps
)(
  Form.create({
    name: "menu_detail",
    mapPropsToFields(props) {
      return {
        mno: Form.createFormField({
          value: props.menu.mno
        }),
        mname: Form.createFormField({
          value: props.menu.mname
        }),
        mtype: Form.createFormField({
          value: props.menu.mtype
        }),
        mpriority: Form.createFormField({
          value: props.menu.mpriority
        }),
        mprice: Form.createFormField({
          value: props.menu.mprice
        })
      };
    }
  })(MenuDetail)
);
