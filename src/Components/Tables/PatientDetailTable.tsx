import React  from "react";
import { Table, Tag, Card, Typography } from "antd";
const {Text} = Typography

const patientData = [
  {
    key: "1",
    sno: "1",
    name: "John Doe",
    uniqueId: "UID12345",
    heartRate: 72,
    spO2: 98,
    breatheRate: 18,
    bloodPressure: "120/80",
    dateTime: "2024-10-17 10:00 AM",
    riskScore: 35,
  },
  {
    key: "2",
    sno: "2",
    name: "Jane Smith",
    uniqueId: "UID54321",
    heartRate: 80,
    spO2: 95,
    breatheRate: 20,
    bloodPressure: "130/85",
    dateTime: "2024-10-16 02:30 PM",
    riskScore: 55,
  },
  {
    key: "3",
    sno: "3",
    name: "Alfred",
    uniqueId: "UID67891",
    heartRate: 65,
    spO2: 99,
    breatheRate: 17,
    bloodPressure: "115/75",
    dateTime: "2024-10-15 08:00 AM",
    riskScore: 80,
  },
  {
    key: "4",
    sno: "4",
    name: "George Smith",
    uniqueId: "UID67896",
    heartRate: 76,
    spO2: 97,
    breatheRate: 19,
    bloodPressure: "118/78",
    dateTime: "2024-10-14 11:00 AM",
    riskScore: 20,
  },
  {
    key: "5",
    sno: "5",
    name: "Maria",
    uniqueId: "UID67128",
    heartRate: 85,
    spO2: 96,
    breatheRate: 22,
    bloodPressure: "140/90",
    dateTime: "2024-10-13 04:45 PM",
    riskScore: 60,
  },
];

const PatientDetailTable: React.FC = () => {
 
  const columns = [
    { title: "S.No", dataIndex: "sno", key: "sno" },
    { title: "Heart Rate", dataIndex: "heartRate", key: "heartRate", render: (text: number) => `${text} bpm` },
    { title: "SpO₂", dataIndex: "spO2", key: "spO2", render: (text: number) => `${text}%` },
    { title: "Breathe Rate", dataIndex: "breatheRate", key: "breatheRate", render: (text: number) => `${text} breaths/min` },
    { title: "Blood Pressure", dataIndex: "bloodPressure", key: "bloodPressure" },
    { title: "Date & Time", dataIndex: "dateTime", key: "dateTime" },
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
     <Text className="text-[black] font-bold text-lg">
        Previous Episodes
      </Text>
    
      <Table
        columns={columns}
        dataSource={patientData}
        pagination={false}
        className="w-full cursor-pointer custom-table mt-4"
        size="middle"
      />
    </Card>
  );
};

export default PatientDetailTable;
