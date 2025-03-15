import { Button, Form, Input, Modal, Typography } from "antd";
import React, { useState } from "react";
import useUserContext from "../context/user";
import { EditOutlined } from "@ant-design/icons";
import { IntroFormValue } from "../types";
import { useUpdateIntro } from "../hook/user";
import useMessage from "antd/es/message/useMessage";

const { TextArea } = Input;

const Introduction: React.FC = () => {
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const mutation = useUpdateIntro();
  const openModal = () => {
    setModalOpen(true);
    form.setFieldsValue({ introduction: user?.introduction || "" });
  };

  const closeModal = () => setModalOpen(false);
  const onFinish = (value: IntroFormValue) => {
    mutation.mutate(value, {
      onSuccess: () => {
        messageApi.success("更新成功");
        closeModal();
      },
      onError: () => messageApi.error("更新失败"),
    });
  };

  return (
    <>
      {contextHolder}
      {user && (
        <>
          <Typography.Text className="profile-introduction">
            {user.introduction ? user.introduction : "这个人很懒，什么都没写"}
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={openModal}
              style={{
                marginLeft: "10px",
                border: "none",
                boxShadow: "none",
                background: "transparent",
              }}
            />
          </Typography.Text>
          <Modal
            open={isModalOpen}
            onCancel={closeModal}
            okText="提交"
            cancelText="取消"
            destroyOnClose
            okButtonProps={{ autoFocus: true, htmlType: "submit" }}
            modalRender={(dom) => (
              <Form
                layout="vertical"
                form={form}
                name="form_in_modal"
                onFinish={onFinish}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item label="个人简介" name="introduction">
              <TextArea
                autoSize={{ minRows: 3, maxRows: 6 }}
                showCount
                maxLength={500}
              />
            </Form.Item>
          </Modal>
        </>
      )}
    </>
  );
};

export default Introduction;
