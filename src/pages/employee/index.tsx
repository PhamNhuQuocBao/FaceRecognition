/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import FormEmployee from "@/components/FormEmployee";
import { MESSAGE } from "@/shared/constants/message";
import { get, push, ref, remove, set, update } from "firebase/database";
import database from "@/firebase.config";
import { COLLECTION } from "@/shared/constants/collection";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { uploadFiles } from "@/services/upload";

const Employee: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [emSelected, setEmSelected] = useState<any>({ id: "" });
  const [titleForm] = useState<string>("Thêm nhân viên");
  const [employees, setEmployees] = useState<any>([]);
  const [images, setImages] = useState<FileList>();
  const [form] = Form.useForm();
  const columns = useMemo(
    () => [
      {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Ngày sinh",
        dataIndex: "birthday",
        key: "birthday",
        render: (_: any, record: any) => (
          <p>{dayjs(record.birthday).format("DD/MM/YYYY")}</p>
        ),
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (_: any, record: any) => (
          <p>
            {record.gender === 1 ? "Nam" : record.gender === 0 ? "Nữ" : "Khác"}
          </p>
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Thao tác",
        key: "action",
        dataIndex: "action",
        width: "10%",
        render: (_: any, record: any) => (
          <div className="flex gap-3">
            <EditOutlined
              className="cursor-pointer text-xl"
              onClick={() => {
                setIsOpenModal(true);
                setEmSelected(record);
              }}
            />
            <DeleteOutlined
              className="cursor-pointer text-xl"
              onClick={() => handleModalConfirmOpen(record)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const onChangeImage = useCallback((files: FileList) => {
    setImages(files);
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log("submit");

    try {
      const isValid = await form.validateFields();
      if (!isValid) return;
      if (!images) return;

      const dataImages = await uploadFiles(images);

      const dataForm = {
        name: form.getFieldValue("name"),
        gender: form.getFieldValue("gender"),
        birthday: dayjs(form.getFieldValue("birthday")).toISOString(),
        address: form.getFieldValue("address"),
        images: dataImages,
      };

      console.log(dataForm);

      const newDoc = push(ref(database, COLLECTION.EMPLOYEE));
      set(newDoc, dataForm)
        .then(() => {
          message.success(MESSAGE.SUCCESS.ADD);
        })
        .catch((error) => {
          message.error(MESSAGE.ERROR.ADD);
          throw error;
        });

      setIsOpenModal(false);
      form.resetFields();
    } catch (error) {
      message.error(MESSAGE.ERROR.ADD);
      throw error;
    }
  }, [form, images]);

  const handleUpdate = useCallback(async () => {
    console.log("update");

    try {
      const isValid = await form.validateFields();
      if (!isValid) return;

      const dataForm = {
        name: form.getFieldValue("name"),
        gender: form.getFieldValue("gender"),
        birthday: dayjs(form.getFieldValue("birthday")).toISOString(),
        address: form.getFieldValue("address"),
      };

      update(ref(database, COLLECTION.EMPLOYEE + `/${emSelected.id}`), dataForm)
        .then(() => {
          message.success(MESSAGE.SUCCESS.ADD);
        })
        .catch((error) => {
          message.error(MESSAGE.ERROR.ADD);
          throw error;
        });

      setIsOpenModal(false);
      form.resetFields();
    } catch (error) {
      message.error(MESSAGE.ERROR.ADD);
      throw error;
    }
  }, [emSelected.id, form]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      remove(ref(database, `${COLLECTION.EMPLOYEE}/${id}`));
      message.success(MESSAGE.SUCCESS.DELETE);
      fetchData();
    } catch (error) {
      message.success(MESSAGE.ERROR.DELETE);
    } finally {
      setIsOpenModalConfirm(false);
    }
  }, []);

  const handleModalConfirmOpen = useCallback((em: any) => {
    setIsOpenModalConfirm(true);
    setEmSelected(em);
  }, []);

  const fetchData = useCallback(() => {
    const employeeRef = ref(database, COLLECTION.EMPLOYEE);
    get(employeeRef).then((snapshot: any) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...(value as Record<string, unknown>),
        }));

        setEmployees(data);
        return;
      }
      setEmployees([]);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="!font-poppins">
      <div className="flex justify-between">
        <Input.Search className="w-1/3" placeholder="Tìm kiếm..." />
        <div className="flex gap-4">
          <Button icon={<ReloadOutlined />} onClick={fetchData}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setEmSelected({ id: "" });
              setIsOpenModal(true);
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
      <div>
        <Table dataSource={employees} columns={columns} className="mt-5" />
      </div>
      <Modal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
        width={800}
      >
        {emSelected.id ? (
          <FormEmployee
            form={form}
            title={titleForm}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            employee={emSelected}
            onChangeImage={onChangeImage}
          />
        ) : (
          <FormEmployee
            form={form}
            title={titleForm}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            onChangeImage={onChangeImage}
          />
        )}
      </Modal>
      <Modal
        open={isOpenModalConfirm}
        onCancel={() => {
          setIsOpenModalConfirm(false);
        }}
        closable={true}
        footer={[
          <Button onClick={() => setIsOpenModalConfirm(false)}>Cancel</Button>,
          <Button
            type="primary"
            onClick={() => {
              handleDelete(emSelected.id);
            }}
          >
            OK
          </Button>,
        ]}
        width={800}
      >
        <div className="pt-10 flex justify-center">
          <Title level={3}>Bạn muốn xóa nhân viên này không?</Title>
        </div>
      </Modal>
    </div>
  );
};

export default Employee;
