import * as React from "react";

import { cn } from "../../lib/utils";

const Avatar = ({ pfpUrl, name }: { pfpUrl: string; name: string }) => (
	<img
		src={pfpUrl}
		alt="Profile"
		className="w-6 h-6 rounded-full object-cover flex-shrink-0"
		onError={(e) => {
			(e.target as HTMLImageElement).src = "https://farcaster.xyz/avatar.png";
		}}
	/>
);

export { Avatar };
