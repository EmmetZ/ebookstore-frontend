import { Checkbox, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CartAffix from "../components/cart_affix";
import CartList from "../components/cart_list";
import { CartContext } from "../context/cart";
import { useCart } from "../hook/cart";

const CartPage: React.FC = () => {
  const { data: cart, isPending, error } = useCart();
  const [sum, setSum] = useState(0);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [isSelectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    if (cart) {
      if (selectedList.length === 0) {
        setSelectAll(false);
        setIndeterminate(false);
      } else if (cart.length === selectedList.length) {
        setSelectAll(true);
        setIndeterminate(false);
      } else {
        setSelectAll(false);
        setIndeterminate(true);
      }
    }
  }, [selectedList]);

  if (isPending || error) {
    return null;
  }

  const handleSelectAll = () => {
    setSelectAll(!isSelectAll);
    if (cart) {
      const selectedIds = cart.map((item) => item.id);
      setSelectedList(isSelectAll ? [] : selectedIds);
      const totalSum = cart.reduce(
        (acc, item) => acc + item.book.price * item.number,
        0,
      );
      setSum(isSelectAll ? 0 : totalSum);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1360px",
        margin: " 0 auto",
      }}
    >
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        购物车
      </Typography.Title>
      <Space style={{ margin: "0 0 12px 12px" }}>
        <Checkbox
          checked={isSelectAll}
          onChange={handleSelectAll}
          indeterminate={indeterminate}
        />
        <Typography.Text>全选</Typography.Text>
      </Space>
      <CartContext.Provider
        value={{ sum, setSum, selectedList, setSelectedList }}
      >
        <CartList cart={cart} />
        {cart.length !== 0 && <CartAffix num={cart.length} />}
      </CartContext.Provider>
    </div>
  );
};

export default CartPage;
