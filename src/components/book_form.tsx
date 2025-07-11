import { useQueryClient } from "@tanstack/react-query";
import { Col, Empty, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { Dispatch, useEffect, useState } from "react";
import useTagsContext from "../context/tags";
import { useBookAddition, useBookEdit } from "../hook/book";
import { BOOK_COVER_URL } from "../service/common";
import { Book, BookAdmin, BookFormValue, TmpCover } from "../types";

interface Props {
  form: any;
  book?: BookAdmin;
  cover?: TmpCover;
  setOpen: Dispatch<boolean>;
  setSave: Dispatch<boolean>;
}

const BookForm: React.FC<Props> = ({ form, book, cover, setOpen, setSave }) => {
  const edit = useBookEdit();
  const add = useBookAddition();
  const [messageApi, contextHolder] = useMessage();
  const queryClient = useQueryClient();
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const { tags } = useTagsContext();

  const handleChange = (_: unknown, values: BookFormValue) => {
    let hasChanges: boolean;
    if (book) {
      let bookTags = book.tags.map((tag) => tag.name);
      hasChanges =
        values.title !== book.title ||
        values.author !== book.author ||
        values.stock !== book.stock ||
        values.description !== book.description ||
        values.tags.some((tag) => !bookTags.includes(tag)) ||
        values.tags.length !== bookTags.length ||
        Math.round(values.price * 100) !== book.price;
    } else {
      hasChanges =
        values.title !== "" &&
        values.author !== "" &&
        values.stock >= 0 &&
        values.description !== "" &&
        values.price > 0 &&
        values.tags.length > 0;
    }
    setSave(hasChanges);
  };

  const handleEditBook = (book: Book, values: BookFormValue) => {
    edit.mutate(
      { id: book.id, body: values },
      {
        onSuccess: (resp) => {
          setOpen(false);
          setSave(false);
          messageApi.success(resp.message);
          queryClient.invalidateQueries({ queryKey: ["admin_books"] });
          queryClient.invalidateQueries({
            queryKey: ["book", book.id.toString()],
          });
        },
        onError: (error) => {
          messageApi.error(error.message);
        },
      },
    );
  };

  const handleAddBook = (values: BookFormValue) => {
    add.mutate(
      {
        coverId: cover ? cover.id : 0,
        ...values,
      },
      {
        onSuccess: (resp) => {
          setOpen(false);
          setSave(false);
          messageApi.success(resp.message);
          queryClient.invalidateQueries({ queryKey: ["admin_books"] });
        },
        onError: (error) => {
          messageApi.error(error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (book && book.cover) {
      setCoverUrl(`${BOOK_COVER_URL}/${book.cover}`);
    } else if (cover) {
      setCoverUrl(`${BOOK_COVER_URL}/${cover.fileName}`);
    }
  }, [book, cover]);

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
            handleEditBook(book, values);
          } else {
            handleAddBook(values);
          }
        }}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book ? book.title : "cover"}
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
                  initialValue={book ? book.stock : 0}
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
              name="tags"
              label="标签"
              initialValue={book ? book.tags.map((tag) => tag.name) : []}
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="请选择或输入标签"
                options={tags.map((tag) => ({ label: tag, value: tag }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="简介"
              initialValue={book ? book.description : ""}
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
