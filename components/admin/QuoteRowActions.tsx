"use client";

import { useState } from "react";
import { formatTimeRange } from "@/lib/time";

interface QuoteDetails {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventAddress: string;
  eventCity: string | null;
  eventState: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: string;
  hasWaterHookup: boolean;
  hasPowerAvailable: boolean;
  additionalDetails: string | null;
  numberOfDays: number;
  baseRental: number;
  discountPercent: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  depositAmount: number;
  distanceMiles: number | null;
  status: string;
  convertedToBooking: boolean;
  createdAt: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export default function QuoteRowActions({ quote }: { quote: QuoteDetails }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(quote.customerEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = quote.customerEmail;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        {/* Copy Email */}
        <button
          onClick={copyEmail}
          title="Copy email"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>

        {/* Mailto Link */}
        <a
          href={`mailto:${quote.customerEmail}?subject=Your Upscale Outhouse Quote`}
          title="Send email"
          className="text-gray-400 hover:text-gold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>

        {/* View Details */}
        <button
          onClick={() => setShowModal(true)}
          className="text-gold hover:text-gold-olive font-medium text-sm"
        >
          Details
        </button>
      </div>

      {/* Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-charcoal">Quote Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name</span>
                    <p className="font-medium text-charcoal">{quote.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email</span>
                    <p className="font-medium text-charcoal">{quote.customerEmail}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone</span>
                    <p className="font-medium text-charcoal">{quote.customerPhone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status</span>
                    <p className="font-medium text-charcoal">{quote.status}</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Event Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Dates</span>
                    <p className="font-medium text-charcoal">
                      {new Date(quote.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {quote.startDate !== quote.endDate && (
                        <> to {new Date(quote.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Time</span>
                    <p className="font-medium text-charcoal">{formatTimeRange(quote.startTime, quote.endTime)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Event Type</span>
                    <p className="font-medium text-charcoal">{quote.eventType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Guests</span>
                    <p className="font-medium text-charcoal">{quote.guestCount}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Location</span>
                    <p className="font-medium text-charcoal">
                      {quote.eventAddress}
                      {quote.eventCity && quote.eventState && ` (${quote.eventCity}, ${quote.eventState})`}
                    </p>
                    {quote.distanceMiles && (
                      <p className="text-gray-400 text-xs">{quote.distanceMiles} miles from Fresno</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Site Requirements */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Site Requirements</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Water within 100 ft</span>
                    <p className={`font-medium ${quote.hasWaterHookup ? "text-green-600" : "text-red-600"}`}>
                      {quote.hasWaterHookup ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Power within 100 ft</span>
                    <p className={`font-medium ${quote.hasPowerAvailable ? "text-green-600" : "text-red-600"}`}>
                      {quote.hasPowerAvailable ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pricing</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Rental ({quote.numberOfDays} {quote.numberOfDays === 1 ? "day" : "days"})</span>
                    <span className="font-medium">{formatCurrency(quote.baseRental)}</span>
                  </div>
                  {quote.discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{Math.round(quote.discountPercent * 100)}% multi-day discount</span>
                      <span>-{formatCurrency(quote.discountAmount)}</span>
                    </div>
                  )}
                  {quote.deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">{formatCurrency(quote.deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t font-bold text-charcoal">
                    <span>Total</span>
                    <span>{formatCurrency(quote.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Deposit</span>
                    <span>{formatCurrency(quote.depositAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {quote.additionalDetails && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Additional Details</h3>
                  <p className="text-sm text-charcoal bg-gray-50 rounded-lg p-4">{quote.additionalDetails}</p>
                </div>
              )}

              {/* Meta */}
              <div className="text-xs text-gray-400 pt-2 border-t">
                <p>Quote ID: {quote.id}</p>
                <p>Created: {formatDateTime(quote.createdAt)}</p>
                {quote.convertedToBooking && <p className="text-green-600">Converted to booking</p>}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <a
                href={`mailto:${quote.customerEmail}?subject=Your Upscale Outhouse Quote`}
                className="px-4 py-2 bg-gold text-white rounded-lg font-medium hover:bg-gold/90 transition-colors"
              >
                Email Customer
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
