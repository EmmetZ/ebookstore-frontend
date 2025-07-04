import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { AVATAR_URL } from "../service/common";

interface AvatarProps {
  src?: string | null;
  size?: number;
}

const UserAvatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <>
      {src ? (
        <Avatar
          src={`${AVATAR_URL}/${src}`}
          size={size}
          style={{
            border: "1px solid #e1e1e1",
          }}
        />
      ) : (
        <Avatar
          icon={<UserOutlined style={{ color: "black" }} />}
          style={{
            backgroundColor: "white",
            border: "1px solid #e1e1e1",
          }}
          size={size}
        />
      )}
    </>
  );
};

export default UserAvatar;
