import { ExclamationCircleOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Space, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React from "react";
import { useAddToCart, useCart } from "../hook/cart";
import { Book } from "../types";

interface Props {
  book: Book;
}

const PriceCard: React.FC<Props> = ({ book }) => {
  const [messageApi, contextHolder] = useMessage();
  const mutation = useAddToCart(messageApi);
  const { data: cart } = useCart();

  const isBookInCart = cart?.some((item) => item.book.id === book.id) || false;

  return (
    <>
      {contextHolder}
      <Flex style={{ marginBottom: "1em" }}>
        <Card
          styles={{
            body: {
              padding: "5px 24px",
            },
          }}
          style={{
            borderWidth: "0px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Space.Compact direction="vertical">
            <Space>
              <Typography.Text
                style={{
                  color: "gray",
                  marginTop: "5px",
                  marginRight: "10px",
                }}
              >
                折扣价
              </Typography.Text>
              <Typography.Title
                level={2}
                style={{
                  margin: "0 0 5px 0",
                  color: "#e4393c",
                }}
              >
                ¥{book.price / 100}
              </Typography.Title>
            </Space>
            <Typography.Text className="price-info">
              <ExclamationCircleOutlined /> 不包含运费
            </Typography.Text>
            <Typography.Text className="price-info">
              <TagsOutlined /> 更多优惠信息，详见店铺活动
            </Typography.Text>
          </Space.Compact>
        </Card>
      </Flex>
      <Space>
        <Button
          onClick={() => mutation.mutate(book.id)}
          disabled={isBookInCart}
        >
          {isBookInCart ? "已加入购物车" : "加入购物车"}
        </Button>
        <Button type="primary">立即购买</Button>
      </Space>
    </>
  );
};

export default PriceCard;
