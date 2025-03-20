import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { OtherUser, User } from "../types";

interface AvatarProps {
  user: User | OtherUser;
  size?: number;
}

const UserAvatar: React.FC<AvatarProps> = ({ user, size }) => {
  return (
    <>
      {user.avatar ? (
        <Avatar src={user.avatar} size={size} />
      ) : (
        <Avatar
          icon={<UserOutlined style={{ color: "black" }} />}
          style={{
            backgroundColor: "white",
            border: "1px solid gray",
          }}
          size={size}
        />
      )}
    </>
  );
};

export default UserAvatar;
