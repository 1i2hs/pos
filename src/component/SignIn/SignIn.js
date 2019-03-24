import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import "./SignIn.css";

class SignIn extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="SignIn">
        <Form onSubmit={this.handleSubmit} className="SignIn-login-form">
          <div className="SignIn-title">MJ POS</div>
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "아이디를 입력해주세요." }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="아이디"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "비밀번호를 입력해주세요." }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="비밀번호"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="SignIn-login-form-button"
            >
              로그인
            </Button>
          </Form.Item>
          <div className="SignIn-version">ver. 1.0.0</div>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "sign_in" })(SignIn);
