import { EditOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tooltip, UploadProps } from "antd";
import useMessage from "antd/es/message/useMessage";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import useUserContext from "../context/user";
import { AVATAR_UPLOAD_URL } from "../service/common";
import { getMe } from "../service/user";
import { OtherUser, User } from "../types";
import isUser from "../utils/user";
import UserAvatar from "./avatar";
import ImgCrop from "antd-img-crop";

interface Props {
  user: User | OtherUser;
}

const ProfileAvatar: React.FC<Props> = ({ user }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const showModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { setUser } = useUserContext();
  const [messageApi, contextHolder] = useMessage();

  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    showUploadList: false,
    withCredentials: true,
    action: AVATAR_UPLOAD_URL,
    async onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (status === "done") {
        await messageApi.success(
          `${info.file.name} file uploaded successfully.`,
          1,
        );
        closeModal();
        const me = await getMe();
        if (me) {
          setUser(me);
        } else {
          await messageApi.error("刷新失败");
        }
      } else if (status === "error") {
        await messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        messageApi.error("系统只支持 jpeg 或 png 格式的图片！");
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        messageApi.error("图片大小不能超过 10M");
        return false;
      }
      return true;
    },
  };

  return (
    <Space style={{ position: "relative" }}>
      {contextHolder}
      <UserAvatar src={user.avatar} size={280} />
      {isUser(user) && (
        <>
          <Tooltip title="编辑头像" placement="bottom">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              style={{
                position: "absolute",
                right: "30px",
                bottom: "25px",
                zIndex: 1,
              }}
              onClick={showModal}
            ></Button>
          </Tooltip>
          <Modal
            title="上传头像"
            open={isModalOpen}
            onCancel={closeModal}
            footer={[
              <Button onClick={closeModal} type="primary">
                Ok
              </Button>,
            ]}
          >
            <ImgCrop
              showGrid
              showReset
              rotationSlider
              modalOk="确定"
              modalCancel="取消"
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到这里上传</p>
                <p className="ant-upload-hint">
                  支持 .jpg .png 格式的图片文件，图片大小不超过10M
                </p>
              </Dragger>
            </ImgCrop>
          </Modal>
        </>
      )}
    </Space>
  );
};

export default ProfileAvatar;
