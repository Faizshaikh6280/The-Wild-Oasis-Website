import React from "react";
import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-1">
      <Spinner />
      <p>Loaidng cabin data...</p>
    </div>
  );
}

export default loading;
