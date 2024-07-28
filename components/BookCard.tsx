import React from "react";
import {Badge, Button, Card, Group, Text} from '@mantine/core';
import {Book} from "@/models/book";

export type BookCardProps = Book & {
  onAddToCart?: (book: Book) => void;
};

const BookCard: React.FC<BookCardProps> = (props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="tw-relative tw-bg-cover tw-bg-center tw-bg-no-repeat tw-h-[400px]"
      style={{backgroundImage: `url(${props.coverLink})`}}
    >
      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-black tw-text-white tw-bg-opacity-80 tw-p-4 tw-rounded-b-md">
        <Group justify="end" mb="xs">
          <Badge color="pink" className="tw-text-white">
            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(props.price)}
          </Badge>
        </Group>
        <Group justify="space-between" mb="xs">
          <Text fw={500} className="tw-text-white tw-break-all">{props.title}</Text>
        </Group>

        <Text size="sm" className="tw-text-white">
          Authors: {props.authors.join(", ")}
        </Text>

        {props.onAddToCart && <Button
            color="blue" fullWidth mt="md" radius="md"
            onClick={() => props.onAddToCart && props.onAddToCart(props)}>
          Add to Cart
        </Button>}
      </div>
    </Card>
  );
}

export default BookCard;
