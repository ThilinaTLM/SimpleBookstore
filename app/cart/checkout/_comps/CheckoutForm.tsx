"use client"

import React from 'react';
import {useForm} from '@mantine/form';
import {zodResolver} from 'mantine-form-zod-resolver';
import {z} from 'zod';
import {Box, Button, Group, Select, Text, TextInput, Title} from '@mantine/core';
import {useCartStore} from '@/store/cartStore';
import MultiColumnLayout from "@/components/layout/MultiColumnLayout";
import {useRouter} from "next/navigation";

const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {message: 'Full Name should have at least 2 characters'}),
  email: z
    .string()
    .email({message: 'Invalid email address'}),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,14}$/, {message: 'Invalid phone number'}),
  address: z
    .string()
    .min(5, {message: 'Address should have at least 5 characters'}),
  city: z
    .string()
    .min(2, {message: 'City should have at least 2 characters'}),
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, {message: 'Invalid postal code'}),
  country: z
    .string()
    .min(2, {message: 'Country should have at least 2 characters'}),
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, {message: 'Card number should be 16 digits'}),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {message: 'Invalid expiry date format (MM/YY)'}),
  cardCVC: z
    .string()
    .regex(/^[0-9]{3}$/, {message: 'CVC should be 3 digits'}),
  paymentMethod: z
    .string()
    .min(1, {message: 'Payment method is required'}),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export type CheckoutFormProps = {
  onSubmit?: (values: CheckoutFormValues) => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const {totalPrice} = useCartStore();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      paymentMethod: '',
    },
    validate: zodResolver(checkoutFormSchema),
  });

  const handleSubmit = form.onSubmit((values) => {
    props.onSubmit?.(values);
  });

  return (
    <Box>
      <Text size="xl" fw="bold">Checkout</Text>

      <form onSubmit={handleSubmit}>
        <Box className="tw-mb-6">
          <Text size="lg">Contact Information</Text>
          <MultiColumnLayout>
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              className="tw-mb-3"
              {...form.getInputProps('fullName')}
            />
            <TextInput
              label="Email"
              placeholder="johndoe@example.com"
              className="tw-mb-3"
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Phone"
              placeholder="+1234567890"
              className="tw-mb-3"
              {...form.getInputProps('phone')}
            />
          </MultiColumnLayout>

        </Box>

        <Box className="tw-mb-6">
          <Text size="lg">Shipping Address</Text>
          <MultiColumnLayout>
            <TextInput
              label="Address"
              placeholder="123 Main St"
              className="tw-mb-3"
              {...form.getInputProps('address')}
            />
            <TextInput
              label="City"
              placeholder="New York"
              className="tw-mb-3"
              {...form.getInputProps('city')}
            />
            <TextInput
              label="Postal Code"
              placeholder="10001"
              className="tw-mb-3"
              {...form.getInputProps('postalCode')}
            />
            <TextInput
              label="Country"
              placeholder="United States"
              className="tw-mb-3"
              {...form.getInputProps('country')}
            />
          </MultiColumnLayout>
        </Box>

        <Box className="tw-mb-6">
          <Text size="lg">Payment Details</Text>
          <MultiColumnLayout>
            <Select
              label="Payment Method"
              placeholder="Select payment method"
              data={[
                {value: 'credit', label: 'Credit Card'},
                {value: 'debit', label: 'Debit Card'},
                {value: 'paypal', label: 'PayPal'},
              ]}
              className="tw-mb-3"
              {...form.getInputProps('paymentMethod')}
            />
            <TextInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              className="tw-mb-3"
              {...form.getInputProps('cardNumber')}
            />
            <Group grow>
              <TextInput
                label="Expiry Date"
                placeholder="MM/YY"
                className="tw-mb-3"
                {...form.getInputProps('cardExpiry')}
              />
              <TextInput
                label="CVC"
                placeholder="123"
                className="tw-mb-3"
                {...form.getInputProps('cardCVC')}
              />
            </Group>
          </MultiColumnLayout>
        </Box>

        <Box className="tw-mb-6">
          <Title order={3} className="tw-mb-4">Order Summary</Title>
          <Text>Total: ${totalPrice.toFixed(2)}</Text>
        </Box>

        <div className="tw-flex tw-flex-row tw-justify-end tw-space-x-2">
          <Button type="button" variant="outline" onClick={() => {
            void router.push('/cart');
          }}>
            Cancel
          </Button>
          <Button type="submit">
            Place Order
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CheckoutForm;
