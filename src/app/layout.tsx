import type { Metadata } from "next";

import "~/app/globals.css";
import "@neynar/react/dist/style.css";
import { Providers } from "~/app/providers";
import { APP_DESCRIPTION, APP_NAME } from "~/lib/constants";

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
