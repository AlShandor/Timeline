"use client"

import Link from 'next/link';
import localFont from 'next/font/local'

const myFont = localFont({ src: '../public/fonts/GreatVibes-Regular.ttf' })

const Nav = () => {
	return (
		<nav className="flex items-center justify-center w-full mb-4 py-3 px-4 z-20 relative bg-white border-b-[1px] border-gray-300">
			<header className="z-40 flex px-6 gap-10 w-full flex-row relative flex-nowrap items-center justify-start max-w-[1600px]">
				<Link href="/" className="flex flex-center">
					<p className={`${myFont.className} logo_text`}>Timeline</p>
				</Link>

				<div className="flex gap-1">
					<Link href="/create-element" className="inline-block">
						<p className="nav_btn">Create Element</p>
					</Link>
					<Link href="/edit-element" className="inline-block">
						<p className="nav_btn">Edit Element</p>
					</Link>
					<Link href="/create-elementCollection" className="inline-block">
						<p className="nav_btn">Create Collection</p>
					</Link>
				</div>
			</header>
		</nav>
	);
};

export default Nav;