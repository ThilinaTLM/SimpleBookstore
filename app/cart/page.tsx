"use client"

import {Button, Container, Grid, Text, Title} from "@mantine/core";
import {useCartStore} from "@/store/cartStore";
import CartItemCard from "@/components/CartItemCard";
import {formatPrice} from "@/lib/format";

export default function CartPage() {
  const {items, totalPrice, removeItem, updateQuantity} = useCartStore();

  return (
    <Container>
      <div className="tw-mb-4">
        <Text size="lg" fw="bold">
          Your Cart
        </Text>
      </div>
      {items.length > 0 ? (
        <div className="tw-flex tw-flex-col tw-space-y-4">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item}/>
            ))}
          </div>
          <div className="tw-flex tw-justify-between tw-items-center">
            <Text size="lg" fw="bold" className="tw-mb-6">
              Total: {formatPrice(totalPrice)}
            </Text>
            <Button>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <Grid justify="center">
          <Text>Your cart is empty.</Text>
        </Grid>
      )}
    </Container>
  );
}
