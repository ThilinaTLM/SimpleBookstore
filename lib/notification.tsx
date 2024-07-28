import { notifications } from "@mantine/notifications";
import { CheckIcon, XIcon } from "lucide-react";
import React from "react";

/**
 * Displays a success notification with the given message.
 * @param {string} message - The message to display in the notification.
 */
export function notifySuccess(message: string) {
  notifications.show({
    message: message,
    color: 'green',
    withCloseButton: false,
    withBorder: true,
    variant: 'filled',
    icon: <CheckIcon />,
  });
}

/**
 * Displays an error notification with the given message.
 * @param {string} message - The message to display in the notification.
 */
export function notifyError(message: string) {
  notifications.show({
    message: message,
    color: 'red',
    withCloseButton: false,
    withBorder: true,
    variant: 'filled',
    icon: <XIcon />,
  });
}
