import { useQueryClient } from "@tanstack/react-query";
import { Col, Empty, Flex, Form, Input, InputNumber, Row } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { Dispatch } from "react";
import { useBookEdit } from "../hook/book";
import { BOOK_COVER_URL } from "../service/common";
import { Book, BookFormValue } from "../types";

interface Props {
  form: any;
  book?: Book;
  setOpen: Dispatch<boolean>;
  setSave: Dispatch<boolean>;
}

const BookForm: React.FC<Props> = ({ form, book, setOpen, setSave }) => {
  const edit = useBookEdit();
  const [messageApi, contextHolder] = useMessage();
  const queryClient = useQueryClient();

  const handleChange = (_: unknown, values: BookFormValue) => {
    let hasChanges: boolean;
    if (book) {
      hasChanges =
        values.title !== book.title ||
        values.author !== book.author ||
        values.stock !== book.stock ||
        values.description !== book.description ||
        Math.round(values.price * 100) !== book.price;
    } else {
      hasChanges =
        values.title !== "" &&
        values.author !== "" &&
        values.stock >= 0 &&
        values.description !== "" &&
        values.price > 0;
    }
    setSave(hasChanges);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleChange}
        onFinish={(values: BookFormValue) => {
          values.price = Math.round(values.price * 100);
          if (book) {
            edit.mutate(
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
          } else {
            console.log("Add book", values);
            setOpen(false);
            setSave(false);
            messageApi.success(`添加书籍：${values.title} 成功！`);
          }
        }}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              {book && book.cover ? (
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
              initialValue={book?.title}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入书名" />
            </Form.Item>
            <Form.Item
              name="author"
              label="作者"
              initialValue={book ? book.author : ""}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入作者" />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="stock"
                  label="库存"
                  initialValue={book?.stock}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={0}
                    step={1}
                    style={{ width: "80%" }}
                    placeholder="请设置库存"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="价格"
                  initialValue={book ? (book.price / 100).toFixed(2) : ""}
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
              initialValue={book?.description}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入书籍简介" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BookForm;
