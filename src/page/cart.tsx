import { Typography } from "antd";
import React, { useState } from "react";
import CartAffix from "../components/cart_affix";
import CartList from "../components/cart_list";
import { SumContext } from "../context/sum";
import { useCart } from "../hook/cart";

const CartPage: React.FC = () => {
  const { data: cart, isPending, error } = useCart();
  const [sum, setSum] = useState(0);

  if (isPending || error) {
    return null;
  }

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
      <SumContext.Provider value={{ sum, setSum }}>
        <CartList cart={cart} />
        {cart.length !== 0 && <CartAffix num={cart.length} />}
      </SumContext.Provider>
    </div>
  );
};

export default CartPage;
