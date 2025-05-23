import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Upload,
  UploadProps,
} from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { Dispatch, useState } from "react";
import { Book, BookFormValue } from "../types";

interface Props {
  book: Book;
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const BookEditDrawer: React.FC<Props> = ({ book, open, setOpen }) => {
  const [messageApi, contextHolder] = useMessage();
  const [save, setSave] = useState(true);

  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    // showUploadList: false,
    withCredentials: true,
    // TODO: add upload url
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    async onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (status === "done") {
        await messageApi.success(
          `${info.file.name} file uploaded successfully.`,
          1,
        );
        // TODO: refresh book info
      } else if (status === "error") {
        await messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        messageApi.error("系统只支持 jpeg 或 png 格式的图片！");
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        messageApi.error("图片大小不能超过 10M");
        return false;
      }
      return true;
    },
  };

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      placement="left"
      size="large"
      title={`编辑: 《${book.title}》`}
      extra={
        <Space>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传封面</Button>
          </Upload>
          <Button type="primary" disabled={save}>
            保存
          </Button>
        </Space>
      }
      destroyOnClose
    >
      {contextHolder}
      <Form
        layout="vertical"
        onValuesChange={(_, values: BookFormValue) => {
          const hasChanges =
            values.title !== book.title ||
            values.author !== book.author ||
            values.stock !== book.stock ||
            values.description !== book.description;
          setSave(!hasChanges);
        }}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{ width: "14em" }}
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无封面"
                />
              )}
            </Flex>
          </Col>
          <Col span={14}>
            <Form.Item
              name="title"
              label="书名"
              initialValue={book.title}
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter book title" />
            </Form.Item>
            <Form.Item
              name="author"
              label="作者"
              initialValue={book.author}
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter book author" />
            </Form.Item>
            <Form.Item
              name="stock"
              label="库存"
              initialValue={book.stock}
              rules={[{ required: true }]}
            >
              <InputNumber min={0} step={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              initialValue={book.description}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter book description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default BookEditDrawer;
