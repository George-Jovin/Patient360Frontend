import React from "react";
import { Card, Tabs, Input, Avatar, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DoctorIcon from "../Assets/Images/Doctorprofile-icon.svg";

const { Text } = Typography;

interface DoctorReport {
  id: number;
  name: string;
  department: string;
  count: number;
  avatar: string;
}

const appointmentReports: DoctorReport[] = [
  {
    id: 1,
    name: "Dr. Tommy Anderson",
    department: "Oncology",
    count: 26,
    avatar: DoctorIcon,
  },
  {
    id: 2,
    name: "Dr. Tommy Anderson",
    department: "Cardiology",
    count: 26,
    avatar: DoctorIcon,
  },
  {
    id: 3,
    name: "Dr. Tommy Anderson",
    department: "Neurology",
    count: 26,
    avatar: DoctorIcon,
  },
  {
    id: 4,
    name: "Dr. Tommy Anderson",
    department: "ENT",
    count: 26,
    avatar: DoctorIcon,
  },
  {
    id: 5,
    name: "Dr. Tommy Anderson",
    department: "Pediatrics",
    count: 26,
    avatar: DoctorIcon,
  },
  {
    id: 6,
    name: "Dr. Tommy Anderson",
    department: "Dermatology",
    count: 26,
    avatar: DoctorIcon,
  }
];

const surgeryReports: DoctorReport[] = [
  {
    id: 1,
    name: "Dr. Tommy Anderson",
    department: "Cardiac Surgery",
    count: 15,
    avatar: DoctorIcon,
  },
  {
    id: 2,
    name: "Dr. Tommy Anderson",
    department: "Neurosurgery",
    count: 22,
    avatar: DoctorIcon,
  },
  {
    id: 3,
    name: "Dr. Tommy Anderson",
    department: "Orthopedic Surgery",
    count: 18,
    avatar: DoctorIcon,
  },
  {
    id: 4,
    name: "Dr. Tommy Anderson",
    department: "General Surgery",
    count: 30,
    avatar: DoctorIcon,
  },
  {
    id: 5,
    name: "Dr. Tommy Anderson",
    department: "Plastic Surgery",
    count: 12,
    avatar: DoctorIcon,
  },
  {
    id: 6,
    name: "Dr. Tommy Anderson",
    department: "ENT Surgery",
    count: 20,
    avatar: DoctorIcon,
  }
];

const ReportList: React.FC<{ reports: DoctorReport[] }> = ({ reports }) => {
  return (
    <div className="space-y-2">
      <Input
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder="Search here..."
        className="rounded-lg bg-gray-50"
      />
      
      <div 
        className="space-y-4 overflow-y-auto pr-2 max-h-52"
      >
        {reports.map((report) => (
          <div 
            key={report.id}
            className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar 
                src={report.avatar}
                size={40}
                className="bg-gray-200"
              />
              <div>
                <Text className="font-medium text-[#05004E] block">
                  {report.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {report.department}
                </Text>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-[#EEF4FF] text-[#204496] font-medium px-3 py-1 rounded-lg">
                {report.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthlyReportList: React.FC = () => {
  return (
    <Card className="rounded-3xl shadow-custom custom-tabs">
      <Text className="text-[#05004E] font-bold text-xl block">
        Monthly Reports
      </Text>
      
      <Tabs
        defaultActiveKey="appointments"
        items={[
          {
            key: "appointments",
            label: (
              <span className="text-base font-medium">Appointments</span>
            ),
            children: <ReportList reports={appointmentReports} />
          },
          {
            key: "surgeries",
            label: (
              <span className="text-base font-medium">Surgeries</span>
            ),
            children: <ReportList reports={surgeryReports} />
          },
        ]}
      />
    </Card>
  );
};

export default MonthlyReportList;