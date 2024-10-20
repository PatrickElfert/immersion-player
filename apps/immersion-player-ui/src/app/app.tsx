// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { FeatureContentLibrary } from '@immersion-player/feature-content-library';
import Menu from "./menu/menu";
import {Navbar} from "./navbar/navbar";

export function App() {

  return <div className="grid grid-cols-root h-screen bg-plum">
    <Menu/>
    <div className="grid grid-rows-content h-screen">
      <Navbar/>
      <div className="shadow-inner-glow h-full min-h-0">
        <div className="py-6 px-8 h-full">
          <FeatureContentLibrary/>
        </div>
      </div>
    </div>
  </div>;
}

export default App;
