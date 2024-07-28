"use client"

import React from "react";
import {Container, Text} from '@mantine/core';

const Footer: React.FC = () => {


  return (
    <div className="tw-mt-8 tw-border-t tw-border-gray-200">
      <Container className="tw-flex tw-flex-col tw-justify-between tw-items-center tw-py-4">
        <Text c={"gray"} size={"sm"}>
          &copy; 2024 Bookstore. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}

export default Footer;
