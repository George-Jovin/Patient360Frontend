import React from "react";
import { Row, Col } from "antd";
import ExecutiveCards from "../Components/Cards/ExecutiveCards";
import ExecutiveTable from "../Components/Tables/ExecutiveTable";
import DoctorList from "../Components/Lists/DoctorList";
import ActivityCalendar from "../Components/Calendar/ActivityCalendar";
import MonthlyReportList from "../Components/Lists/MonthlyReport";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-[#05004E] font-bold  text-[20px] ">RISK SCORE</h1>
      <Row className="mt-4">
        <Col span={24}>
          <ExecutiveCards />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={24}>
          <ExecutiveTable />
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
    </div>
  );
};

export default Home;
