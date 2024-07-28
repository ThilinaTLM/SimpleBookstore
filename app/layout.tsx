import '@mantine/core/styles.css';
import './global.css';
import React from "react";
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import Layout from "@/components/layout/Layout";

export const metadata = {
  title: 'Bookstore',
  description: 'Online Bookstore where you can find your favorite books',
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
    <head>
      <ColorSchemeScript/>
    </head>
    <body>
        <Layout>
          {props.children}
        </Layout>
    </body>
    </html>
  );
}
