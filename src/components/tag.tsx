import { Tag } from "antd";
import React from "react";
import useTagContext from "../context/tag";

interface Props {
  tag: string;
}

const BookTag: React.FC<Props> = ({ tag }) => {
  const { selectedTag, setTag } = useTagContext();
  return (
    <Tag.CheckableTag
      checked={selectedTag === tag}
      onChange={() => setTag(tag)}
      className="book-tag"
    >
      {tag}
    </Tag.CheckableTag>
  );
};

export default BookTag;
