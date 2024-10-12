// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {Button, FluentProvider, webLightTheme} from '@fluentui/react-components';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div>
        <Button appearance={"primary"}>Get Started</Button>
      </div>
    </FluentProvider>
  );
}

export default App;
