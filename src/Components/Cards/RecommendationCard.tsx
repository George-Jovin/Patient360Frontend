import React, { useState } from "react";
import { Card, Row, Col, Modal, Collapse, Steps,Typography } from "antd";
import Icon1 from "../Assets/Images/Recommendation-icon1.svg";
import Icon2 from "../Assets/Images/Recommendation-icon2.svg";
import Icon3 from "../Assets/Images/Recommendation-icon3.svg";
const {Text} = Typography

interface Recommendation {
  title: string;
  duration: string;
  icon: string;
  cardClass: string;
  titleClass: string;
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

interface PlanData {
  day: number;
  plan: string;
  isCompleted: boolean;
}

const dietPlanData: PlanData[] = [
  {
    day: 1,
    plan: "Start your day with oatmeal and fruits. For lunch, have a quinoa bowl with vegetables. Dinner should include lean protein and green vegetables.",
    isCompleted: false,
  },
  {
    day: 2,
    plan: "Breakfast with whole grain toast and eggs. Lunch with grilled chicken salad. Fish and roasted vegetables for dinner.",
    isCompleted: false,
  },
  {
    day: 3,
    plan: "Yogurt parfait for breakfast. Turkey wrap for lunch. Lean beef stir-fry for dinner.",
    isCompleted: false,
  },
  {
    day: 4,
    plan: "Start your day with a high-protein breakfast, such as eggs or Greek yogurt with fruit. For lunch and dinner, include lean proteins like chicken or fish, plenty of vegetables, and a portion of whole grains. Snacks can be fruits, nuts, or low-fat dairy to keep energy levels steady throughout the day.",
    isCompleted: false,
  },
  {
    day: 5,
    plan: "Smoothie bowl for breakfast. Mediterranean salad for lunch. Grilled fish with quinoa for dinner.",
    isCompleted: false,
  },
  {
    day: 6,
    plan: "Protein pancakes for breakfast. Tuna salad for lunch. Chicken breast with sweet potato for dinner.",
    isCompleted: false,
  },
  {
    day: 7,
    plan: "Egg white omelet for breakfast. Greek salad for lunch. Tofu stir-fry for dinner.",
    isCompleted: false,
  },
];

const exercisePlanData: PlanData[] = [
  { day: 1, plan: "30 minutes of brisk walking", isCompleted: false },
  {
    day: 2,
    plan: "20 minutes of bodyweight exercises (push-ups, squats, lunges)",
    isCompleted: false,
  },
  { day: 3, plan: "30 minutes of cycling", isCompleted: false },
  {
    day: 4,
    plan: "Yoga or stretching session for 20 minutes",
    isCompleted: false,
  },
  { day: 5, plan: "30 minutes of jogging or running", isCompleted: false },
  {
    day: 6,
    plan: "Strength training with dumbbells for 25 minutes",
    isCompleted: false,
  },
  {
    day: 7,
    plan: "45 minutes of swimming or water aerobics",
    isCompleted: false,
  },
];

const routinePlanData: PlanData[] = [
  {
    day: 1,
    plan: "Wake up at 6 AM, meditate for 10 minutes",
    isCompleted: false,
  },
  { day: 2, plan: "Read a book for 30 minutes before bed", isCompleted: false },
  {
    day: 3,
    plan: "Practice a hobby or learn a new skill for 1 hour",
    isCompleted: false,
  },
  { day: 4, plan: "Go to bed by 10 PM for proper sleep", isCompleted: false },
  {
    day: 5,
    plan: "Take a 15-minute walk during lunch break",
    isCompleted: false,
  },
  {
    day: 6,
    plan: "Declutter a small area of your living space",
    isCompleted: false,
  },
  { day: 7, plan: "Prepare meals for the next week", isCompleted: false },
];

const RecommendationCard: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [activePanel, setActivePanel] = useState<string | string[]>(["1"]);
  const [currentStep] = useState<number>(1);

  const showModal = (index: number) => {
    if (!flippedCards[index]) {
      setActiveCardIndex(index);
      setIsModalVisible(true);
    }
  };

  const handleAccept = () => {
    if (activeCardIndex !== null) {
      setFlippedCards(prev => ({
        ...prev,
        [activeCardIndex]: true
      }));
      setIsModalVisible(false);
    }
  };


  const getModalContent = (index: number) => {
    switch (index) {
      case 0:
        return { title: "Diet Plan", data: dietPlanData };
      case 1:
        return { title: "Exercise Plan", data: exercisePlanData };
      case 2:
        return { title: "Routine Plan", data: routinePlanData };
      default:
        return { title: "", data: [] };
    }
  };

  return (
    <>
     <Card className="shadow-custom rounded-3xl">
        <Text className="text-[black] font-bold text-lg">
          Recommendations
        </Text>
        <Row gutter={[16, 16]}>
          {recommendations.map((rec, index) => (
            <Col span={8} key={index}>
              <div
                className={`flip-card h-[250px] mt-4 ${
                  flippedCards[index] ? 'is-flipped' : ''
                }`}
                onClick={() => showModal(index)}
              >
                <div className="flip-card-inner">
                  <div
                    className={`flip-card-front ${rec.cardClass} flex flex-col justify-end p-4`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <h1 className={`${rec.titleClass} text-[32px] font-extrabold`}>
                          {rec.title}
                        </h1>
                        <h3 className={`${rec.titleClass} text-[16px] font-extrabold`}>
                          {rec.duration}
                        </h3>
                      </div>
                      <img src={rec.icon} alt={rec.title} className="w-[35%]" />
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
                        <h1 className={`${rec.titleClass} text-[32px] font-extrabold`}>
                          {rec.title}
                        </h1>
                        <h3 className={`${rec.titleClass} text-[16px] font-extrabold`}>
                          {rec.duration}
                        </h3>
                      </div>
                      <img src={rec.icon} alt={rec.title} className="w-[35%]" />
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
            <button
              className="px-6 py-2 text-gray-600 border rounded-lg"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 text-[#204496] border rounded-lg border-[#204496]"
              onClick={handleAccept}
            >
              Accept
            </button>
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
                  // title={`${day.day}`}
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
