import React, { useState } from "react";
import { Table, Tag, Card, Input, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const { Text } = Typography;

const executiveData = [
  {
    key: "1",
    sno: "1",
    name: "John Doe",
    uniqueId: "UID12345",
    gender: "Male",
    lastUpdated: "Today",
    riskScore: 35,
  },
  {
    key: "2",
    sno: "2",
    name: "Jane Smith",
    uniqueId: "UID54321",
    gender: "Female",
    lastUpdated: "3 days ago",
    riskScore: 55,
  },
  {
    key: "3",
    sno: "3",
    name: "Alfred",
    uniqueId: "UID67891",
    gender: "Male",
    lastUpdated: "22 May 2024",
    riskScore: 80,
  },
  {
    key: "4",
    sno: "4",
    name: "George Smith",
    uniqueId: "UID67896 ",
    gender: "Male",
    lastUpdated: "25 March 2024",
    riskScore: 20,
  },
  {
    key: "5",
    sno: "5",
    name: "Maria",
    uniqueId: "UID67128",
    gender: "Female",
    lastUpdated: "25 Nov 2024",
    riskScore: 60,
  },
];

const ExecutiveTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = executiveData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "S.No", dataIndex: "sno", key: "sno" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Unique ID", dataIndex: "uniqueId", key: "uniqueId" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Last Updated", dataIndex: "lastUpdated", key: "lastUpdated" },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      render: (riskScore: number) => {
        let color = "";
        if (riskScore < 50) color = "green";
        else if (riskScore >= 50 && riskScore < 70) color = "yellow";
        else color = "red";

        return (
          <Tag
            color={color}
            className="rounded-md py-1 px-8 flex text-center w-12 align-middle justify-center"
          >
            {riskScore}
          </Tag>
        );
      },
    },
  ];

  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Text className="text-[black] font-bold text-lg">Patient List</Text>
      <Row>
        <Col span={18}></Col>
        <Col span={6}>
          <Input
            placeholder="Search by Name"
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="mb-4 w-full rounded-lg bg-gray-50"
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        className="w-full cursor-pointer custom-table"
        size="middle"
        onRow={(record) => ({
          onClick: () => {
            navigate(`/PatientDashboard`);
          },
        })}
      />
    </Card>
  );
};

export default ExecutiveTable;
