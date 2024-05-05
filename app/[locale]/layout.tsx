import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Locale, i18n } from "@/i18n.config";
import Nav from "@components/Nav";

export const metadata = {
	title: "Timeline",
	description: "Explore historical events and people with Timeline tool",
};

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

const RootLayout = ({ children, params: { locale } }) => {
	return (
		<ClerkProvider>
			<html lang={locale}>
				<body>
					<div className="background" />
					<Nav />
					<main className="main">{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;
