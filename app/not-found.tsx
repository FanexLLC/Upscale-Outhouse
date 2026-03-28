import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-lg">
        <p className="font-display text-hero gold-gradient-text leading-none">
          404
        </p>
        <SectionDivider variant="flourish" />
        <h1 className="font-display text-h2 text-white">{t("title")}</h1>
        <p className="text-text-secondary text-body">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="primary" href="/">
            {t("backHome")}
          </Button>
          <Button variant="secondary" href="/quote">
            {t("getQuote")}
          </Button>
        </div>
      </div>
    </main>
  );
}