'use client';

import { Alert, AlertTitle } from '@/shared/ui/alert';
import { SnackbarProvider } from 'notistack';
import { forwardRef } from 'react';

const AUTO_HIDE_DURATION = 3000;

const Notification = forwardRef<
  HTMLDivElement,
  {
    id: string;
    message: string;
    variant: 'success' | 'error';
  }
>(({ message, variant }, ref) => {
  return (
    <Alert ref={ref} variant={variant}>
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
});

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      autoHideDuration={AUTO_HIDE_DURATION}
      Components={{
        success: Notification,
        error: Notification,
        info: Notification,
        warning: Notification,
        default: Notification,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
