import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { locales } from "@/localization.config";
import { NextIntlClientProvider } from "next-intl";
import Nav from "@components/Nav";
import { unstable_setRequestLocale, getMessages } from "next-intl/server";

export const metadata = {
	title: "Timeline",
	description: "Explore historical events and people with Timeline tool",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

const RootLayout = async ({ children, params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
	return (
		<ClerkProvider>
			<html lang={locale}>
				<body>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<div className="background" />
						<Nav />
						<main className="main">{children}</main>
					</NextIntlClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;
