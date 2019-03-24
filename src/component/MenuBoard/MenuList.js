import React, { useState } from "react";
import { Table } from "antd";
import { formatPriceString } from "../../util";
import "./MenuList.css";

const columns = [
  {
    title: "번호",
    dataIndex: "mno",
    align: "center"
  },
  {
    title: "상품명",
    dataIndex: "mname"
  },
  {
    title: "순서",
    dataIndex: "mpriority"
  },
  {
    title: "종류",
    dataIndex: "mtype"
  },
  {
    title: "가격",
    dataIndex: "mprice",
    render: (text, row, index) => `${formatPriceString(text)} 원`
  }
];

const mapTableRowKey = record => record.mno;

const MenuList = ({ menu, style, onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const onRowSelect = (record, rowIndex) => ({
    onClick: () => {
      setSelectedMenu(record);
      onSelectMenu(record);
    }
  });
  return (
    <Table
      className="MenuList"
      size="middle"
      columns={columns}
      dataSource={menu}
      pagination={false}
      rowKey={mapTableRowKey}
      rowSelection={{
        type: "radio",
        selectedRowKeys: selectedMenu ? [selectedMenu.key] : []
      }}
      onRow={onRowSelect}
      style={style}
    />
  );
};

export default MenuList;
