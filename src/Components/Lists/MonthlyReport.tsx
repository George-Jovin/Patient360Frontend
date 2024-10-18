import React from "react";
import { List, Card, Avatar, Row, Col, Badge,Typography } from "antd";
import DoctorIcon from "../Assets/Images/Doctorprofile-icon.svg";
const {Text} = Typography;
const Reports = [
  {
    id: 1,
    name: "Dr. John Doe",
    description: "Follow up",
    time: "09 AM - 10 AM",
    avatar: DoctorIcon,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    description: "New Patients",
    time: "09 AM - 10 AM",
    avatar: DoctorIcon,
  },
  {
    id: 3,
    name: "Dr. Rick Johnson",
    description: "New Patients",
    time: "09 AM - 10 AM",
    avatar: DoctorIcon,
  },
  {
    id: 4,
    name: "Dr. Emily Brown",
    description: "New Patients",
    time: "09 AM - 10 AM",
    avatar: DoctorIcon,
  },
  {
    id: 5,
    name: "Dr. John Doe",
    description: "Follow up",
    time: "09 AM - 10 AM",
    avatar: DoctorIcon,
  },
];

const MonthlyReportList: React.FC = () => {
  return (
    <Card className="w-full shadow-custom rounded-3xl">
   <Text className="text-[black] font-bold text-lg">
        Monthly Reports
      </Text>
      <div className="max-h-72 overflow-y-auto h-72 mt-4">
        <List
          itemLayout="horizontal"
          dataSource={Reports}
          renderItem={(Report) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={Report.avatar} />}
                title={
                  <Row justify="space-between" className="w-full" gutter={32}>
                    <Col>
                      <span>{Report.name}</span>
                    </Col>
                    <Col>
                      <Badge color="#5856D6" />
                      <span className="text-gray-500 ml-2">{Report.time}</span>
                    </Col>
                  </Row>
                }
                description={Report.description}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default MonthlyReportList;
