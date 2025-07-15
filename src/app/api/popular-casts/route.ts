import { type NextRequest, NextResponse } from "next/server";
import type { Cast, PopularCastsResponse } from "~/components/ui/tabs/HomeTab";

type EmbedResponse = {
	item_id: string;
	metadata: Cast;
}[];

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const scoring = searchParams.get("scoring") || "";
		const top_k = searchParams.get("topK") || 5;

		const { body }: { body: EmbedResponse } = await fetch(
			"https://api.mbd.xyz/v2/farcaster/casts/feed/popular",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${process.env.EMBED_API_KEY}`,
				},
				body: JSON.stringify({
					scoring,
					top_k: Number(top_k),
					return_metadata: true,
				}),
			},
		).then((res) => res.json());

		return NextResponse.json(body);
	} catch (error) {
		console.error("Failed to fetch popular casts:", error);
		return NextResponse.json(
			{
				error:
					"Failed to fetch popular casts. Please check your Embed API key and try again.",
			},
			{ status: 500 },
		);
	}
}
