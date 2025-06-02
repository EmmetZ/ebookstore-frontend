import React from "react";
import { CartItem } from "../types";
import { Empty, List } from "antd";
import CartListItem from "./cart_item";

interface Props {
  cart: CartItem[];
}

const CartList: React.FC<Props> = ({ cart }) => {
  return (
    <List
      dataSource={cart}
      renderItem={(item) => <CartListItem item={item} />}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="购物车是空的哦~"
          />
        ),
      }}
    />
  );
};

export default CartList;
