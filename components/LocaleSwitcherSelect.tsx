"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@localized-navigation";

type Props = {
	children: ReactNode;
	currentLocale: string;
	label: string;
};

export default function LocaleSwitcherSelect({ children, currentLocale, label }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value;
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale }
			);
		});
	}

	return (
		<label className="mr-4 relative">
			<span className={`${currentLocale}-flag w-6 h-6 inline-block pointer-events-none absolute top-[7px] left-3`}></span>
			<p className="sr-only">{label}</p>
			<select
				className="language_btn uppercase appearance-none"
				defaultValue={currentLocale}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
		</label>
	);
}
