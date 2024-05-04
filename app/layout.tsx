import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from '@components/Nav';

export const metadata = {
    title: "Timeline",
    description: "Explore historical events and people with Timeline tool",
};

const RootLayout = ({ children }) => {
    return (
		<ClerkProvider>
			<html lang="en">
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
