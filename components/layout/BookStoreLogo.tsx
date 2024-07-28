import { Group, Text } from '@mantine/core';
import React from "react";
import Link from "next/link";
import BookIconSrc from "@/assert/book.webp"
import Image from "next/image";

const BookStoreLogo: React.FC = () => {
  return (
    <Link href="/">
      <Group gap={"xs"} align={"center"}>
        <Image
          src={BookIconSrc} alt="Book Logo"
          width={30} height={30}
        />
        <Text size="md" fw={500}>
          Bookstore
        </Text>
      </Group>
    </Link>

  );
}

export default BookStoreLogo;
