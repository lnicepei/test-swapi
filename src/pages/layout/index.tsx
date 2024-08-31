import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <div className="flex flex-col gap-2 sm:gap-4">
        <Outlet />
      </div>
    </div>
  );
}
