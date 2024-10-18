import React from "react";
import { Layout as MainLayout } from "antd";
import Logo from "../../Components/Assets/Images/Logo.svg";
import Bell from "../../Components/Assets/Images/Bell-icon.svg";
import Profile from "../../Components/Assets/Images/user-icon.svg";
import { Link } from "react-router-dom";
const { Header } = MainLayout;

const DefaultHeader: React.FC = () => {
  return (
    <Header className="bg-white flex items-center justify-between z-10 shadow-custom fixed w-full">
      <div className="flex items-center">
        <Link to="/Home">
          <img src={Logo} className="h-8 mr-3" alt="Customer 360 Logo" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <img src={Bell} className="cursor-pointer" alt="notification"/>
        <div className="flex items-center">
          <img src={Profile} className="h-8 w-8 rounded-full mr-2" alt="User" />
          <div className="flex flex-col">
            <p className="text-coral text-sm">DemoUser</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default DefaultHeader;
