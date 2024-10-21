import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, message } from "antd";
import { useParams } from "react-router-dom";
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
import ApiService from "../Api/Apiservices";
import Spinner from "../Components/Spinner/Spinner";

const { RangePicker } = DatePicker;
const PatientDashboard: React.FC = () => {
  const { patientid } = useParams<{ patientid: string }>();
  const [loading, setLoading] = useState(true);
  const patientIdNumber = patientid ? Number(patientid) : null;
  const [patientData, setPatientData] = useState<any>(null);

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

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const apiService = new ApiService();
        const response = await apiService.fetchPatientData(id);
        setPatientData(response.data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        message.error("Failed to fetch patient data")
      } finally {
        setLoading(false);
      }
    };

    if (patientIdNumber) {
      fetchData(patientIdNumber);
    }
  }, [patientIdNumber]);
  return (
    <div>
      <Spinner loading={loading}>
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
            <Profile patientData={patientData}/>
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
                <div className="absolute inset-0 flex flex-col mx-2 h-[1060px]">
                  <PatientCalendar />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="mt-4">
        <Col span={18}>
          <RecommendationCard patientData={patientData}/>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-4">
        <Col span={18}>
          <PatientDetailTable />
        </Col>
        <Col span={6}>
          <PrescriptionCard />
        </Col>
      </Row>
      </Spinner>
    </div>
  );
};

export default PatientDashboard;
