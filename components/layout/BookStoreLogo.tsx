import { Group, Text } from '@mantine/core';
import { SquareLibrary } from "lucide-react";
import React from "react";
import Link from "next/link";

const BookStoreLogo: React.FC = () => {
  return (
    <Link href="/">
      <Group gap={"xs"} align={"center"}>
        <SquareLibrary className="h-full" />
        <Text size="md" fw={500}>
          Bookstore
        </Text>
      </Group>
    </Link>

  );
}

export default BookStoreLogo;
