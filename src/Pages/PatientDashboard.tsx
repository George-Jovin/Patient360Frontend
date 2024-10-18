import React from "react";
import { Row, Col } from "antd";
import Profile from "../Components/Cards/Profile";
import RiskScoreLine from "../Components/Charts/RiskScoreLine";
import HealthTrendLine from "../Components/Charts/HealthTrendLine";
import RiskScorePie from "../Components/Charts/RiskScorePie";
import HealthTrendBar from "../Components/Charts/HealthTrendBar";
import PatientCalendar from "../Components/Calendar/PatientCalendar";
import RecommendationCard from "../Components/Cards/RecommendationCard";
import PatientDetailTable from "../Components/Tables/PatientDetailTable";
import PrescriptionCard from "../Components/Cards/PrescriptionCard";

const PatientDashboard: React.FC = () => {
  return (
    <div >
      <h1 className="text-[#05004E] font-bold text-[20px] mb-6">
        PATIENT DASHBOARD
      </h1>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="space-y-6">
            <Profile />
            <HealthTrendLine />
          </div>
        </Col>
        <Col span={12}>
          <div className="space-y-6">
            <Row>
              <Col span={24}>
                <RiskScoreLine />
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col span={12}>
                <div className="space-y-8">
                  <RiskScorePie />
                  <HealthTrendBar />
                </div>
              </Col>
              <Col span={12}>
                <PrescriptionCard />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-4">
        <Col span={18}>
        <div className="space-y-6">
        <RecommendationCard/>
        <PatientDetailTable/>
        </div>
        </Col>
        <Col span={6}>
        <PatientCalendar />
        </Col>
      </Row>
    </div>
  );
};

export default PatientDashboard;