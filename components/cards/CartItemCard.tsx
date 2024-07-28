import React from "react";
import {CartItem, useCartStore} from "@/store/cartStore";
import BookCard from "@/components/cards/BookCard";
import {Button, NumberInput, Text} from "@mantine/core";
import {formatPrice} from "@/lib/format";
import FancyLabelWrap from "@/components/FancyLabelWrap";
import {Trash} from "lucide-react";

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
        <FancyLabelWrap label="Price">
          <Text fw="bold" size="lg">{formatPrice(item.price)}</Text>
        </FancyLabelWrap>
        <FancyLabelWrap label="Quality">
          <NumberInput
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e as string))}
            min={1}
            className="tw-w-24"
          />
        </FancyLabelWrap>
        <FancyLabelWrap label="Subtotal">
          <Text fw="bold" size="lg">{formatPrice(item.price * item.quantity)}</Text>
        </FancyLabelWrap>
        <div>
          <Button
            leftSection={<Trash className="tw-w-4 tw-h-4" />}
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
