import React from "react";
import { Card, Row, Col } from 'antd';
import ProfileIcon from "../Assets/Images/PatientProfile-icon.svg";
import ProfileIcon1 from "../Assets/Images/Profile-icon1.svg";
import ProfileIcon2 from "../Assets/Images/Profile-icon2.svg";
import ProfileIcon3 from "../Assets/Images/Profile-icon3.svg";
import ProfileIcon4 from "../Assets/Images/Profile-icon4.svg";
import ProfileIcon5 from "../Assets/Images/Profile-icon5.svg";
import ProfileIcon6 from "../Assets/Images/Profile-icon6.svg";
import ProfileIcon7 from "../Assets/Images/Profile-icon7.svg";
import ProfileIcon8 from "../Assets/Images/Profile-icon8.svg";

interface PersonalInfo {
  icon: string;
  label: string;
  value: string;
}

interface MetricInfo {
  icon: string;
  label: string;
  value: string;
  change: number;
}

const personalInfoData: PersonalInfo[] = [
  {
    icon: ProfileIcon1,
    label: "Unique Id",
    value: "xxx xxx xx675"
  },
  {
    icon: ProfileIcon2,
    label: "Age",
    value: "48"
  },
  {
    icon: ProfileIcon3,
    label: "Gender",
    value: "Male"
  }
];

const metricsData: MetricInfo[] = [
  {
    icon: ProfileIcon4,
    label: "Heart Rate",
    value: "89 bpm",
    change: -16
  },
  {
    icon: ProfileIcon5,
    label: "SpO2",
    value: "99%",
    change: -16
  },
  {
    icon: ProfileIcon6,
    label: "Stress",
    value: "69",
    change: -16
  },
  {
    icon: ProfileIcon7,
    label: "Blood Pressure",
    value: "120/80",
    change: -16
  },
  {
    icon: ProfileIcon8,
    label: "Respiratory Rate",
    value: "16 Breaths/min",
    change: -16
  }
];

const PersonalInfoCard: React.FC<PersonalInfo> = ({ icon, label, value }) => (
  <div className="flex flex-row items-center mb-4 gap-8 ml-4">
    <img src={icon} alt={`${label}-icon`} className="w-1/4" />
    <div className="flex flex-col">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold text-[16px]">{value}</p>
    </div>
  </div>
);

const MetricCard: React.FC<MetricInfo> = ({ icon, label, value, change }) => (
  <div className="flex flex-row items-center gap-8">
    <img src={icon} alt={`${label}-icon`} className="w-1/4" />
    <div className="flex flex-col">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold text-[16px]">{value}</p>
    </div>
  </div>
);

const Profile: React.FC = () => {
  return (
    <Card className="w-full shadow-lg rounded-3xl">
      <div className="w-full">
      <Row gutter={[16, 16]} justify="space-between">
        <Col span={12}>
          <div className="flex flex-col items-center mb-6 justify-center">
            <div className="flex justify-center mb-2 pt-8">
              <img src={ProfileIcon} alt="user-icon"  className="w-full"/>
            </div>
            <h2 className="text-[24px] font-bold pb-2">John Doe</h2>
            <div className="gradient-red rounded-2xl px-2 border border-[#EC221F] mb-12"><p className="text-[#EC221F] text-xl font-extrabold">Risk Score : 85</p></div>
            <div className="w-full">
              {personalInfoData.map((info, index) => (
                <PersonalInfoCard
                  key={index}
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                />
              ))}
            </div>
          </div>
        </Col>
        
        <Col span={12} >
          <div className="space-y-8">
            {metricsData.map((metric, index) => (
              <MetricCard
                key={index}
                icon={metric.icon}
                label={metric.label}
                value={metric.value}
                change={metric.change}
              />
            ))}
          </div>
        </Col>
      </Row>
      </div>
    </Card>
  );
};

export default Profile;