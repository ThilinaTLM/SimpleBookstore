"use client"

import React from "react";
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
        <Header/>
        <div>
          {props.children}
        </div>
        <Footer/>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default Layout;
