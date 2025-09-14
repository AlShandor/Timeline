"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

const myFont = localFont({ src: "../public/fonts/GreatVibes-Regular.ttf" });

const Nav = () => {
    const { data: session, status } = useSession();
    const locale = useLocale();
    
    const isAdmin = session?.user?.isAdmin;
    const isAuthenticated = !!session;

	return (
		<nav className="flex items-center justify-center w-full mb-4 py-3 px-4 z-20 relative bg-white border-b-[1px] border-gray-300">
			<header className="z-40 flex px-6 gap-10 w-full flex-row relative flex-nowrap items-center justify-between max-w-[1600px]">
				<Link href="/" locale={locale} className="flex flex-center">
					<p className={`${myFont.className} logo_text`}>Timeline</p>
				</Link>

				{/* Admin-only navigation */}
				{isAdmin && (
					<div className="flex gap-1">
						<Link href="/create-element" locale={locale} className="hidden lg:inline-block">
							<p className="nav_btn">Create Element</p>
						</Link>
						<Link href="/edit-element" locale={locale} className="hidden lg:inline-block">
							<p className="nav_btn">Edit Element</p>
						</Link>
						<Link href="/create-elementCollection" locale={locale} className="hidden lg:inline-block">
							<p className="nav_btn">Create Collection</p>
						</Link>
						<Link href="/edit-elementCollection" locale={locale} className="hidden lg:inline-block">
							<p className="nav_btn">Edit Collection</p>
						</Link>
					</div>
				)}

				<div className="flex flex-row align-middle items-center gap-4">
					<LocaleSwitcher />

					{/* Authentication buttons */}
					{status === "loading" ? (
						<div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
					) : !isAuthenticated ? (
						<button
							onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
						>
							Sign In
						</button>
					) : (
						<div className="flex items-center gap-3">
							{/* User info */}
							<div className="flex items-center gap-2">
								{session.user.image && (
									<img
										src={session.user.image}
										alt={session.user.name || "User"}
										className="w-8 h-8 rounded-full"
									/>
								)}
								<div className="hidden sm:block">
									<p className="text-sm font-medium text-gray-900">
										{session.user.name}
									</p>
									{isAdmin && (
										<p className="text-xs text-blue-600">Admin</p>
									)}
								</div>
							</div>
							
							{/* Sign out button */}
							<button
								onClick={() => signOut({ callbackUrl: `/${locale}` })}
								className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
							>
								Sign Out
							</button>
						</div>
					)}
				</div>
			</header>
		</nav>
	);
};

export default Nav;
