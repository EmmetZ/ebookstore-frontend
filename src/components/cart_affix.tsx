import { Affix, AffixRef, Button, Divider, Flex, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import useSumContext from "../context/sum";

interface Props {
  num: number;
}

const CartAffix: React.FC<Props> = ({ num }) => {
  const { sum } = useSumContext();
  const ref = useRef<AffixRef>(null);

  useEffect(() => {
    if (ref.current && ref.current.updatePosition) {
      ref.current.updatePosition();
    }
  }, [num]);

  return (
    <Affix offsetBottom={0} ref={ref}>
      <div style={{ background: "white" }}>
        <Divider
          style={{
            margin: "0",
            paddingBottom: "24px",
            borderColor: "rgba(0, 0, 0, 0.12)",
          }}
        />
        <Flex style={{ width: "100%" }} justify="space-between" align="center">
          <Typography.Text style={{ marginRight: 16, fontSize: "1.2em" }}>
            合计：
            <span style={{ color: "red", fontSize: "1.5em" }}>
              ￥{(sum / 100).toFixed(2)}
            </span>
          </Typography.Text>
          <Button type="primary" size="large" disabled={sum === 0}>
            <span style={{ fontSize: "1.1em" }}>去结算</span>
          </Button>
        </Flex>
        <div style={{ height: "24px" }} />
      </div>
    </Affix>
  );
};

export default CartAffix;
