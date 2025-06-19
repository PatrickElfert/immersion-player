// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Menu from './menu/menu.js';
import { Navbar } from './navbar/navbar.js';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '@heroui/react';

export function App() {
  return (
    <div className=" dark h-screen text-foreground bg-background flex flex-col">
      <ToastProvider toastProps={{ timeout: 2000 }} placement={'top-center'} />
      <Navbar />
      <div className="flex-1 flex flex-row min-h-0">
        <div className="flex relative">
          <Menu />
        </div>
        <div className="flex flex-col min-h-0 items-center w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
