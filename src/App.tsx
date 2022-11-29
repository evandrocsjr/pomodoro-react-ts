import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import { defaultThemes } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { CyclesContextProvider } from "./contexts/CyclesContextProvider";

export function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
