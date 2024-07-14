import React from "react";
import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-6 h-full">
      <SideNavigation />
      <main>{children}</main>
    </div>
  );
}

export default layout;
