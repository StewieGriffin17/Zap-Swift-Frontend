import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      DashboardLayout
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard/myParcels'>My Parcels</Link></li>
        <li><Link to='/dashboard/paymentHistory'>Payment History</Link></li>
        <li><Link to='/dashboard/trackParcel'>Track A Parcel</Link></li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
