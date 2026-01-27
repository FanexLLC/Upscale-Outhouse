"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface SettingsFormProps {
  settings: {
    pricing: PricingSettings;
    business: BusinessSettings;
  };
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [pricing, setPricing] = useState<PricingSettings>(settings.pricing);
  const [business, setBusiness] = useState<BusinessSettings>(settings.business);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePricingChange = (field: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDiscountChange = (field: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      multiDayDiscounts: {
        ...prev.multiDayDiscounts,
        [field]: value,
      },
    }));
  };

  const handleBusinessChange = (field: string, value: string) => {
    setBusiness((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pricing, business }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setMessage({ type: "success", text: "Settings saved successfully!" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Pricing Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-6">
          Pricing Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekday Rate ($)
            </label>
            <input
              type="number"
              value={pricing.weekdayPrice}
              onChange={(e) =>
                handlePricingChange("weekdayPrice", Number(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Price per day for Monday through Thursday
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekend Rate ($)
            </label>
            <input
              type="number"
              value={pricing.weekendPrice}
              onChange={(e) =>
                handlePricingChange("weekendPrice", Number(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Price per day for Friday, Saturday, and Sunday
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Amount ($)
            </label>
            <input
              type="number"
              value={pricing.depositAmount}
              onChange={(e) =>
                handlePricingChange("depositAmount", Number(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Required deposit to confirm booking
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Rate ($/mile)
            </label>
            <input
              type="number"
              value={pricing.deliveryRatePerMile}
              onChange={(e) =>
                handlePricingChange(
                  "deliveryRatePerMile",
                  Number(e.target.value)
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Charge per mile beyond free radius
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Free Delivery Radius (miles)
            </label>
            <input
              type="number"
              value={pricing.freeDeliveryRadius}
              onChange={(e) =>
                handlePricingChange(
                  "freeDeliveryRadius",
                  Number(e.target.value)
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              No delivery fee within this radius
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Delivery Radius (miles)
            </label>
            <input
              type="number"
              value={pricing.maxDeliveryRadius}
              onChange={(e) =>
                handlePricingChange("maxDeliveryRadius", Number(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Won&apos;t accept bookings beyond this distance
            </p>
          </div>
        </div>

        {/* Multi-day Discounts */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-charcoal mb-4">
            Multi-Day Discounts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3-4 Day Discount (%)
              </label>
              <input
                type="number"
                value={pricing.multiDayDiscounts.days3to4}
                onChange={(e) =>
                  handleDiscountChange("days3to4", Number(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                5+ Day Discount (%)
              </label>
              <input
                type="number"
                value={pricing.multiDayDiscounts.days5plus}
                onChange={(e) =>
                  handleDiscountChange("days5plus", Number(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-6">
          Business Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={business.businessName}
              onChange={(e) =>
                handleBusinessChange("businessName", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Email
            </label>
            <input
              type="email"
              value={business.businessEmail}
              onChange={(e) =>
                handleBusinessChange("businessEmail", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Phone
            </label>
            <input
              type="tel"
              value={business.businessPhone}
              onChange={(e) =>
                handleBusinessChange("businessPhone", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <input
              type="text"
              value={business.businessAddress}
              onChange={(e) =>
                handleBusinessChange("businessAddress", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-olive transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Change Password */}
      <ChangePasswordForm />
    </div>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChangePassword = async () => {
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return;
    }

    setIsChanging(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to change password");
      }

      setPasswordMessage({
        type: "success",
        text: "Password changed successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to change password",
      });
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-charcoal mb-6">
        Change Password
      </h2>

      {passwordMessage && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            passwordMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {passwordMessage.text}
        </div>
      )}

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            placeholder="Enter new password"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 8 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleChangePassword}
          disabled={isChanging || !currentPassword || !newPassword || !confirmPassword}
          className="px-6 py-2 bg-charcoal text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChanging ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
