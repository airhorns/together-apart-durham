import React from "react";
import "instantsearch.css/themes/reset.css";
import "./App.css";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { theme } from "./theme";
import { FullSearch } from "./components/FullSearch";

const engine = new Styletron();

const App = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme}>
      <FullSearch />
    </BaseProvider>
  </StyletronProvider>
);

export default App;
