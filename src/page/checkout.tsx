import { Button, Divider, Flex, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import CheckoutAddr from "../components/checkout_addr";
import CheckoutItemList from "../components/checkout_item_list";
import { useAddress } from "../hook/address";
import { useCart } from "../hook/cart";
import { usePlaceOrder } from "../hook/order";
import { CartItem } from "../types";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { timestamp } = useParams<{ timestamp: string }>();
  const { data: cart } = useCart();
  const { data: addresses } = useAddress();
  const [messageApi, contextHolder] = useMessage();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const placeOrderMutation = usePlaceOrder();

  useEffect(() => {
    const checkUrl = async () => {
      if (!timestamp) {
        await messageApi.error("无效结算链接", 1);
        navigate("/");
        return;
      }
      const num = parseInt(timestamp, 10);
      if (num > 0 && num < 4102444800000 && timestamp.length === 13) {
        return;
      } else {
        await messageApi.error("无效结算链接", 1);
        navigate("/");
      }
    };
    checkUrl();
  }, []);

  useEffect(() => {
    const state = location.state;
    const checkState = async () => {
      if (!state || !state.selectedItems || !state.selectedItems.length) {
        await messageApi.error("请先选择需要结算的商品", 1);
        navigate("/");
        return;
      } else {
        setTotalAmount(state.totalAmount || 0);

        if (cart) {
          const selected = cart.filter((item) =>
            state.selectedItems.includes(item.id),
          );
          setSelectedItems(selected);
        }
      }
    };
    checkState();
  }, [cart]);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses]);

  const handleAddressChange = (addressId: number) => {
    setSelectedAddress(addressId);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !addresses) {
      messageApi.error("收货地址错误");
      return;
    }
    const addr = addresses.find((addr) => addr.id === selectedAddress);

    if (!addr) {
      messageApi.error("收货地址错误");
      return;
    }
    placeOrderMutation.mutate(
      {
        ...addr,
        itemIds: selectedItems.map((item) => item.id),
      },
      {
        onSuccess: async () => {
          await messageApi.success("下单成功！", 1);
          navigate("/order");
        },
        onError: (error) => {
          messageApi.error(`下单失败: ${error}`);
        },
      },
    );
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {contextHolder}
      <Typography.Title level={3}>订单结算</Typography.Title>
      <CheckoutItemList items={selectedItems} />
      <CheckoutAddr
        addresses={addresses}
        selectedAddress={selectedAddress}
        handleAddressChange={handleAddressChange}
      />

      <Flex justify="end" align="center">
        <div>
          <Typography.Text style={{ marginRight: "20px" }}>
            共 {selectedItems.reduce((sum, item) => sum + item.number, 0)}{" "}
            件商品
          </Typography.Text>
          <Typography.Text style={{ fontSize: "18px" }}>
            合计：
            <Typography.Text
              type="danger"
              style={{ fontSize: "24px", fontWeight: "bold" }}
            >
              ¥{(totalAmount / 100).toFixed(2)}
            </Typography.Text>
          </Typography.Text>
        </div>
      </Flex>
      <Divider />
      <Flex justify="end">
        <Button
          type="primary"
          size="large"
          loading={placeOrderMutation.isPending}
          disabled={!selectedAddress || selectedItems.length === 0}
          onClick={handlePlaceOrder}
        >
          提交订单
        </Button>
      </Flex>
    </div>
  );
};

export default CheckoutPage;
