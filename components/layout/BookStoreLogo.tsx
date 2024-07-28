import { Group, Text } from '@mantine/core';
import { SquareLibrary } from "lucide-react";
import React from "react";

const BookStoreLogo: React.FC = () => {
  return (
    <Group gap={"xs"} align={"center"}>
      <SquareLibrary className="h-full" />
      <Text size="md" fw={500}>
        Bookstore
      </Text>
    </Group>
  );
}

export default BookStoreLogo;
