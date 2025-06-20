import { Flex, Menu, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Role, User } from "../types";
import NavbarAvatar from "./navbar_avatar";

type Tab =
  | "home"
  | "cart"
  | "order"
  | "admin/book"
  | "admin/user"
  | "admin/order"
  | "admin/statistics"
  | "";

interface NavBarProps {
  user: User;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [current, setCurrent] = useState<Tab>("");
  const navigate = useNavigate();
  const loc = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key as Tab);
  };

  useEffect(() => {
    switch (loc.pathname) {
      case "/":
        setCurrent("home");
        break;
      case "/cart":
        setCurrent("cart");
        break;
      case "/order":
        setCurrent("order");
        break;
      case "/admin/book":
        setCurrent("admin/book");
        break;
      case "/admin/user":
        setCurrent("admin/user");
        break;
      case "/admin/order":
        setCurrent("admin/order");
        break;
      case "/admin/statistics":
        setCurrent("admin/statistics");
        break;
      default:
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

  const adminItems: MenuProps["items"] = [
    {
      key: "admin/book",
      label: "书籍",
      onClick: () => navigate("/admin/book"),
    },
    {
      key: "admin/user",
      label: "用户",
      onClick: () => navigate("/admin/user"),
    },
    {
      key: "admin/order",
      label: "订单",
      onClick: () => navigate("/admin/order"),
    },
    {
      key: "admin/statistics",
      label: "统计",
      onClick: () => navigate("/admin/statistics"),
    },
  ];
  return (
    <Flex style={{ justifyContent: "space-between" }}>
      <Space style={{ flexGrow: 1 }}>
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
          items={user.role === Role.ADMIN ? adminItems : items}
          style={{ paddingLeft: "20px" }}
        />
      </Space>
      <NavbarAvatar user={user} />
    </Flex>
  );
};

export default NavBar;
