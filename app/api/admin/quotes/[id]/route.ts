import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // If quote was converted to a booking, check if the booking was actually paid
    if (quote.convertedToBooking && quote.bookingId) {
      const booking = await prisma.booking.findUnique({
        where: { id: quote.bookingId },
      });

      // Only block deletion if the booking has a paid deposit (real booking)
      if (booking && booking.depositPaid) {
        return NextResponse.json(
          { error: "Cannot delete a quote with a paid booking" },
          { status: 400 }
        );
      }

      // Delete the unpaid/abandoned booking first
      if (booking) {
        await prisma.booking.delete({
          where: { id: booking.id },
        });
      }
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
