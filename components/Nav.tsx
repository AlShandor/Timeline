import Link from "next/link";
import localFont from "next/font/local";
import { Protect, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { OrganizationSwitcher } from "@clerk/nextjs";

const myFont = localFont({ src: "../public/fonts/GreatVibes-Regular.ttf" });

const Nav = () => {
    const locale = useLocale();
	return (
		<nav className="flex items-center justify-center w-full mb-4 py-3 px-4 z-20 relative bg-white border-b-[1px] border-gray-300">
			<header className="z-40 flex px-6 gap-10 w-full flex-row relative flex-nowrap items-center justify-between max-w-[1600px]">
				<Link href="/" locale={locale} className="flex flex-center">
					<p className={`${myFont.className} logo_text`}>Timeline</p>
				</Link>

				<Protect role="org:admin">
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
				</Protect>

				<div className="flex flex-row align-middle">
					<LocaleSwitcher />

                    <div className="mr-4">
                        <OrganizationSwitcher />
                    </div>

					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</header>
		</nav>
	);
};

export default Nav;
