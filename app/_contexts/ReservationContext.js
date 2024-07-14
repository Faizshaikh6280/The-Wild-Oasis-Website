"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationContextProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => {
    setRange(initialState);
  };
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

const useReservation = function () {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error("Reservation Context is used outside of provider");
  return context;
};

export { ReservationContextProvider, useReservation };
