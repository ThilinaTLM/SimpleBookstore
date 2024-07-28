"use client"

import React from "react";
import {Notifications} from '@mantine/notifications';
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {MantineProvider} from "@mantine/core";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <div className="tw-min-h-screen tw-flex tw-flex-col">
          <Header/>
          <div className="tw-flex-grow">
            {props.children}
          </div>
          <Footer/>
        </div>
        <Notifications
          position="top-right"
        />
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default Layout;
