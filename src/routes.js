import { Dashboard } from "./views/Dashboard";
import SignIn from "./views/signin";
import Registration from "./views/registration";
import ListRooms from "./views/ListRooms";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    name: "Login",
    element: <SignIn />,
  },
  {
    path: "/register",
    name: "Registration",
    element: <Registration />,
  },
  {
    path: "/rooms",
    name: "AllRooms",
    element: <ListRooms />,
  },
];

export default routes;
