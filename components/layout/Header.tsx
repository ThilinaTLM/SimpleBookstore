"use client"

import {Container, Group} from '@mantine/core';
import BookStoreLogo from "@/components/layout/BookStoreLogo";
import React from "react";
import CartButton from "@/components/CartButton";

const Header: React.FC = () => {
  return (
    <header className="tw-h-14 tw-mb-5 tw-border-b tw-sticky tw-top-0 tw-z-10 tw-bg-white">
      <Container size="md" className="tw-h-14 tw-flex tw-justify-between tw-items-center">
        <BookStoreLogo />
        <Group gap={5}>
          <CartButton />
        </Group>
      </Container>
    </header>
  );
}

export default Header;
