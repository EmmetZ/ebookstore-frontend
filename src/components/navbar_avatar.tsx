import {
  LoginOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import useMessage from "antd/es/message/useMessage";
import React from "react";
import { useNavigate } from "react-router";
import { useLogout } from "../hook/user";
import { User } from "../types";
import UserAvatar from "./avatar";

interface AvatarProps {
  user: User;
}

const NavbarAvatar: React.FC<AvatarProps> = ({ user }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();
  const mutation = useLogout(messageApi);

  if (!user) {
    return (
      <Space>
        <Tooltip title="登录/注册" placement="bottom">
          <Button
            shape="circle"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
          />
        </Tooltip>
      </Space>
    );
  }

  const items: MenuProps["items"] = [
    {
      key: "nickname",
      label: `昵称: ${user.nickname ?? "未设置"}`,
      icon: <SmileOutlined />,
    },
    {
      key: "balance",
      label: `余额: ${user.balance} 元`,
      icon: <MoneyCollectOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: "个人主页",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile/me"),
    },
    {
      key: "logout",
      label: "退出登录",
      icon: <LogoutOutlined />,
      onClick: () => mutation.mutate(),
      danger: true,
    },
  ];

  return (
    <Space>
      {contextHolder}
      <Dropdown menu={{ items }} arrow>
        {/* 需要添加这个 div，不然让无法触发dropdown？？？？ */}
        <div style={{ cursor: "pointer" }}>
          <UserAvatar src={user.avatar} />
        </div>
      </Dropdown>
    </Space>
  );
};

export default NavbarAvatar;
