import React, { Component } from "react";
import { Form, Input, InputNumber, Select, Button, Upload, Modal } from "antd";
import "./NewMenu.css";

const { Option } = Select;

// const uploadButton = (
//   <div>
//     <Icon type="plus" />
//     <div className="ant-upload-text">이미지 업로드</div>
//   </div>
// );

class NewMenu extends Component {
  // normFile = e => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="새로운 메뉴 추가"
        okText="추가"
        cancelText="취소"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          className="NewMenu"
        >
          <Form.Item label="상품명">
            {getFieldDecorator("mname", {
              rules: [
                {
                  required: true,
                  message: "필수 입력값입니다."
                }
              ]
            })(<Input />)}
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
              <Select placeholder="상품 종류 선택">
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
            })(<InputNumber min={0} />)}
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
            })(<InputNumber min={0} />)}
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
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "form_in_modal" })(NewMenu);
