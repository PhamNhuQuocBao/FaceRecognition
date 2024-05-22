/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Radio } from "antd";
import UploadFiles from "../Upload";
import { FormStyled } from "./style";

interface Props {
  title: string;
  form: FormInstance;
  handleSubmit: () => void;
  onChangeDate: (date: Date, datestring: string | string[]) => void;
  employee?: any;
}

const FormEmployee: React.FC<Props> = ({
  title,
  form,
  handleSubmit,
  onChangeDate,
  employee,
}) => {
  const [titleButton, setTitleButton] = useState<string>("");

  useEffect(() => {
    if (employee) {
      setTitleButton("Cập nhật");
    } else {
      setTitleButton("Thêm");
    }
  }, [employee]);

  return (
    <div>
      <header>
        <p className="text-xl font-bold mb-4">{title}</p>
      </header>
      <FormStyled
        name="employee"
        layout="vertical"
        form={form}
        initialValues={employee}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Họ tên"
          name="name"
          className="font-semibold"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input placeholder="Họ và tên" className="p-2" />
        </Form.Item>

        <div className="flex gap-20">
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            className="font-semibold"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày sinh!",
              },
            ]}
          >
            <DatePicker
              className="p-2"
              format="DD/MM/YYYY"
              onChange={onChangeDate}
            />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            className="font-semibold"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={0}>Nữ</Radio>
              <Radio value={-1}>Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item
          label="Địa chỉ"
          name="address"
          className="font-semibold"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea placeholder="Địa chỉ" />
        </Form.Item>

        <Form.Item>
          <UploadFiles />
        </Form.Item>

        <Form.Item className="mt-3 mb-0 layout-btn">
          <Button type="primary" htmlType="submit">
            {titleButton}
          </Button>
        </Form.Item>
      </FormStyled>
    </div>
  );
};

export default FormEmployee;
