import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, theme } from "antd";
import useMessage from "antd/es/message/useMessage";
import Title from "antd/es/typography/Title";
import React from "react";
import { Link } from "react-router";
import { useLogin } from "../hook/user";
import { LoginFormValue } from "../types";
import { LoginLayout } from "./layout";

const { useToken } = theme;

const LoginPage: React.FC = () => {
  const { token } = useToken();
  const [messageApi, contextHolder] = useMessage();
  const mutation = useLogin(messageApi);
  const onFinish = (values: LoginFormValue) => {
    if (values) {
      mutation.mutate(values);
    }
  };

  return (
    <LoginLayout>
      {contextHolder}
      <div className="loginbox">
        <Flex align="center" vertical>
          <Title level={1}>Book Store</Title>
          <Title level={5}>电子书城</Title>
        </Flex>
        <Form
          name="login"
          style={{ padding: "10px 0" }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "10px" }}>
            <Flex justify="space-between" align="center">
              <Checkbox>下次自动登录</Checkbox>
              <a href="" style={{ color: token.colorPrimary }}>
                忘记密码
              </a>
            </Flex>
          </Form.Item>
          <Form.Item style={{ marginBottom: "5px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
            >
              登录
            </Button>
            <Flex justify="center" style={{ marginTop: "10px" }}>
              <Link to="/register" style={{ color: token.colorPrimary }}>
                新用户？点击注册
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
