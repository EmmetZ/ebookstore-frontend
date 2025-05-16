import {
  Card,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Row,
  Space,
  Typography,
} from "antd";
import React from "react";
import { Address, Order } from "../types";
import AddressDetail from "./address_detail";
import CheckoutItemList from "./checkout_item_list";

interface Props {
  order: Order;
}

const OrderListItem: React.FC<Props> = ({ order }) => {
  const date = new Date(order.createdAt);
  const address: Address = {
    address: order.address,
    tel: order.tel,
    receiver: order.receiver,
    id: order.id,
  };

  const getTimeString = () => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  };

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.book.price * item.number,
    0,
  );

  const sum = order.items.reduce((acc, item) => acc + item.number, 0);

  const items: CollapseProps["items"] = [
    {
      key: order.id,
      label: (
        <Flex justify="space-between" align="center">
          <Space>
            <Typography.Title level={4} style={{ margin: 0 }}>
              订单号：{order.id}
            </Typography.Title>
            <Divider type="vertical" />
            <Typography.Text type="secondary">
              下单时间：{`${getTimeString()}`}
            </Typography.Text>
          </Space>
          <Space>
            <Typography.Text type="secondary" style={{ marginRight: "20px" }}>
              共 {sum} 件商品
            </Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              总价：{(totalAmount / 100).toFixed(2)}
            </Typography.Title>
          </Space>
        </Flex>
      ),
      children: (
        <Row gutter={16}>
          <Col span={18}>
            <CheckoutItemList items={order.items} link />
          </Col>
          <Col span={6}>
            <Card title="收货地址" style={{ marginBottom: "20px" }}>
              <AddressDetail address={address} />
            </Card>
            <Card title="订单状态" style={{ marginBottom: "20px" }}>
              <Typography.Text>配送中</Typography.Text>
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Collapse
        style={{
          width: "100%",
        }}
        defaultActiveKey={[order.id]}
        items={items}
      />
    </>
  );
};

export default OrderListItem;
