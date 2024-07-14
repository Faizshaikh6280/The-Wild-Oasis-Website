"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";
import { createBooking } from "../_libs/actions";
import SubmitButton from "./SubmitButton";
import { toZonedTime } from "date-fns-tz";

function ReservationForm({ cabin, user }) {
  // Get the user's time zone using Intl.DateTimeFormat
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // CHANGE
  const { maxCapacity } = cabin;
  const { range, resetRange } = useReservation();
  const { regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = Math.abs(differenceInDays(startDate, endDate));
  const cabinPrice = (regularPrice - discount) * numNights;

  const bookingData = {
    numNights,
    cabinPrice,
    cabinId: id,
    totalPrice: cabinPrice,
    isPaid: false,
    hasBreakfast: false,
  };
  if (startDate) bookingData.startDate = toZonedTime(startDate, userTimeZone);
  if (endDate) bookingData.endDate = toZonedTime(endDate, userTimeZone);

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      {/* {dateRange.from && dateRange.to && (
        <p>
          {dateRange.from.toString()} to {dateRange.to.toString()}
        </p>
      )} */}
      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="" selected>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {(!startDate || !endDate) && (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}

          {startDate && endDate && (
            <SubmitButton pendingLabel={"Reserving..."}>Reserve</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
