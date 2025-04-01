import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Col,
    Flex,
    InputNumber,
    List,
    Row,
    Space,
    Typography,
} from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useSumContext from "../context/sum";
import { useDeleteCartItem, useModifyCartItem } from "../hook/cart";
import { CartItem } from "../types";

interface Props {
  item: CartItem;
}

const CartListItem: React.FC<Props> = ({ item }) => {
  const [isSelected, setSelect] = useState(false);
  const [count, setCount] = useState(item.number || 1);
  const { setSum } = useSumContext();
  const [messageApi, contextHolder] = useMessage();
  const modifyCartItem = useModifyCartItem(messageApi);
  const deleteCartItem = useDeleteCartItem(messageApi);
  const [isHover, setHover] = useState(false);

  const { book } = item;

  useEffect(() => {
    if (item.number && item.number !== count) {
      setCount(item.number);
    }
  }, [item.number]);

  const handleSelect = (price: number) => {
    setSelect(!isSelected);
    setSum((prev) =>
      isSelected ? prev - price * count : prev + price * count,
    );
  };

  const handleChangeCount = (value: number) => {
    modifyCartItem.mutate({ id: item.id, num: count + value });
    setSum((prev) => (isSelected ? prev + book.price * value : prev));
  };

  const handleDelete = () => {
    deleteCartItem.mutate(item.id);
    setSum((prev) => (isSelected ? prev - book.price * count : prev));
  };

  const setBgColor = () => {
    if (isHover && !isSelected) {
      return "#0000000f";
    }
    if (isSelected) {
      return "#0000000a";
    }
    return "white";
  };

  return (
    <List.Item
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: setBgColor(),
        transition: "0.25s ease-in-out",
      }}
    >
      {contextHolder}
      <Row style={{ width: "100%" }} align="middle">
        <Col span={19}>
          <Flex align="center">
            <Checkbox onClick={() => handleSelect(book.price)} />
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: "8em", marginLeft: "4em" }}
            />
            <Space.Compact direction="vertical" style={{ marginLeft: "3em" }}>
              <Link to={`/book/${book.id}`}>
                <Typography.Text className="cart-book-info hover-underline">
                  {book.title}
                </Typography.Text>
              </Link>
              <Typography.Text style={{ color: "gray" }}>
                {book.author}
              </Typography.Text>
            </Space.Compact>
          </Flex>
        </Col>
        <Col span={4}>
          <Space.Compact style={{ marginRight: "3em" }}>
            <Button
              icon={<PlusOutlined />}
              size="small"
              style={{ backgroundColor: "#00000005" }}
              onClick={() => handleChangeCount(1)}
              disabled={count === 10}
            />
            <InputNumber
              value={count}
              readOnly
              size="small"
              style={{ width: "3em" }}
            />
            <Button
              icon={<MinusOutlined />}
              size="small"
              style={{ backgroundColor: "#00000005" }}
              onClick={() => handleChangeCount(-1)}
              disabled={count === 1}
            />
          </Space.Compact>
          <Typography.Text className="cart-book-info">
            ￥{(book.price / 100).toFixed(2)}
          </Typography.Text>
        </Col>
        <Col span={1}>
          <Button icon={<DeleteOutlined />} onClick={handleDelete} />
        </Col>
      </Row>
    </List.Item>
  );
};

export default CartListItem;
