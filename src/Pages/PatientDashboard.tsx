import React from "react";
import { Row, Col, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import Profile from "../Components/Cards/Profile";
import RiskScoreLine from "../Components/Charts/RiskScoreLine";
import HealthTrendLine from "../Components/Charts/HealthTrendLine";
import RiskScorePie from "../Components/Charts/RiskScorePie";
import HealthTrendBar from "../Components/Charts/HealthTrendBar";
import PatientCalendar from "../Components/Calendar/PatientCalendar";
import RecommendationCard from "../Components/Cards/RecommendationCard";
import PatientDetailTable from "../Components/Tables/PatientDetailTable";
import PrescriptionCard from "../Components/Cards/PrescriptionCard";

const { RangePicker } = DatePicker;

const PatientDashboard: React.FC = () => {
  const handleDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#05004E] font-bold text-[20px]">
          PATIENT DASHBOARD
        </h1>
        <RangePicker
          onChange={handleDateChange}
          className="w-[250px] rounded-xl"
          format="DD-MM-YYYY"
        />
      </div>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="space-y-6">
            <Profile />
            <HealthTrendLine />
          </div>
        </Col>
        <Col span={12}>
          <div className="space-y-6">
            <RiskScoreLine />
            <Row gutter={[24, 0]}>
              <Col span={12}>
                <div className="space-y-6">
                  <RiskScorePie />
                  <HealthTrendBar />
                </div>
              </Col>
              <Col span={12} className="relative">
                <div className="absolute inset-0 flex flex-col mx-2 h-[1030px]">
                  <PatientCalendar />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-4">
        <Col span={18}>
          <RecommendationCard />
        </Col>
      </Row>

      <Row gutter={24} className="mt-4">
        <Col span={18}>
          <PatientDetailTable />
        </Col>
        <Col span={6}>
          <PrescriptionCard />
        </Col>
      </Row>
    </div>
  );
};

export default PatientDashboard;
