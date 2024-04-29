import React from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ROUTE } from "@/shared/constants/route";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: ROUTE.HOME,
    label: <Link to={ROUTE.HOME}>Trang chủ</Link>,
    icon: <MailOutlined />,
  },
  {
    key: ROUTE.MANAGEMENT,
    label: "Quản lý",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: ROUTE.EMPLOYEE,
        label: <Link to={ROUTE.EMPLOYEE}>Nhân viên</Link>,
      },
    ],
  },
];

const SideBar: React.FC = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default SideBar;
