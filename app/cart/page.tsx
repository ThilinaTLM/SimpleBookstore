"use client"

import {Button, Container, Text} from "@mantine/core";
import {useCartStore} from "@/store/cartStore";
import CartItemCard from "@/components/cards/CartItemCard";
import {formatPrice} from "@/lib/format";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React from "react";
import {BookCheck, ShoppingBag} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {items, totalPrice} = useCartStore();

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
          </div>
          <div className="tw-flex tw-flex-row tw-justify-end tw-space-x-2">
            <Button type="button" variant="outline" onClick={() => {
              void router.push('/');
            }}>
              Cancel
            </Button>
            <Button
              leftSection={<ShoppingBag className="tw-w-4 tw-h-4" />}
              onClick={() => {
              void router.push("/cart/checkout")
            }}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2 tw-min-h-[500px]">
          <Text>Your cart is empty.</Text>
          <Button component={Link} href={"/"} leftSection={<BookCheck className="tw-w-4 tw-h-4" />}>
            Go back to shop
          </Button>
        </div>
      )}
    </Container>
  );
}
