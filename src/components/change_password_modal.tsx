import { RightOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Modal, Steps } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useState } from "react";
import useUserContext from "../context/user";
import { useLogout } from "../hook/user";
import { login, updatePassword } from "../service/user";
import { PasswordFormValue } from "../types";
import handleResponse from "../utils/message";

interface VerifyFormProps {
  form: FormInstance;
  onFinish: (value: PasswordFormValue) => void;
}

interface ChangePasswordFormValue {
  password1: string;
  password2: string;
}

interface ChangePasswordFormProps {
  form: FormInstance;
  onFinish: (value: ChangePasswordFormValue) => void;
}

const ChangePasswordModal: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setCurrent(0);
  };
  const [form] = Form.useForm();
  const { user } = useUserContext();
  const [messageApi, contextHolder] = useMessage();
  const logout = useLogout(messageApi);

  const verify = async (value: PasswordFormValue) => {
    if (!user) {
      return;
    }
    const result = await login({
      username: user.username,
      password: value.password,
    });
    if (!result.ok) {
      messageApi.error("输入密码错误", 3);
      form.resetFields();
      return;
    }
    setCurrent(1);
  };

  const onFinish = async (value: ChangePasswordFormValue) => {
    if (value.password1 !== value.password2) {
      messageApi.error("两次输入的密码不一致", 3);
    }
    try {
      const result = await updatePassword({ password: value.password1 });
      handleResponse(result, messageApi);
      logout.mutate();
    } catch {
      messageApi.error("修改密码失败", 3);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        danger
        style={{ marginTop: "20px" }}
        onClick={openModal}
      >
        修改密码
      </Button>
      <Modal
        onCancel={closeModal}
        okText="提交"
        cancelText="取消"
        destroyOnClose
        open={isModalOpen}
        onClose={closeModal}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        footer={(_, { CancelBtn }) => {
          return (
            <>
              <CancelBtn />
              {current === 0 ? (
                <Button
                  type="primary"
                  icon={<RightOutlined />}
                  onClick={() => form.submit()}
                />
              ) : (
                <Button type="primary" onClick={() => form.submit()}>
                  提交
                </Button>
              )}
            </>
          );
        }}
      >
        <Steps
          current={current}
          items={[
            {
              title: "验证",
            },
            {
              title: "修改密码",
            },
          ]}
          style={{ padding: "20px 0" }}
        />
        {current === 0 && <VerifyForm form={form} onFinish={verify} />}
        {current === 1 && <PasswordForm form={form} onFinish={onFinish} />}
      </Modal>
    </>
  );
};

const VerifyForm: React.FC<VerifyFormProps> = ({ form, onFinish }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ modifier: "public" }}
      clearOnDestroy
      onFinish={onFinish}
    >
      <Form.Item
        name="password"
        label="请输入旧密码"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

const PasswordForm: React.FC<ChangePasswordFormProps> = ({
  form,
  onFinish,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      clearOnDestroy
      onFinish={onFinish}
    >
      <Form.Item
        name="password1"
        label="请输入新密码"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password2"
        label="请再次输入新密码"
        rules={[
          { required: true, message: "Please input your new password again!" },
        ]}
      >
        <Input.Password visibilityToggle={false} />
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordModal;
