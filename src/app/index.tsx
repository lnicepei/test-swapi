import NotificationProvider from './providers/NotificationProvider';
import { QueryProvider } from './providers/QueryProvider';
import { RouterProvider } from './providers/RouterProvider';

export function App() {
  return (
    <QueryProvider>
      <NotificationProvider>
        <RouterProvider />
      </NotificationProvider>
    </QueryProvider>
  );
}
