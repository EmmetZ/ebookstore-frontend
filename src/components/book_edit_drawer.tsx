import { UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
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
import ImgCrop from "antd-img-crop";
import useMessage from "antd/es/message/useMessage";
import React, { Dispatch, useState } from "react";
import { useBookEdit } from "../hook/book";
import { BOOK_COVER_URL, PREFIX } from "../service/common";
import { Book, BookFormValue } from "../types";

interface Props {
  book: Book;
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const BookEditDrawer: React.FC<Props> = ({ book, open, setOpen }) => {
  const [messageApi, contextHolder] = useMessage();
  const [save, setSave] = useState(false);
  const [form] = Form.useForm();
  const mutation = useBookEdit();
  const queryClient = useQueryClient();

  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    showUploadList: false,
    withCredentials: true,
    action: `${PREFIX}/book/${book.id}/cover`,
    async onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (status === "done") {
        setOpen(false);
        await messageApi.success(
          `${info.file.name} file uploaded successfully.`,
          1,
        );
        queryClient.invalidateQueries({ queryKey: ["books"] });
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
    <>
      {contextHolder}
      <Drawer
        open={open}
        onClose={() => {
          setSave(false);
          setOpen(false);
          form.resetFields();
        }}
        placement="left"
        size="large"
        title={`编辑: 《${book.title}》`}
        extra={
          <Space>
            <ImgCrop
              showGrid
              showReset
              rotationSlider
              modalOk="确定"
              modalCancel="取消"
              minZoom={0.5}
              quality={1}
              aspect={1}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传封面</Button>
              </Upload>
            </ImgCrop>
            <Button
              type="primary"
              disabled={!save}
              onClick={() => form.submit()}
            >
              保存
            </Button>
          </Space>
        }
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values: BookFormValue) => {
            const hasChanges =
              values.title !== book.title ||
              values.author !== book.author ||
              values.stock !== book.stock ||
              values.description !== book.description ||
              Math.round(values.price * 100) !== book.price;

            setSave(hasChanges);
          }}
          onFinish={(values: BookFormValue) => {
            values.price = Math.round(values.price * 100);
            mutation.mutate(
              { id: book.id, body: values },
              {
                onSuccess: (resp) => {
                  setOpen(false);
                  setSave(false);
                  messageApi.success(resp.message);
                  queryClient.invalidateQueries({ queryKey: ["books"] });
                },
                onError: (error) => {
                  messageApi.error(`图书信息修改失败: ${error.message}`);
                },
              },
            );
          }}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Flex justify="center" align="center" style={{ height: "100%" }}>
                {book.cover ? (
                  <img
                    src={`${BOOK_COVER_URL}/${book.cover}`}
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
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label="库存"
                    initialValue={book.stock}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} step={1} style={{ width: "80%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="价格"
                    initialValue={(book.price / 100).toFixed(2)}
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      min={0}
                      step={1}
                      prefix="¥"
                      precision={2}
                      style={{ width: "80%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="简介"
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
    </>
  );
};

export default BookEditDrawer;
