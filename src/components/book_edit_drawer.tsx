import { UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Drawer,
  Flex,
  Form,
  Popconfirm,
  Space,
  Upload,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import useMessage from "antd/es/message/useMessage";
import React, { Dispatch, useState } from "react";
import { useBookActive } from "../hook/book";
import { PREFIX } from "../service/common";
import { BookAdmin, TmpCover } from "../types";
import BookForm from "./book_form";

interface Props {
  type: "edit" | "add";
  book?: BookAdmin;
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const BookEditDrawer: React.FC<Props> = ({ type, book, open, setOpen }) => {
  const [messageApi, contextHolder] = useMessage();
  const [save, setSave] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [tmpCover, setTmpCover] = useState<TmpCover>();
  const active = useBookActive();

  if (type === "edit" && !book) {
    return;
  }

  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    showUploadList: false,
    withCredentials: true,
    action: `${PREFIX}/book/${book ? book.id : 0}/cover`,
    async onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        if (book) {
          setOpen(false);
          await messageApi.success(
            `${info.file.name} file uploaded successfully.`,
            1,
          );
          queryClient.invalidateQueries({ queryKey: ["books"] });
        } else {
          setTmpCover({
            id: info.file.response.data.id,
            fileName: info.file.response.data.fileName,
          });
          messageApi.success(info.file.response.message);
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

  const handleStatusChange = (book: BookAdmin) => {
    active.mutate(
      { id: book.id, active: !book.isActive },
      {
        onSuccess: () => {
          setOpen(false);
          messageApi.success(
            `图书《${book.title}》已成功${book.isActive ? "下架" : "上架"}`,
          );
          queryClient.invalidateQueries({ queryKey: ["admin_books"] });
        },
        onError: (error) => {
          messageApi.error(`操作失败: ${error.message}`);
        },
      },
    );
  };

  return (
    <>
      {contextHolder}
      <Drawer
        open={open}
        onClose={() => {
          setSave(false);
          setOpen(false);
          setTmpCover(undefined);
          form.resetFields();
        }}
        placement="left"
        size="large"
        title={book ? `编辑: 《${book.title}》` : "添加图书"}
        extra={
          <Space>
            <ImgCrop
              showGrid
              showReset
              rotationSlider
              modalOk="确定"
              modalCancel="取消"
              minZoom={0.5}
              quality={1}
              aspect={1}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传封面</Button>
              </Upload>
            </ImgCrop>
            <Button
              type="primary"
              disabled={!save}
              onClick={() => form.submit()}
            >
              {type === "edit" ? "保存" : "添加"}
            </Button>
          </Space>
        }
      >
        <BookForm
          form={form}
          book={book}
          cover={tmpCover}
          setOpen={setOpen}
          setSave={setSave}
        />
        {type === "edit" && (
          <Flex justify="end">
            <Popconfirm
              title="确定执行此操作吗？"
              onConfirm={() => {
                if (book) {
                  handleStatusChange(book);
                }
              }}
            >
              <Button color={book?.isActive ? "red" : "green"} variant="solid">
                {book?.isActive ? "下架图书" : "上架图书"}
              </Button>
            </Popconfirm>
          </Flex>
        )}
      </Drawer>
    </>
  );
};

export default BookEditDrawer;
