import { prisma } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

// Prevent static generation - render on demand only
export const dynamic = "force-dynamic";

interface PricingSettings {
  weekdayPrice: number;
  weekendPrice: number;
  deliveryRatePerMile: number;
  freeDeliveryRadius: number;
  maxDeliveryRadius: number;
  depositAmount: number;
  multiDayDiscounts: {
    days3to4: number;
    days5plus: number;
  };
}

interface BusinessSettings {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
}

async function getSettings() {
  const settings = await prisma.setting.findMany();

  const defaultPricing: PricingSettings = {
    weekdayPrice: 450,
    weekendPrice: 450,
    deliveryRatePerMile: 2,
    freeDeliveryRadius: 50,
    maxDeliveryRadius: 150,
    depositAmount: 100,
    multiDayDiscounts: {
      days3to4: 10,
      days5plus: 15,
    },
  };

  const defaultBusiness: BusinessSettings = {
    businessName: "Upscale Outhouse",
    businessEmail: process.env.BUSINESS_EMAIL || "",
    businessPhone: "",
    businessAddress: "Fresno, CA 93704",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawPricing = settings.find((s) => s.key === "pricing")?.value as any;
  const business =
    settings.find((s) => s.key === "business")?.value || defaultBusiness;

  // Handle backward compatibility: migrate old baseRate to weekday/weekend prices
  let pricing: PricingSettings;
  if (rawPricing) {
    pricing = {
      ...defaultPricing,
      ...rawPricing,
      weekdayPrice: rawPricing.weekdayPrice ?? rawPricing.baseRate ?? 450,
      weekendPrice: rawPricing.weekendPrice ?? rawPricing.baseRate ?? 450,
    };
  } else {
    pricing = defaultPricing;
  }

  return {
    pricing,
    business: business as BusinessSettings,
  };
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-3xl font-bold text-charcoal mb-8">Settings</h1>

      <div className="space-y-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
