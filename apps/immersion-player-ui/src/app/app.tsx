// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Menu from './menu/menu';
import { Navbar } from './navbar/navbar';
import {Outlet} from "react-router-dom";
import {Breadcrumb} from "./breadcrumb/breadcrumb";

export function App() {
  return (
    <div className="grid grid-cols-root h-screen bg-surface">
      <Menu />
      <div className="grid grid-rows-content h-screen">
        <Navbar />
        <div className="shadow-inner-glow flex flex-col h-[calc(100% - 80px)] min-h-0">
          <div className="py-6 px-8 flex-1 flex flex-col min-h-0">
            <Breadcrumb/>
            <div className="overflow-auto h-[calc(100% - 40px)]">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
