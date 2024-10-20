// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { FeatureContentLibrary } from '@immersion-player/feature-content-library';
import Menu from "./menu/menu";
import {Navbar} from "./navbar/navbar";

export function App() {

  return <div className="grid grid-cols-root h-screen">
    <Menu/>
    <div className="grid grid-rows-content h-screen">
      <Navbar/>
      <FeatureContentLibrary/>
    </div>
  </div>;
}

export default App;
