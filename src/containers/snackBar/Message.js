//SJSU CMPE 138 Spring2020 TEAM7
import React from "react";

export default function Message(props) {
  const { data } = props;
  return <div className={data.success ? "success" : "fail"}>{data.error}</div>;
}
