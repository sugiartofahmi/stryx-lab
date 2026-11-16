import { Menu, Search, X } from "lucide-react";
import { type FC, type ReactElement, useState } from "react";
import { StryxLogo } from "./StryxLogo";

export const Navbar: FC = (): ReactElement => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const handleNavClick = (targetHash: string): void => {
		setMobileMenuOpen(false);
		window.location.hash = targetHash;
	};

	return (
		<header
			className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-[1240px] px-3 sm:px-6 transition-all duration-300 ease-out opacity-100 translate-y-0"
		>
			<div className="flex items-center justify-between rounded-full border border-white/15 navbar-pill-scrolled px-3 py-2 sm:px-5 sm:py-2.5 transition-all duration-300 pointer-events-auto">
				<a
					href="/"
					aria-label="STRYX LAB home"
					className="flex shrink-0 items-center gap-2.5 pl-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full"
				>
					<StryxLogo className="size-6 text-white sm:size-7" />
					<span className="font-sans text-[13px] font-bold tracking-[0.16em] text-white">
						STRYX LAB
					</span>
				</a>

				<nav aria-label="Main navigation" className="hidden items-center gap-1 lg:gap-2 md:flex">
					<a
						href="#engine"
						className="rounded-full px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						Engines
					</a>
				</nav>

				<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
					<button
						type="button"
						aria-label="Search documentation"
						className="flex size-8 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						<Search aria-hidden="true" className="size-4" />
					</button>

					<a
						href="/login"
						className="hidden sm:inline-flex rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						Sign In
					</a>

					<a
						href="#engine"
						className="inline-flex items-center rounded-full bg-white px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-black shadow-sm transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						Launch App
					</a>

					<button
						type="button"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
						className="flex size-8 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						{mobileMenuOpen ? (
							<X aria-hidden="true" className="size-4" />
						) : (
							<Menu aria-hidden="true" className="size-4" />
						)}
					</button>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="mt-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0e0c15]/92 backdrop-blur-md p-4 shadow-2xl shadow-black/90 md:hidden pointer-events-auto">
					<button
						type="button"
						onClick={() => handleNavClick("#engine")}
						className="rounded-lg px-3 py-2 text-left font-mono text-xs uppercase tracking-wider text-zinc-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
					>
						Engines
					</button>
					<div className="mt-2 border-t border-white/10 pt-3">
						<a
							href="/login"
							className="block rounded-lg px-3 py-2 text-center font-mono text-xs uppercase tracking-wider text-zinc-300 hover:bg-white/5"
						>
							Sign In
						</a>
					</div>
				</div>
			)}
		</header>
	);
};
