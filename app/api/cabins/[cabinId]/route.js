import { getBookedDatesByCabinId, getCabin } from "@/app/_libs/data-service";

export async function GET(req, { params }) {
  try {
    const { cabinId } = params;
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({
      status: "success",
      data: { cabin, bookedDates },
    });
  } catch (error) {
    return Response.json({
      status: "fail",
      message: "Cabin not found",
    });
  }
}
