import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import { getAllDocuments } from "../services/api";

const originData = [];

function getDocColumns(data) {
  let columnArr = Object.values(data);
  if (columnArr.length > 0) {
    let colData = Object.keys(columnArr[0]);
    let colArray = [];

    for (let i = 0; i < colData.length; i++) {
      let newColumn = {};
      newColumn.title = colData[i];
      newColumn.dataIndex = colData[i];
      newColumn.width = "40%";
      newColumn.editable = true;
      colArray.push(newColumn);
    }
    console.log(colArray);
    return colArray;
  }
  return [];
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function EditableTable({ collData, collName }) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    console.log("comoing in useeffect");
    collData.collection = collName;
    getAllDocuments(collData).then((result) => {
      setData(result.data);
      const columns = getDocColumns(data);
      setColumns(columns);
    });
  }, [collName, collData]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  //   console.log(data);

  //   console.log(`COLL NEWWWW ${JSON.stringify(columns)}`);
  //   columns.push({
  //     title: "operation",
  //     dataIndex: "operation",
  //     render: (_, record) => {
  //       const editable = isEditing(record);
  //       return editable ? (
  //         <span>
  //           <a
  //             href="javascript:;"
  //             onClick={() => save(record.key)}
  //             style={{
  //               marginRight: 8,
  //             }}
  //           >
  //             Save
  //           </a>
  //           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //             <a>Cancel</a>
  //           </Popconfirm>
  //         </span>
  //       ) : (
  //         <Typography.Link
  //           disabled={editingKey !== ""}
  //           onClick={() => edit(record)}
  //         >
  //           Edit
  //         </Typography.Link>
  //       );
  //     },
  //   });
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        scroll={{ x: 1500, y: 390 }}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}
