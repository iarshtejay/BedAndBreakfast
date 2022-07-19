// import "bootstrap/dist/css/bootstrap.min.css";
// import "../src/pages/Login.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import routes from "./routes";
import { Dashboard } from "./views/Dashboard";
import SignIn from "./views/signin";
import LandingPage from "./views/LandingPage";
import Registration from "./views/registration";
import ForgotPassword from "./pages/ForgotPassword";
import VisualizationCharts from "./pages/VisualizationCharts";
import Register from "./pages/Register";

function App() {
  const mdTheme = createTheme({});

  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SignIn />}></Route> */}
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            {routes.map((props) => (
              <Route path={props.path} element={props.element} />
            ))}
          </Route>
          <Route path="/visualization" element={<VisualizationCharts />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
