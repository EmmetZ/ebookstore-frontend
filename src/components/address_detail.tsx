import React from "react";
import { Address } from "../types";
import { Space, Typography } from "antd";

interface Props {
  address: Address;
}

const AddressDetail: React.FC<Props> = ({ address }) => {
  return (
    <Space direction="vertical" style={{ marginRight: "40px" }}>
      <Typography.Text style={{ fontWeight: "bold", fontSize: "1.2em" }}>
        {address.address}
      </Typography.Text>
      <div>
        <Typography.Text className="address-reciver">
          收件人：{address.receiver}
        </Typography.Text>
        <Typography.Text className="address-tel">
          联系方式：{address.tel}
        </Typography.Text>
      </div>
    </Space>
  );
};

export default AddressDetail;
