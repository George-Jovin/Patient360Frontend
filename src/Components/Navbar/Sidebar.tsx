import React, { useEffect } from "react";
import { Layout as MainLayout } from "antd";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../Components/Assets/Images/Home-icon.svg";
// import SaveIcon from "../../Components/Assets/Images/Save-icon.svg";
import LogoutIcon from "../../Components/Assets/Images/Logout-icon.svg";

const { Sider } = MainLayout;

interface NavItem {
  label: string;
  link: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    link: "/Home",
    icon: HomeIcon,
  },
  // {
  //   label: "Save",
  //   link: "/PatientDashboard",
  //   icon: SaveIcon,
  // },
  {
    label: "Save",
    link: "http://4.193.105.54/customer360",
    icon: LogoutIcon,
  },
];

const DefaultSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState(-1);
  const location = useLocation();

  useEffect(() => {
    const currentLink = location.pathname;
    const foundIndex = navItems.findIndex((item) => item.link === currentLink);
    if (currentLink.startsWith('/PatientDashboard')) {
      setActiveItem(0); 
    } else {
      setActiveItem(foundIndex !== -1 ? foundIndex : -1);
    }
  }, [location]);

  return (
    <Sider
      trigger={null}
      className="fixed h-screen gradient-bg"
      collapsible={false}
      width={75}
    >
      <div className="flex flex-col mt-24">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <li
                className="flex items-center justify-center relative h-[62px]"
                onClick={() => setActiveItem(index)}
              >
                <span
                  className={`absolute inset-0 w-[45px] h-[45px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md transition-all duration-200 ${
                    activeItem === index ? "bg-white" : "bg-transparent"
                  }`}
                ></span>
                <span className="relative z-10 flex items-center justify-center w-6 h-6">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`w-full h-full ${
                      activeItem === index ? "gradient-icon" : ""
                    }`}
                  />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Sider>
  );
};

export default DefaultSidebar;
