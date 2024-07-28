"use client"

import {Container, Group, Text} from '@mantine/core';
import BookStoreLogo from "@/components/layout/BookStoreLogo";
import React from "react";
import {ShoppingCart} from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="tw-h-14 tw-mb-5 tw-border-b">
      <Container size="md" className="tw-h-14 tw-flex tw-justify-between tw-items-center">
        <BookStoreLogo />
        <Group gap={5}>
          <ShoppingCart />
        </Group>
      </Container>
    </header>
  );
}

export default Header;
