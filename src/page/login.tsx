import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Space, theme } from "antd";
import useMessage from "antd/es/message/useMessage";
import Title from "antd/es/typography/Title";
import React from "react";
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
      <div
        style={{
          backgroundImage: "url(/login.jpg)",
          backgroundSize: "cover",
          overflow: "auto", // 避免 css margin collapse
          height: "100%",
        }}
      >
        <div className="loginbox">
          <Flex align="center" vertical>
            <Space>
              <Title level={1} style={{ margin: "20px 0px 0px 0px" }}>
                Book Store
              </Title>
            </Space>
            <Title level={5} style={{ margin: "5px 0px 10px 0px" }}>
              电子书城
            </Title>
          </Flex>
          <Form
            name="login"
            // initialValues={{ remember: true }}
            style={{ padding: "20px" }}
            onFinish={onFinish}
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
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Checkbox>下次自动登录</Checkbox>
                <a href="" style={{ color: token.colorPrimary }}>
                  忘记密码
                </a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={mutation.isPending}
              >
                登录
              </Button>
              <Space style={{ marginTop: "10px" }}>
                <a href="" style={{ color: token.colorPrimary }}>
                  新用户？点击注册
                </a>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
