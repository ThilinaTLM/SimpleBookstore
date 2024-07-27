import React from "react";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Header/>
      <div>
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;
