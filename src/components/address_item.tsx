import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, List, Modal, Typography } from "antd";
import React from "react";
import { Address } from "../types";
import AddressDetail from "./address_detail";

interface Props {
  address: Address;
  handleDelete: (id: number) => void;
}

const AddressItem: React.FC<Props> = ({ address, handleDelete }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isHover, setHover] = React.useState(false);

  return (
    <List.Item
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Flex justify="space-between" style={{ width: "100%" }}>
        <AddressDetail address={address} />
        <Button
          className={`delete-btn ${isHover ? "visible" : ""}`}
          icon={<DeleteOutlined />}
          onClick={() => setModalOpen(true)}
          size="small"
        />
        <Modal
          title=""
          open={isModalOpen}
          onOk={() => {
            handleDelete(address.id);
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        >
          <Typography.Text>确定要删除该地址吗？</Typography.Text>
        </Modal>
      </Flex>
    </List.Item>
  );
};

export default AddressItem;
