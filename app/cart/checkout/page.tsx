"use client"

import {Container} from "@mantine/core";
import CheckoutForm, {CheckoutFormValues} from "@/app/cart/checkout/_comps/CheckoutForm";
import {notifySuccess} from "@/lib/notification";
import {useRouter} from "next/navigation";
import {useCartStore} from "@/store/cartStore";


export default function CheckoutPage() {
  const router = useRouter()
  const {clearCart} = useCartStore();

  const onSubmit = (values: CheckoutFormValues) => {
    notifySuccess('Order placed successfully!');
    clearCart();
    router.push('/cart');
  }

  return (
    <Container>
      <CheckoutForm onSubmit={onSubmit} />
    </Container>
  );
}
