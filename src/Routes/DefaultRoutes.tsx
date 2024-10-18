import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../Pages/Home";
import PatientDashboard from "../Pages/PatientDashboard";
import DefaultLayout from "../Components/Layout";

const DefaultRoutes: React.FC = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="*" element={<Navigate to="/Home" />} />
        <Route path="/PatientDashboard" element={<PatientDashboard />} />
      </Routes>
    </DefaultLayout>
  );
};

export default DefaultRoutes;
