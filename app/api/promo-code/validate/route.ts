import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST - Validate a promo code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, message: "Promo code is required" },
        { status: 400 }
      );
    }

    // Look up promo code (case-insensitive)
    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promoCode) {
      return NextResponse.json(
        { valid: false, message: "Invalid promo code" },
        { status: 200 }
      );
    }

    // Check if active
    if (!promoCode.isActive) {
      return NextResponse.json(
        { valid: false, message: "This promo code is no longer active" },
        { status: 200 }
      );
    }

    // Check if expired
    if (promoCode.expiresAt && new Date(promoCode.expiresAt) < new Date()) {
      return NextResponse.json(
        { valid: false, message: "This promo code has expired" },
        { status: 200 }
      );
    }

    // Check if max uses reached
    if (promoCode.maxUses && promoCode.currentUses >= promoCode.maxUses) {
      return NextResponse.json(
        { valid: false, message: "This promo code has reached its maximum uses" },
        { status: 200 }
      );
    }

    // Promo code is valid
    return NextResponse.json({
      valid: true,
      discountType: promoCode.discountType,
      discountPercent: promoCode.discountPercent,
      message:
        promoCode.discountType === "FULL_BYPASS"
          ? "Promo code applied! Payment will be bypassed."
          : promoCode.discountType === "FULL_DISCOUNT"
            ? "Promo code applied! Booking is free (total + deposit waived)."
            : `Promo code applied! ${(promoCode.discountPercent || 0) * 100}% off the total`,
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    return NextResponse.json(
      { valid: false, message: "An error occurred while validating the promo code" },
      { status: 500 }
    );
  }
}
