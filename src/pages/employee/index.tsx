import React, { useMemo, useState } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormEmployee from "@/components/FormEmployee";
import { MESSAGE } from "@/shared/constants/message";

const Employee: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [titleForm] = useState<string>("Thêm nhân viên");
  const [form] = Form.useForm();
  const columns = useMemo(
    () => [
      {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
      },
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        key: "1",
        id: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
      },
      {
        key: "2",
        id: 2,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
      },
      {
        key: "3",
        id: 3,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
      },
      {
        key: "4",
        id: 4,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
      },
    ],
    []
  );

  const handleSubmit = async () => {
    try {
      const isValid = await form.validateFields();
      if (!isValid) return;

      setIsOpenModal(false);
      form.resetFields();
    } catch {
      message.error(MESSAGE.ERROR.ADD);
    }
  };

  return (
    <div className="!font-poppins">
      <div className="flex justify-between">
        <Input.Search className="w-1/3" placeholder="Tìm kiếm..." />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsOpenModal(true)}
        >
          Thêm
        </Button>
      </div>
      <div>
        <Table dataSource={data} columns={columns} className="mt-5" />
      </div>
      <Modal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
        width={800}
      >
        <FormEmployee
          form={form}
          title={titleForm}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Employee;
