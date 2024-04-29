import React from "react";
import { Button, DatePicker, Form, FormInstance, Input, Radio } from "antd";
import UploadFiles from "../Upload";
import { FormStyled } from "./style";

interface Props {
  title: string;
  form: FormInstance;
  handleSubmit: () => void;
}

const FormEmployee: React.FC<Props> = ({ title, form, handleSubmit }) => {
  return (
    <div>
      <header>
        <p className="text-xl font-bold mb-4">{title}</p>
      </header>
      <FormStyled
        name="employee"
        layout="vertical"
        form={form}
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
            <DatePicker className="p-2" />
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
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>Khác</Radio>
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
            Submit
          </Button>
        </Form.Item>
      </FormStyled>
    </div>
  );
};

export default FormEmployee;
