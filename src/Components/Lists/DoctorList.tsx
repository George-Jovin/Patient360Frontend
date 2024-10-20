import React from "react";
import { List, Card, Avatar,Typography } from "antd";
import DoctorIcon from "../Assets/Images/Doctorprofile-icon.svg";
const {Text} = Typography;

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    avatar: DoctorIcon,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Neurologist",
    avatar: DoctorIcon,
  },
  {
    id: 3,
    name: "Dr. Rick Johnson",
    specialization: "Orthopedic",
    avatar: DoctorIcon,
  },
  {
    id: 4,
    name: "Dr. Emily Brown",
    specialization: "Dermatologist",
    avatar: DoctorIcon,
  },
  {
    id: 5,
    name: "Dr. Riely Brown",
    specialization: "Dermatologist",
    avatar: DoctorIcon,
  },
  {
    id: 6,
    name: "Dr. Emily Blue",
    specialization: "Orthopedic",
    avatar: DoctorIcon,
  },
];

const DoctorList: React.FC = () => {
  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Text className="text-[black] font-bold text-lg">Doctor List</Text>
      <div className="max-h-72 overflow-y-auto h-72 mt-5">
        <List
          itemLayout="horizontal"
          dataSource={doctors}
          renderItem={(doctor) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={doctor.avatar} />}
                title={doctor.name}
                description={doctor.specialization}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default DoctorList;
