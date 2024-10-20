import React, { useState } from "react";
import {
  Calendar,
  Badge,
  List,
  Avatar,
  Card,
  Typography,
  Row,
  Col,
  Input
} from "antd";
import DoctorProfile from "../Assets/Images/Doctorprofile-icon.svg";
import { SearchOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from 'dayjs'; // Import dayjs

const { Text } = Typography;

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: "appointment" | "surgery";
  avatar: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    date: "2024-10-16",
    time: "09:00AM - 10:00PM",
    doctor: "Dr. Edison",
    type: "appointment",
    avatar: DoctorProfile,
  },
  {
    id: "2",
    date: "2024-10-16",
    time: "14:00PM - 15:00PM",
    doctor: "Dr. Tesla",
    type: "surgery",
    avatar: DoctorProfile,
  },
  {
    id: "3",
    date: "2024-10-17",
    time: "10:00AM - 11:00AM",
    doctor: "Dr. Curie",
    type: "appointment",
    avatar: DoctorProfile,
  },
  {
    id: "4",
    date: "2024-10-19",
    time: "10:00AM - 11:00AM",
    doctor: "Dr. Curie",
    type: "appointment",
    avatar: DoctorProfile,
  },
  {
    id: "5",
    date: "2024-12-17",
    time: "10:00AM - 11:00AM",
    doctor: "Dr. Curie",
    type: "appointment",
    avatar: DoctorProfile,
  },
];

const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); 

  const getListData = (value: Dayjs): Appointment[] => {
    return appointments.filter(
      (appointment) => appointment.date === value.format("YYYY-MM-DD")
    );
  };

  const onSelect = (newValue: Dayjs) => {
    setSelectedDate(newValue);
  };

  const filteredAppointments = selectedDate
    ? appointments.filter(
        (app) => app.date === selectedDate.format("YYYY-MM-DD")
      )
    : appointments;

  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Row gutter={42}>
        <Col span={14}>
          <Calendar
            fullscreen={false}
            onSelect={onSelect}
            fullCellRender={(current) => {
              const listData = getListData(current);
              const hasAppointment = listData.some(
                (item) => item.type === "appointment"
              );
              const hasSurgery = listData.some(
                (item) => item.type === "surgery"
              );

              let style: React.CSSProperties = {};
              if (hasAppointment) style.backgroundColor = "#34C759";
              if (hasSurgery) style.backgroundColor = "#204496";
              if (hasSurgery) style.color = "#fff";
              if (hasSurgery) style.color = "#fff";

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
            className="mt-4"
          />
        </Col>
        <Col span={10}>
        <Text className="text-[black] font-bold text-lg">
        Activity Details
      </Text>
      
          <div className="flex gap-3 py-4">
            <Badge color="#34C759" text="Appointment" />
            <Badge color="#204496" text="Surgery" />
          </div>
          <Input
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder="Search here..."
        className="rounded-lg bg-gray-50"
      />
          <div className="max-h-64 overflow-y-auto py-2">
            <List
              itemLayout="horizontal"
              dataSource={filteredAppointments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.doctor}
                    description={
                      <>
                        <Badge
                          color={
                            item.type === "appointment" ? "#34C759" : "#204496"
                          }
                        />
                        <Text className="ml-2">{`${item.time}`}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AppointmentCalendar;
