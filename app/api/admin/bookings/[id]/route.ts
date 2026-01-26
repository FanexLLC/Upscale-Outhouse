import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  markEventCompleted,
  markEventCancelled,
  isCalendarConfigured,
} from "@/lib/google-calendar";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Validate that the booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Build update data from allowed fields
    const allowedFields = [
      "status",
      "balancePaid",
      "balancePaidAt",
      "notes",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Update the booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    // Sync with Google Calendar if status changed and calendar is configured
    if (body.status && isCalendarConfigured() && existingBooking.googleEventId) {
      try {
        if (body.status === "COMPLETED") {
          await markEventCompleted(existingBooking.googleEventId);
          console.log(`Marked Google Calendar event as completed for booking ${id}`);
        } else if (body.status === "CANCELLED") {
          await markEventCancelled(existingBooking.googleEventId);
          console.log(`Marked Google Calendar event as cancelled for booking ${id}`);
        }
      } catch (calendarError) {
        // Log but don't fail the request
        console.error("Failed to update Google Calendar event:", calendarError);
      }
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
