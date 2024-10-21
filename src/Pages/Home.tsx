import React, { useEffect, useState } from "react";
import { Row, Col,message } from "antd";
import ExecutiveCards from "../Components/Cards/ExecutiveCards";
import ExecutiveTable from "../Components/Tables/ExecutiveTable";
import DoctorList from "../Components/Lists/DoctorList";
import ActivityCalendar from "../Components/Calendar/ActivityCalendar";
import MonthlyReportList from "../Components/Lists/MonthlyReport";
import ApiService from "../Api/Apiservices";
import Spinner from "../Components/Spinner/Spinner";

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiservice = new ApiService();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await apiservice.fetchAllData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch patient data")
      }finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Spinner loading={loading}>
      <h1 className="text-[#05004E] font-bold text-[20px]">RISK SCORE</h1>
      <Row className="mt-4">
        <Col span={24}>
          <ExecutiveCards />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={24}>
        <ExecutiveTable data={data} /> 
        </Col>
      </Row>
      <Row className="mt-4" gutter={16}>
        <Col span={5}>
          <DoctorList />
        </Col>
        <Col span={12}>
          <ActivityCalendar />
        </Col>
        <Col span={7}>
          <MonthlyReportList />
        </Col>
      </Row>
      </Spinner>
    </div>
  );
};

export default Home;
