import { Flex, Menu, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { User } from "../types";
import NavbarAvatar from "./navbar_avatar";

type Tab = "home" | "cart" | "order" | "";

interface NavBarProps {
  user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [current, setCurrent] = useState<Tab>("");
  const navigate = useNavigate();
  const loc = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key as Tab);
  };

  useEffect(() => {
    if (loc.pathname === "/") {
      setCurrent("home");
    } else if (loc.pathname === "/cart") {
      setCurrent("cart");
    } else if (loc.pathname === "/order") {
      setCurrent("order");
    } else {
      setCurrent("");
    }
  }, [loc.pathname]);

  const items: MenuProps["items"] = [
    {
      key: "home",
      label: "首页",
      onClick: () => navigate("/"),
    },
    {
      key: "order",
      label: "订单",
      onClick: () => navigate("/order"),
    },
    {
      key: "cart",
      label: "购物车",
      onClick: () => navigate("/cart"),
    },
  ];
  return (
    <Flex style={{ justifyContent: "space-between" }}>
      <Space>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Book Store
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ paddingLeft: "20px" }}
        />
      </Space>
      <NavbarAvatar user={user} />
    </Flex>
  );
};

export default NavBar;
