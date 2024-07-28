import React from "react";
import {CartItem, useCartStore} from "@/store/cartStore";
import BookCard from "@/components/BookCard";
import {Button, NumberInput, Text} from "@mantine/core";
import {formatPrice} from "@/lib/format";

export type CartItemCardProps = {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({item}) => {
  const {updateQuantity, removeItem} = useCartStore();

  return (
    <div className="tw-flex tw-flex-row tw-space-x-4 tw-border tw-p-4">
      <div className="tw-w-[200px] tw-h-[300px]">
        <BookCard {...item.data} />
      </div>
      <div className="tw-flex tw-flex-col tw-space-y-2">
        <Text><strong>Price:</strong> {formatPrice(item.price)}</Text>
        <div className="flex flex-row">
          <Text><strong>Quantity:</strong></Text>
          <NumberInput
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e as string))}
            min={1}
          />
        </div>
        <Text><strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}</Text>
        <div className="tw-mt-2">
          <Button
            color="red"
            onClick={() => removeItem(item.id)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
