import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, theme } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { Link } from "react-router";
import { LoginLayout } from "./layout";

const { useToken } = theme;

const RegisterPage: React.FC = () => {
  const { token } = useToken();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };

  return (
    <LoginLayout>
      <div className="loginbox">
        <Flex align="center" vertical>
          <Title level={1}>Book Store</Title>
          <Title level={5}>电子书城</Title>
        </Flex>
        <Form
          name="register"
          style={{ padding: "10px 0" }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
            style={{ marginBottom: "2em" }}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { type: "email", message: "输入格式错误" },
              { required: true, message: "请输入您的邮箱!" },
            ]}
            style={{ marginBottom: "2em" }}
          >
            <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认您的密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("两次输入的密码不一致，请重新输入！"),
                  );
                },
              }),
            ]}
            style={{ marginBottom: "2em" }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请确认密码"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "5px" }}>
            <Button block type="primary" htmlType="submit">
              注册
            </Button>
            <Flex justify="center" style={{ marginTop: "10px" }}>
              <Link to="/login" style={{ color: token.colorPrimary }}>
                已有账号？点击登录
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </LoginLayout>
  );
};

export default RegisterPage;
