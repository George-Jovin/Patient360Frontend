import React, { useState } from "react";
import { Table, Tag, Card, Input, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const { Text } = Typography;

interface ExecutiveData {
  key: string;
  sno: string;
  name: string;
  patientid: number;
  mobileno: string;
  // gender: string;
  // lastUpdated: string;
  riskScore: number;
}

interface ExecutiveTableProps {
  data: ExecutiveData[];
}

const ExecutiveTable: React.FC<ExecutiveTableProps> = ({ data }) => {
  console.log(data);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "S.No",
      key: "sno",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Unique ID", dataIndex: "patientid", key: "patientid" },
    { title: "Phone Number", dataIndex: "mobileno", key: "mobileno" },
    // { title: "Gender", dataIndex: "gender", key: "gender" },
    // { title: "Last Updated", dataIndex: "lastUpdated", key: "lastUpdated" },
    {
      title: "Risk Score",
      dataIndex: "riskrate",
      key: "riskrate",
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
            navigate(`/PatientDashboard/${record.patientid}`);
          },
        })}
      />
    </Card>
  );
};

export default ExecutiveTable;
