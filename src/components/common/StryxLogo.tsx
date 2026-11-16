import type { FC, SVGProps } from "react";

export const StryxLogo: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}
		>
			<path
				d="M7 31.5 11 9l9 7 9-7 4 22.5-7-4.5-6 5-6-5-7 4.5Z"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinejoin="round"
			/>
			<path
				d="m13.5 20 4.5 1m8.5-1-4.5 1M20 16v10"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
			<circle cx="15.5" cy="19.5" r="1.3" fill="currentColor" />
			<circle cx="24.5" cy="19.5" r="1.3" fill="currentColor" />
		</svg>
	);
};
