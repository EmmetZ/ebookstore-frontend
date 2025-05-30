import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, List, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router";
import { Book } from "../types";
import BookEditDrawer from "./book_edit_drawer";

interface Props {
  book: Book;
}

const AdminBookItem: React.FC<Props> = ({ book }) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      <List.Item style={{ margin: "0 auto" }}>
        <Row style={{ width: "100%" }} align="middle">
          <Col span={12}>
            <Flex align="center">
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: "6em", marginLeft: "4em" }}
              />
              <Space.Compact direction="vertical" style={{ marginLeft: "3em" }}>
                <Link to={`/book/${book.id}`}>
                  <Typography.Text className="list-book-info hover-underline">
                    {book.title}
                  </Typography.Text>
                </Link>
                <Typography.Text style={{ color: "gray" }}>
                  {book.author}
                </Typography.Text>
              </Space.Compact>
            </Flex>
          </Col>
          <Col span={10}>
            <Typography.Text className="list-book-info">
              销量: {book.sales}
            </Typography.Text>
            <Typography.Text className="list-book-info">
              库存: {book.stock}
            </Typography.Text>
            <Typography.Text className="list-book-info">
              价格：￥{(book.price / 100).toFixed(2)}
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Button
              icon={<EditOutlined />}
              style={{ marginRight: "0.5em" }}
              onClick={() => setOpenEdit(!openEdit)}
            />
          </Col>
        </Row>
      </List.Item>
      <BookEditDrawer book={book} open={openEdit} setOpen={setOpenEdit} />
    </>
  );
};

export default AdminBookItem;
