import React, { useState } from "react";
import { Card, Row, Col, Modal, Collapse, Steps, Typography,message,Button } from "antd";
import Icon1 from "../Assets/Images/Recommendation-icon1.svg";
import Icon2 from "../Assets/Images/Recommendation-icon2.svg";
import Icon3 from "../Assets/Images/Recommendation-icon3.svg";
import ApiService from "../../Api/Apiservices";

const { Text } = Typography;

interface Recommendation {
  title: string;
  duration: string;
  icon: string;
  cardClass: string;
  titleClass: string;
}

interface PlanData {
  day: number;
  plan: string;
  isCompleted: boolean;
}

interface PatientData {
  patientid: number;
  Diet_PLAN: { [key: string]: string };
  Exercise_PLAN: { [key: string]: string };
  Routine_PLAN?: { [key: string]: string };
}

const recommendations: Recommendation[] = [
  {
    title: "Diet Plan",
    duration: "7 days",
    icon: Icon1,
    cardClass: "recommend-card1",
    titleClass: "title-color1",
  },
  {
    title: "Exercise",
    duration: "7 days",
    icon: Icon2,
    cardClass: "recommend-card2",
    titleClass: "title-color2",
  },
  {
    title: "Routine",
    duration: "7 days",
    icon: Icon3,
    cardClass: "recommend-card3",
    titleClass: "title-color3",
  },
];

const RecommendationCard: React.FC<{ patientData: PatientData }> = ({
  patientData,
}) => {
  const apiservice = new ApiService();
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [activePanel, setActivePanel] = useState<string | string[]>(["1"]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = (index: number) => {
    if (!flippedCards[index]) {
      setActiveCardIndex(index);
      setIsModalVisible(true);
    }
  };

  const handleAccept = async () => {
    if (activeCardIndex !== null) {
      let type = "";
      if (activeCardIndex === 0) {
        type = "Diet";
      } else if (activeCardIndex === 1) {
        type = "Exercise";
      } else if (activeCardIndex === 2) {
        type = "Routine";
      }
      setLoading(true);
      try {
        const response = await apiservice.acceptData(
          patientData?.patientid,
          type
        );
        if(response.status === 200) {
        setFlippedCards((prev) => ({
          ...prev,
          [activeCardIndex]: true,
        }));
        setIsModalVisible(false);
        message.success("Notification send to Your Whatsapp Successfully")
      }
      } catch (error) {
        console.error("Error sending plan via WhatsApp:", error);
        message.error("Error sending plan via WhatsApp")
      } finally {
        setLoading(false); 
      }
    }
  };

  const getModalContent = (index: number) => {
    switch (index) {
      case 0:
        return {
          title: "Diet Plan",
          data: Object?.entries(patientData?.Diet_PLAN).map(
            ([day, plan], idx) => ({
              day: idx + 1,
              plan,
              isCompleted: false,
            })
          ),
        };
      case 1:
        return {
          title: "Exercise Plan",
          data: Object?.entries(patientData?.Exercise_PLAN).map(
            ([day, plan], idx) => ({
              day: idx + 1,
              plan,
              isCompleted: false,
            })
          ),
        };
      case 2:
        return {
          title: "Routine Plan",
          data: patientData.Routine_PLAN
            ? Object?.entries(patientData?.Routine_PLAN).map(
                ([day, plan], idx) => ({
                  day: idx + 1,
                  plan,
                  isCompleted: false,
                })
              )
            : [],
        };
      default:
        return { title: "", data: [] };
    }
  };

  return (
    <>
      <Card className="shadow-custom rounded-3xl">
        <Text className="text-[black] font-bold text-lg">Recommendations</Text>
        <Row gutter={[16, 16]}>
          {recommendations.map((rec, index) => (
            <Col span={8} key={index}>
              <div
                className={`flip-card h-[250px] mt-4 ${
                  flippedCards[index] ? "is-flipped" : ""
                }`}
                onClick={() => showModal(index)}
              >
                <div className="flip-card-inner">
                  <div
                    className={`flip-card-front ${rec.cardClass} flex flex-col justify-end p-4`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <h1
                          className={`${rec.titleClass} text-[32px] font-extrabold`}
                        >
                          {rec.title}
                        </h1>
                        <h3
                          className={`${rec.titleClass} text-[16px] font-extrabold`}
                        >
                          {rec.duration}
                        </h3>
                      </div>
                      <img
                        src={rec.icon}
                        alt={rec.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                  <div
                    className={`flip-card-back ${rec.cardClass} flex flex-col justify-between p-4`}
                  >
                    <div
                      className={`${rec.titleClass} px-6 border-2 border-dashed w-fit py-2 flex mt-4 rounded-lg text-[16px] font-bold`}
                    >
                      <p>Accepted</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <h1
                          className={`${rec.titleClass} text-[32px] font-extrabold`}
                        >
                          {rec.title}
                        </h1>
                        <h3
                          className={`${rec.titleClass} text-[16px] font-extrabold`}
                        >
                          {rec.duration}
                        </h3>
                      </div>
                      <img
                        src={rec.icon}
                        alt={rec.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <h2 className="text-[#204496] font-bold">
              {activeCardIndex !== null &&
                getModalContent(activeCardIndex).title}{" "}
              <span className="text-sm font-normal">7 Days</span>
            </h2>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div key="footer" className="flex gap-1 justify-end">
            <Button
               className="!px-6 !py-4 !text-[#fff] border rounded-lg border-[#204496] bg-[#204496] hover:!bg-[#204499] hover:!border-[#204496]"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              className="!px-6 !py-4 !text-[#fff] border rounded-lg border-[#204496] bg-[#204496] hover:!bg-[#204499] hover:!border-[#204496]"
              onClick={handleAccept}
              loading={loading} 
            >
              Accept
            </Button>
          </div>,
        ]}
        width={600}
        className="rounded-lg"
      >
        <div className="p-4">
          <Steps
            current={currentStep - 1}
            size="small"
            className="mb-8 custom-steps"
            direction="horizontal"
          >
            {activeCardIndex !== null &&
              getModalContent(activeCardIndex).data.map((day) => (
                <Steps.Step
                  key={day.day}
                  status={
                    day.isCompleted
                      ? "finish"
                      : day.day === currentStep
                      ? "process"
                      : "wait"
                  }
                />
              ))}
          </Steps>

          <div className="max-h-[350px] overflow-y-auto pr-4">
            {activeCardIndex !== null &&
              getModalContent(activeCardIndex).data.map((day) =>
                day.isCompleted ? (
                  <div
                    key={day.day}
                    className="bg-green-50 p-4 rounded-lg border border-green-100 mb-2"
                  >
                    <p className="text-green-600 font-medium">
                      Day {day.day} Completed!
                    </p>
                  </div>
                ) : (
                  <Collapse
                    key={day.day}
                    activeKey={activePanel}
                    onChange={(key) => setActivePanel(key)}
                    className="border-none"
                  >
                    <Collapse.Panel
                      header={
                        <span className="text-[#204496] font-medium">
                          Day {day.day}
                        </span>
                      }
                      key={day.day.toString()}
                      className="bg-white !rounded-lg border shadow-sm mb-2"
                    >
                      <p className="text-gray-600 text-sm">{day.plan}</p>
                    </Collapse.Panel>
                  </Collapse>
                )
              )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecommendationCard;
