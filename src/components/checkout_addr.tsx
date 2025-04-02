import { Button, Card, Modal, Radio, Space, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Address } from "../types";
import AddressDetail from "./address_detail";

interface Props {
  selectedAddress: number | null;
  addresses: Address[] | undefined;
  handleAddressChange: (id: number) => void;
}

const CheckoutAddr: React.FC<Props> = ({
  addresses,
  selectedAddress,
  handleAddressChange,
}) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSelectAddress = () => {
    if (addresses && addresses.length === 1) {
      navigate("/profile/me");
    } else {
      setIsModalOpen(true);
    }
  };
  const addr = addresses?.find((addr) => addr.id === selectedAddress);
  return (
    <>
      <Card
        title="收货地址"
        extra={
          addresses &&
          addresses.length > 0 && (
            <Button onClick={handleSelectAddress} size="small">
              {addresses.length > 1 ? "选择其他地址" : "添加新地址"}
            </Button>
          )
        }
        style={{ marginBottom: "20px" }}
      >
        {addresses && addresses.length > 0 ? (
          <div>{addr && <AddressDetail address={addr} />}</div>
        ) : (
          <Typography.Text type="secondary">
            您还没有添加收货地址，请先前往
            <Typography.Link href="/profile/me"> 个人主页 </Typography.Link>
            添加收货地址
          </Typography.Text>
        )}
      </Card>
      {addresses && addresses.length > 0 && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={
            <Typography.Link href="/profile/me">
              前往个人主页添加新地址
            </Typography.Link>
          }
        >
          <Radio.Group
            value={selectedAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
          >
            <Space
              direction="vertical"
              style={{ width: "100%" }}
              styles={{
                item: {
                  padding: "10px",
                },
              }}
            >
              {addresses.map((address: Address) => (
                <Radio key={address.id} value={address.id}>
                  <AddressDetail address={address} />
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Modal>
      )}
    </>
  );
};

export default CheckoutAddr;
