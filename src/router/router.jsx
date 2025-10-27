import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Coverage from "../pages/coverage/Coverage";
import AddParcel from "../pages/parcel/AddParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/MyParcels";
import Payment from "../pages/dashboard/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import TrackParcel from "../pages/dashboard/TrackParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/add-parcel",
        element: (
          <PrivateRoute>
            <AddParcel />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [{
      path: 'myParcels',
      Component: MyParcels
    },
  {
    path: "payment/:parcelId",
    Component: Payment
  }, {
    path: 'paymentHistory',
    Component: PaymentHistory
  }, {
    path: 'trackParcel',
    Component: TrackParcel
  }]
  },
]);
