import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, List, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useAddress, useHandleAddress } from "../hook/address";
import { AddressFormValue } from "../types";
import AddressItem from "./address_item";
import useMessage from "antd/es/message/useMessage";

const AddressCard: React.FC = () => {
  const [form] = Form.useForm();
  const { data } = useAddress();
  const [isModalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const mutation = useHandleAddress();
  const handleDelete = (id: number) => {
    mutation.mutate(
      { type: "delete", body: id },
      {
        onSuccess: () => messageApi.success("删除成功"),
        onError: () => messageApi.error("删除失败"),
      },
    );
  };
  const handleAdd = (body: AddressFormValue) => {
    console.log(body);
    mutation.mutate(
      { type: "add", body },
      {
        onSuccess: () => {
          messageApi.success("添加成功");
          closeModal();
        },
        onError: () => messageApi.error("添加失败"),
      },
    );
    closeModal();
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {contextHolder}
      <List
        style={{
          marginTop: "20px",
        }}
        header={
          <Flex justify="space-between" align="center">
            <div>
              <HomeOutlined style={{ fontSize: "1.5em" }} />
              <Typography.Text
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5em",
                  marginLeft: "10px",
                }}
              >
                地址
              </Typography.Text>
            </div>
            <Button
              icon={<PlusCircleOutlined />}
              shape="circle"
              onClick={openModal}
            />
          </Flex>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <AddressItem address={item} handleDelete={handleDelete} />
        )}
      />
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
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={handleAdd}
          >
            {dom}
          </Form>
        )}
      >
        <AddressForm />
      </Modal>
    </>
  );
};

const AddressForm: React.FC = () => {
  return (
    <>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: "请输入收货地址" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="收件人"
        name="receiver"
        rules={[{ required: true, message: "请输入收件人姓名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="联系方式"
        name="tel"
        rules={[{ required: true, message: "请输入联系方式" }]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default AddressCard;
