import { Card, Col, Flex, List, Row, Space, Typography } from "antd";
import React from "react";
import { CartItem } from "../types";

interface Props {
  items: CartItem[];
}

const CheckoutItemList: React.FC<Props> = ({ items }) => {
  return (
    <>
      <Typography.Title level={3}>订单结算</Typography.Title>

      <Card title="订单商品" style={{ marginBottom: "20px" }}>
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Row align="middle" style={{ width: "100%" }}>
                <Col span={19}>
                  <Space>
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      style={{ width: "100px", marginRight: "20px" }}
                    />
                    <Flex vertical style={{ flex: 1 }}>
                      <Typography.Text strong style={{ fontSize: "1.2em" }}>
                        {item.book.title}
                      </Typography.Text>
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
