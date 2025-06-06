import { Card, Col, Flex, List, Row, Space, Typography } from "antd";
import React from "react";
import { CartItem } from "../types";
import { Link } from "react-router";
import { BOOK_COVER_URL } from "../service/common";

interface Props {
  items: CartItem[];
  link?: boolean;
}

const CheckoutItemList: React.FC<Props> = ({ items, link = false }) => {
  return (
    <>
      <Card title="订单商品" style={{ marginBottom: "20px" }}>
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Row align="middle" style={{ width: "100%" }}>
                <Col span={19}>
                  <Space>
                    <img
                      src={`${BOOK_COVER_URL}/${item.book.cover}`}
                      alt={item.book.title}
                      style={{ width: "100px", marginRight: "20px" }}
                    />
                    <Flex vertical style={{ flex: 1 }}>
                      {link ? (
                        <Link
                          to={`/book/${item.book.id}`}
                          className="hover-underline"
                        >
                          <Typography.Text strong style={{ fontSize: "1.2em" }}>
                            {item.book.title}
                          </Typography.Text>
                        </Link>
                      ) : (
                        <Typography.Text strong style={{ fontSize: "1.2em" }}>
                          {item.book.title}
                        </Typography.Text>
                      )}
                      <Typography.Text type="secondary">
                        {item.book.author}
                      </Typography.Text>
                    </Flex>
                  </Space>
                </Col>
                <Col span={2}>
                  <Typography.Text>x{item.number}</Typography.Text>
                </Col>
                <Col span={3}>
                  <Typography.Text
                    style={{
                      marginLeft: "20px",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                    }}
                  >
                    ¥{((item.book.price * item.number) / 100).toFixed(2)}
                  </Typography.Text>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default CheckoutItemList;
