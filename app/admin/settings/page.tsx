import { prisma } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

// Prevent static generation - render on demand only
export const dynamic = "force-dynamic";

interface PricingSettings {
  baseRate: number;
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
    baseRate: 450,
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

  const pricing =
    settings.find((s) => s.key === "pricing")?.value || defaultPricing;
  const business =
    settings.find((s) => s.key === "business")?.value || defaultBusiness;

  return {
    pricing: pricing as PricingSettings,
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
