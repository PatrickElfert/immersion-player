// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Menu from './menu/menu';
import { Navbar } from './navbar/navbar';
import {Outlet} from "react-router-dom";

export function App() {
  return (
    <div className="grid grid-cols-root h-screen bg-surface">
      <Menu />
      <div className="grid grid-rows-content h-screen">
        <Navbar />
        <div className="shadow-inner-glow h-full min-h-0">
          <div className="py-6 px-8 h-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
