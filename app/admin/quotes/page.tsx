import { prisma } from "@/lib/db";
import QuotesFilter from "@/components/admin/QuotesFilter";
import QuoteRowActions from "@/components/admin/QuoteRowActions";

export const dynamic = "force-dynamic";

interface SearchParams {
  status?: string;
  search?: string;
}

async function getQuotes(searchParams: SearchParams) {
  const { status, search } = searchParams;

  const where: Record<string, unknown> = {};

  if (status && status !== "all") {
    where.status = status.toUpperCase();
  }

  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: "insensitive" } },
      { customerEmail: { contains: search, mode: "insensitive" } },
      { customerPhone: { contains: search } },
    ];
  }

  const quotes = await prisma.quote.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return quotes;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Created";
    case "CONVERTED":
      return "Converted";
    case "PAID":
      return "Paid";
    case "ABANDONED":
      return "Abandoned";
    case "EXPIRED":
      return "Expired";
    default:
      return status;
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-blue-100 text-blue-800";
    case "CONVERTED":
      return "bg-yellow-100 text-yellow-800";
    case "ABANDONED":
      return "bg-red-100 text-red-800";
    case "EXPIRED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const quotes = await getQuotes(params);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Quotes</h1>
        <div className="text-sm text-gray-500">
          {quotes.length} quote{quotes.length !== 1 ? "s" : ""}
        </div>
      </div>

      <QuotesFilter currentStatus={params.status} currentSearch={params.search} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500">No quotes found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Water
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-charcoal">
                          {quote.customerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {quote.customerEmail}
                        </div>
                        <div className="text-xs text-gray-400">
                          {quote.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-charcoal">
                        {formatDate(quote.startDate)}
                      </div>
                      {quote.numberOfDays > 1 && (
                        <div className="text-xs text-gray-500">
                          {quote.numberOfDays} days
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-charcoal">
                        {quote.startTime} - {quote.endTime}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-charcoal max-w-[200px] truncate" title={quote.eventAddress}>
                        {quote.eventCity && quote.eventState
                          ? `${quote.eventCity}, ${quote.eventState}`
                          : quote.eventAddress}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-sm ${quote.hasWaterHookup ? "text-green-600" : "text-red-500"}`}>
                        {quote.hasWaterHookup ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-sm ${quote.hasPowerAvailable ? "text-green-600" : "text-red-500"}`}>
                        {quote.hasPowerAvailable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-charcoal">
                        {formatCurrency(quote.totalAmount)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          quote.status
                        )}`}
                      >
                        {getStatusLabel(quote.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(quote.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <QuoteRowActions
                        quote={{
                          id: quote.id,
                          customerName: quote.customerName,
                          customerEmail: quote.customerEmail,
                          customerPhone: quote.customerPhone,
                          eventAddress: quote.eventAddress,
                          eventCity: quote.eventCity,
                          eventState: quote.eventState,
                          startDate: quote.startDate.toISOString(),
                          endDate: quote.endDate.toISOString(),
                          startTime: quote.startTime,
                          endTime: quote.endTime,
                          eventType: quote.eventType,
                          guestCount: quote.guestCount,
                          hasWaterHookup: quote.hasWaterHookup,
                          hasPowerAvailable: quote.hasPowerAvailable,
                          additionalDetails: quote.additionalDetails,
                          numberOfDays: quote.numberOfDays,
                          baseRental: quote.baseRental,
                          discountPercent: quote.discountPercent,
                          discountAmount: quote.discountAmount,
                          deliveryFee: quote.deliveryFee,
                          totalAmount: quote.totalAmount,
                          depositAmount: quote.depositAmount,
                          distanceMiles: quote.distanceMiles,
                          status: quote.status,
                          convertedToBooking: quote.convertedToBooking,
                          createdAt: quote.createdAt.toISOString(),
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
