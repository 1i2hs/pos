import React from "react";
import { Card } from "antd";
import { formatPriceString } from "../../util";
import "./MenuBox.css";

const MenuBox = ({ id, name, price, onClick }) => {
  return (
    <Card
      className="MenuBox"
      key={id}
      onClick={onClick}
      hoverable
      bodyStyle={{
        height: "200px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%"
        }}
      >
        <div style={{ alignSelf: "flex-start" }}>{name}</div>
        <div
          style={{
            alignSelf: "flex-end",
            fontWeight: "bold",
            fontSize: "20px"
          }}
        >{`${formatPriceString(price)} 원`}</div>
      </div>
    </Card>
  );
};

export default MenuBox;
