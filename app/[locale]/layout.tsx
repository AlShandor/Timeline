import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { locales } from "@/localization.config";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Nav from "@components/Nav";

export const metadata = {
	title: "Timeline",
	description: "Explore historical events and people with Timeline tool",
};

export async function generateStaticParams() {
	return locales.map((locale) => ({ lang: locale }));
}

const RootLayout = ({ children, params: { locale } }) => {
    const messages = useMessages();
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
