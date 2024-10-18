import React, { useState } from "react";
import { Card, Badge, Button, Typography, Modal, Steps, Collapse } from "antd";

const { Text } = Typography;

interface PlanDay {
  day: number;
  instructions: string;
  isCompleted: boolean;
}

interface Prescription {
  id: number;
  name: string;
  duration: string;
  times: string;
  plan: PlanDay[];
}

const prescriptions: Prescription[] = [
  {
    id: 1,
    name: "Medication 1",
    duration: "15 Mar 2024 - 25 Mar 2024",
    times: "Morning,Evening",
    plan: [
      { day: 1, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 2, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 3, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 4, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 5, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 6, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
      { day: 7, instructions: "Take 1 pill with breakfast and 1 pill with dinner", isCompleted: false },
    ],
  },
  {
    id: 2,
    name: "Medication 2",
    duration: "26 Mar 2024 - 05 Apr 2024",
    times: "Morning,Afternoon",
    plan: [
      { day: 1, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 2, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 3, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 4, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 5, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 6, instructions: "Take 2 pills with breakfast", isCompleted: false },
      { day: 7, instructions: "Take 2 pills with breakfast", isCompleted: false },
    ],
  },
  {
    id: 3,
    name: "Medication 3",
    duration: "06 Apr 2024 - 16 Apr 2024",
    times: "Evening,Night",
    plan: [
      { day: 1, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 2, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 3, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 4, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 5, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 6, instructions: "Take 1 pill before dinner", isCompleted: true },
      { day: 7, instructions: "Take 1 pill before dinner", isCompleted: true },
    ],
  },
  {
    id: 4,
    name: "Medication 4",
    duration: "17 Apr 2024 - 27 Apr 2024",
    times: "Morning,Evening",
    plan: [
      { day: 1, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 2, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 3, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 4, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 5, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 6, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
      { day: 7, instructions: "Take 1 pill after breakfast and 1 pill after dinner", isCompleted: true },
    ],
  },
  {
    id: 5,
    name: "Medication 5",
    duration: "28 Apr 2024 - 08 May 2024",
    times: "Afternoon,Night",
    plan: [
      { day: 1, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 2, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 3, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 4, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 5, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 6, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
      { day: 7, instructions: "Take 1 pill with lunch and 1 pill before bed", isCompleted: true },
    ],
  },
];


const PrescriptionCard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activePrescription, setActivePrescription] =
    useState<Prescription | null>(null);
  const [activePanel, setActivePanel] = useState<string | string[]>(["1"]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const showModal = (prescription: Prescription) => {
    setActivePrescription(prescription);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setActivePrescription(null);
  };

  return (
    <Card className="w-full shadow-custom rounded-3xl h-full">
      <Text className="text-[black] font-bold text-lg">
        Prescription Tracking
      </Text>
      <div className="max-h-[600px] overflow-y-auto pres-card mt-4 pr-2">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="mb-4 shadow-custom">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Badge
                  color="#5856D6"
                  text={
                    <span className="text-[#2B2B2B] font-bold">
                      {prescription.name}
                    </span>
                  }
                />
                <Text className="text-[#51505D] font-normal text-xs pt-2">
                  {prescription.duration}
                </Text>
                <Text className="text-[#51505D] font-normal text-xs">
                  {prescription.times}
                </Text>
              </div>
              <div className="flex items-center">
                <Button
                  className="bg-[#204496] text-[white]"
                  onClick={() => showModal(prescription)}
                >
                  Track
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <h2 className="text-[#204496] font-bold">
              {activePrescription?.name}{" "}
              <span className="text-sm font-normal">7 Days</span>
            </h2>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <div key="footer" className="flex gap-1 justify-end">
            <Button onClick={handleCancel}>Close</Button>
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
            {activePrescription?.plan.map((day) => (
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
            {activePrescription?.plan.map((day) =>
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
                    <p className="text-gray-600 text-sm">{day.instructions}</p>
                  </Collapse.Panel>
                </Collapse>
              )
            )}
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default PrescriptionCard;
