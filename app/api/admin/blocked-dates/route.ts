import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { date, reason } = body;

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Check if date is already blocked
    const existingBlock = await prisma.blockedDate.findUnique({
      where: { date: new Date(date) },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "Date is already blocked" },
        { status: 400 }
      );
    }

    const blockedDate = await prisma.blockedDate.create({
      data: {
        date: new Date(date),
        reason: reason || null,
      },
    });

    return NextResponse.json(blockedDate);
  } catch (error) {
    console.error("Error blocking date:", error);
    return NextResponse.json(
      { error: "Failed to block date" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(blockedDates);
  } catch (error) {
    console.error("Error fetching blocked dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch blocked dates" },
      { status: 500 }
    );
  }
}
