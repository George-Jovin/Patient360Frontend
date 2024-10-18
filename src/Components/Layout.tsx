import React, { ReactNode, useEffect, useRef } from "react";
import { Layout as MainLayout } from "antd";
import { useLocation } from "react-router-dom";
import DefaultHeader from "./Navbar/Header";
import ProductSidebar from "./Navbar/Sidebar";

const { Content } = MainLayout;

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position when route changes
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  }, [location.pathname]); 

  return (
    <div className="flex h-screen overflow-hidden">
      <ProductSidebar />
      <MainLayout className="flex flex-col w-full">
        <DefaultHeader />
        <MainLayout className="flex-1 overflow-hidden">
          <Content 
            ref={contentRef}
            className="h-full overflow-y-auto bg-[#FAFBFC] p-5 ml-[75px] mt-16 overflow-x-hidden"
          >
            {children}
          </Content>
        </MainLayout>
      </MainLayout>
    </div>
  );
};

export default DefaultLayout;