import React from "react";
import { CartItem } from "../types";
import { List } from "antd";
import CartListItem from "./cart_item";

interface Props {
  cart: CartItem[];
}

const CartList: React.FC<Props> = ({ cart }) => {
  return (
    <List
      dataSource={cart}
      renderItem={(item) => <CartListItem item={item} />}
    />
  );
};

export default CartList;
