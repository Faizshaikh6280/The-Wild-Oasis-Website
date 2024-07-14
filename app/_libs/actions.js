"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { validateAlphanumeric } from "./utils";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { addDays } from "date-fns";

export const signInAction = async () => {
  await signIn("google", {
    redirectTo: "/account",
  });
};
export const SignOutAction = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const createBooking = async (bookingData, formData) => {
  bookingData.startDate = addDays(bookingData.startDate, 1);
  bookingData.endDate = addDays(bookingData.endDate, 1);
  const session = await auth();
  if (!session) throw new Error("You don't have permission for this action");

  const updateData = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    guestId: session.user.guestId,
    status: "unconfirmed",
  };

  const { data, error } = await supabase.from("bookings").insert([updateData]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thanksyou");
};

export const updateProfile = async (formdata) => {
  const session = await auth();
  if (!session) throw new Error("You don't have permission for this action");

  const [nationality, countryFlag] = formdata.get("nationality").split("%");
  const nationalID = formdata.get("nationalID");

  if (!validateAlphanumeric(nationalID)) {
    throw new Error("Invalid National Id");
  }

  const newData = { nationalID, countryFlag, nationality };

  const { data, error } = await supabase
    .from("guests")
    .update(newData)
    .eq("id", session.user.guestId);

  // revalidate the data so that nextjs can send the new html with fresh data and update the UI.
  revalidatePath("/account/profile");
};

export async function deleteReservation(bookingId) {
  // check if this booking is actually a booking of current logedIn user.
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("You don't have permission to delete others booking.");
  }

  await new Promise((res) => setTimeout(res, 1000));

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formdata) {
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  const bookingId = formdata.get("bookingId");

  if (!guestBookingsId.includes(Number(bookingId))) {
    throw new Error("You don't have permission to update others booking.");
  }

  const updateData = {
    numGuests: formdata.get("numGuests"),
    observations: formdata.get("observations").slice(0, 1000),
  };
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
