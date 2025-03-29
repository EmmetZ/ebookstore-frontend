import { Card, Typography } from "antd";
import React from "react";
import BookTag from "./tag";

interface Props {
  tags: string[];
}

const SearchPanel: React.FC<Props> = ({ tags }) => {
  return (
    <Card
      style={{
        borderColor: "#d9d9d9",
        width: "100%",
        margin: "0 auto",
      }}
      styles={{
        body: {
          padding: "12px",
        },
      }}
    >
      <div>
        <Typography.Text
          style={{
            color: "#595959",
          }}
        >
          请选择标签:
        </Typography.Text>
      </div>
      {tags.map((tag) => (
        <BookTag key={tag} tag={tag} />
      ))}
    </Card>
  );
};

export default SearchPanel;
