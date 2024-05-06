import { useLocale, useTranslations } from "next-intl";
import { locales } from "@localization.config";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
	const t = useTranslations("localeSwitcher");
	const locale = useLocale();

	return (
		<LocaleSwitcherSelect currentLocale={locale} label={t("label")}>
			{locales.map((cur) => (
				<option key={cur} value={cur}>
					{t("locale", { locale: cur })}
				</option>
			))}
		</LocaleSwitcherSelect>
	);
}
