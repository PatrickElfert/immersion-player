// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { FeatureContentLibrary } from '@immersion-player/feature-content-library';
import Navbar from "./navbar/navbar";
import {makeStyles} from "@fluentui/react-components";

const useStyles = makeStyles({
  layout: {display: 'grid', gridTemplateColumns: '70px 1fr', height: '100vh'},
})

export function App() {
  const classes = useStyles();

  return <div className={classes.layout}>
    <Navbar/>
    <FeatureContentLibrary/>
  </div>;
}

export default App;
