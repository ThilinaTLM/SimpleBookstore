import React from 'react';
import { useForm, isNotEmpty, isEmail, matches } from '@mantine/form';
import { TextInput, NumberInput, Select, Button, Box, Group, Title, Text } from '@mantine/core';
import { useCartStore } from '@/store/cartStore';
import { notifications } from '@mantine/notifications';

const CheckoutForm: React.FC = () => {
  const { totalPrice, clearCart } = useCartStore();

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
    validate: {
      fullName: isNotEmpty('Full name is required'),
      email: isEmail('Invalid email'),
      phone: matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
      address: isNotEmpty('Address is required'),
      city: isNotEmpty('City is required'),
      postalCode: isNotEmpty('Postal code is required'),
      country: isNotEmpty('Country is required'),
      cardNumber: (value) => (/^\d{16}$/.test(value) ? null : 'Invalid card number'),
      cardExpiry: (value) => (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? null : 'Invalid expiry date (MM/YY)'),
      cardCVC: (value) => (/^\d{3,4}$/.test(value) ? null : 'Invalid CVC'),
      paymentMethod: isNotEmpty('Payment method is required'),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    notifications.show({
      title: 'Order Placed',
      message: 'Your order has been successfully placed!',
      color: 'green',
    });
    clearCart();
    // Here you would typically send the order to your backend
  });

  return (
    <Box className="tw-max-w-3xl tw-mx-auto tw-p-6">
      <Title order={1} className="tw-mb-6">Checkout</Title>
      <form onSubmit={handleSubmit}>
        <Box className="tw-mb-6">
          <Title order={3} className="tw-mb-4">Contact Information</Title>
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
        </Box>

        <Box className="tw-mb-6">
          <Title order={3} className="tw-mb-4">Shipping Address</Title>
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
        </Box>

        <Box className="tw-mb-6">
          <Title order={3} className="tw-mb-4">Payment Details</Title>
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
          <Select
            label="Payment Method"
            placeholder="Select payment method"
            data={[
              { value: 'credit', label: 'Credit Card' },
              { value: 'debit', label: 'Debit Card' },
              { value: 'paypal', label: 'PayPal' },
            ]}
            className="tw-mb-3"
            {...form.getInputProps('paymentMethod')}
          />
        </Box>

        <Box className="tw-mb-6">
          <Title order={3} className="tw-mb-4">Order Summary</Title>
          <Text>Total: ${totalPrice.toFixed(2)}</Text>
        </Box>

        <Button type="submit" fullWidth className="tw-mt-4">
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
