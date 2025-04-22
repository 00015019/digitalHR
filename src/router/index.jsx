import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Dashboard from "../../pages/dashboard";
import Employees from "../../pages/employees";
import AuthGuard from "./AuthGuard";
import AddEmployee from "../container/Employee/AddEmployee";
import Details from "../container/Employee/Details";
import Attendance from "../../pages/attendance";
import Payments from "../../pages/payments";
import Vacancies from "../../pages/vacancies";
import Applications from "../../pages/applications";
import Request from "../../pages/request";
import EditEmployee from "../container/Employee/EditEmployee";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/application" element={<Applications />} />
          <Route path="/leave-request" element={<Request />} />
          <Route path="/user/user/:id" element={<Details />} />
          <Route path="/user/user/:id/update/" element={<EditEmployee />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
