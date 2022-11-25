import { Button } from "./components/Button";
import { ThemeProvider } from "styled-components";
import { defaultThemes } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="warning" />

      <GlobalStyle />
    </ThemeProvider>
  );
}
