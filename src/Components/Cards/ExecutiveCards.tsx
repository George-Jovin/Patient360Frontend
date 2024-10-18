import React from "react";
import { Card, Row, Col } from "antd";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Cardicon1 from "../Assets/Images/Card-icon1.svg";
import Cardicon2 from "../Assets/Images/Card-icon2.svg";
import Cardicon3 from "../Assets/Images/Card-icon3.svg";
import Cardicon4 from "../Assets/Images/Card-icon4.svg";

const executiveData = [
  {
    id: 1,
    name: "Total Patients",
    count: "2150",
    image: Cardicon1,
    description: "16%",
    trend: "up"
  },
  {
    id: 2,
    name: "Appointments",
    count: "2150",
    image: Cardicon1,
    description: "16%",
    trend: "down"
  },
  {
    id: 3,
    name: "New Patients",
    count: "155",
    image: Cardicon1,
    description: "16%",
    trend: "up"
  },
  {
    id: 4,
    name: "High Risk",
    count: "21",
    image: Cardicon2,
    description: "16%",
    trend: "down"
  },
  {
    id: 5,
    name: "Mid Risk",
    count: "55",
    image: Cardicon3,
    description: "16%",
    trend: "up"
  },
  {
    id: 6,
    name: "Low Risk",
    count: "1671",
    image: Cardicon4,
    description: "16%",
    trend: "up"
  },
];

const ExecutiveCards: React.FC = () => {
  return (
    <Row gutter={32} className="custom-card">
      {executiveData.map((executive) => (
        <Col key={executive.id} xs={24} sm={12} md={8}>
          <Card className="mb-4 shadow-custom rounded-3xl">
            <Row gutter={0} align="middle" className="items-center">
              <Col span={6} className="flex justify-center">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="w-[60%] mb-0"
                />
              </Col>
              <Col span={18}>
                <h3 className="text-[#7887A6] text-[14px] font-normal mb-0">{executive.name}</h3>
                <p className="text-[#333] text-[24px] font-semibold mb-0">{executive.count}</p>
                <div className="flex font-medium items-center mb-0">
                  <p className={`${executive.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center mb-0`}>
                    {executive.trend === "up" ? (
                      <AiOutlineArrowUp className="mr-1" />
                    ) : (
                      <AiOutlineArrowDown className="mr-1" />
                    )}
                    <span>{executive.description}</span>
                  </p> &nbsp; this month
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ExecutiveCards;
