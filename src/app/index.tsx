import { QueryProvider } from './providers/QueryProvider';
import { RouterProvider } from './providers/RouterProvider';

export function App() {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
}
