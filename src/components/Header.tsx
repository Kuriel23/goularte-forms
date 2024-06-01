"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();
	const links = [
		{ href: "/", title: "Moderação", icon: "mod.svg" },
		{ href: "/art", title: "Artistas", icon: "art.svg" },
		{ href: "/unban", title: "Unban", icon: "unban.svg" },
		{ href: "/dev", title: "Desenvolvedor", icon: "dev.svg" },
	];

	return (
		<nav className="flex gap-5 max-md:gap-1 justify-between max-md:px-0 px-20 rounded-none bg-zinc-800 rounded-b-xl max-md:flex-col">
			{links.map((link) => (
				<Link
					className={`flex w-full items-center justify-center gap-3 max-md:ml-0 max-md:w-full py-5 text-neutral-400 text-2xl font-medium ${
						pathname === link.href
							? "bg-zinc-900 rounded-b-xl max-md:rounded-xl"
							: ""
					}`}
					key={link.href}
					href={link.href}
				>
					<img
						src={`/icons/${link.icon}`}
						alt={link.title}
						className="aspect-square w-8"
					/>
					<p className="my-auto">{link.title}</p>
				</Link>
			))}
		</nav>
	);
}
