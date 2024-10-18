import React, { useState } from "react";
import {
  Calendar,
  Badge,
  Card,
  Tabs,
  Typography,
  Row,
  Col,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DoctorProfile from "../Assets/Images/Doctorprofile-icon.svg";

const { Text } = Typography;
const { TabPane } = Tabs;

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: "routine" | "followup";
  status: "upcoming" | "past";
  avatar: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    date: "2024-10-25",
    time: "09:00 AM - 10:00 AM",
    doctor: "Dr. Edison",
    type: "routine",
    status: "upcoming",
    avatar: DoctorProfile,
  },
  {
    id: "2",
    date: "2024-10-16",
    time: "02:00 PM - 03:00 PM",
    doctor: "Dr. Tesla",
    type: "followup",
    status: "past",
    avatar: DoctorProfile,
  },
  {
    id: "3",
    date: "2024-10-15",
    time: "02:00 PM - 03:00 PM",
    doctor: "Dr. Tesla",
    type: "followup",
    status: "past",
    avatar: DoctorProfile,
  },
  {
    id: "4",
    date: "2024-10-10",
    time: "02:00 PM - 03:00 PM",
    doctor: "Dr. Tesla",
    type: "followup",
    status: "past",
    avatar: DoctorProfile,
  },
  {
    id: "5",
    date: "2024-10-29",
    time: "09:00 AM - 10:00 AM",
    doctor: "Dr. Edison",
    type: "routine",
    status: "upcoming",
    avatar: DoctorProfile,
  },
  {
    id: "6",
    date: "2024-10-22",
    time: "09:00 AM - 10:00 AM",
    doctor: "Dr. Edison",
    type: "routine",
    status: "upcoming",
    avatar: DoctorProfile,
  },
];

const calculateDays = (appointmentDate: string) => {
  const currentDate = dayjs();
  const targetDate = dayjs(appointmentDate);
  const difference = targetDate.diff(currentDate, "day");

  return difference >= 0
    ? `${difference} days to go`
    : `${Math.abs(difference)} days ago`;
};

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => (
  <Card className="mb-4 shadow-custom">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <Badge
          color={appointment.type === "routine" ? "#204496" : "#34C759"}
          text={
            <strong>
              {appointment.type === "routine" ? "Routine Checkup" : "Follow-up"}
            </strong>
          }
        />
        <Text className="text-[#51505D] font-normal text-xs pt-2">
          {appointment.time}
        </Text>
        <Text className="text-[#51505D] font-normal text-xs">
          {appointment.date}, {calculateDays(appointment.date)}
        </Text>
      </div>
      <div className="flex items-center">
        <Text strong>{appointment.doctor}</Text>
      </div>
    </div>
  </Card>
);

const PatientCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const getListData = (value: Dayjs): Appointment[] => {
    return appointments.filter(
      (appointment) => appointment.date === value.format("YYYY-MM-DD")
    );
  };

  const filteredAppointments = appointments.filter(
    (app) => app.status === activeTab
  );

  return (
    <Card className="w-full shadow-custom rounded-3xl h-full custom-tabs">
      <Row gutter={[32, 32]}>
        <Col span={24}>
        <Text className="text-[black] font-bold text-lg">
        Appointments
      </Text>
          <Calendar
          className="mt-4"
            fullscreen={false}
            onSelect={(date) => setSelectedDate(date)}
            fullCellRender={(current) => {
              const listData = getListData(current);
              const hasUpcomingAppointment = listData.some(
                (item) => item.status === "upcoming"
              );
              const hasPastAppointment = listData.some(
                (item) => item.status === "past"
              );

              let style: React.CSSProperties = {};
              if (hasUpcomingAppointment) style.backgroundColor = "#204496";
              if (hasPastAppointment) style.backgroundColor = "#34C759";
              if (hasUpcomingAppointment) style.color = "#fff";
              if (hasPastAppointment) style.color = "#fff";

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
          <div className="flex gap-4 px-2 py-4">
            <Badge
              color="#204496"
              text={"Upcoming Appointments"}
            />
            <Badge color="#34C759" text={"Past Visits"} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="appointment-tabs"
          >
            <TabPane tab="Upcoming Appointments" key="upcoming">
              <div className="max-h-60 overflow-y-auto pres-card pr-2">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </TabPane>
            <TabPane tab="Past Visits" key="past">
              <div className="max-h-60 overflow-y-auto pres-card pr-2">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default PatientCalendar;
