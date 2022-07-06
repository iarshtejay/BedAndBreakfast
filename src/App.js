import { Home } from "./layouts/Home";
import amber from "@mui/material/colors/blue";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import routes from "./routes";

function App() {

  const mdTheme = createTheme({});

  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}>
            {routes.map(props => (
              <Route key={props.name} path={props.path} element={props.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
