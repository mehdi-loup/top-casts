"use client";

import { NeynarCastCard } from "@neynar/react";
import { useQuery } from "@tanstack/react-query";
import { FeedCard } from "../FeedCard";

// Response types based on the API documentation
export interface Cast {
	text: string;
	embed_items: [];
	timestamp: number;
	root_parent_hash?: string;
	parent_hash?: string;
	root_parent_url: string;
	likes_count: number;
	comments_count: number;
	shares_count: number;
	author: {
		fid: number;
		user_id: number;
		username: string;
		display_name: string;
		pfp_url: string;
	};
}

export type PopularCastsResponse = {
	item_id: string;
	metadata: Cast;
}[];

interface PopularCastsQueryVariables {
	userId?: string;
	scoring?: string;
	topK?: number;
	impressionCount?: number;
	pageSize?: number;
	pageNumber?: number;
}

// Custom hook — switch between modes by passing either topK or page params
function usePopularCasts({
	scoring = "1day",
	topK,
}: PopularCastsQueryVariables) {
	return useQuery<PopularCastsResponse, Error>({
		queryKey: ["popularCasts", scoring, topK], // Query Key
		queryFn: () => {
			return fetch(`/api/popular-casts?scoring=${scoring}&topK=${topK}`)
				.then((res) => res.json())
				.catch((err) => console.error("Failed to fetch best friends:", err));
		},
		staleTime: 60_000, // 1 minute
	});
}

export function HomeTab() {
	const { data, isLoading, error } = usePopularCasts({
		scoring: "1day",
		topK: 3,
	});

	return (
		<div className="flex items-center justify-center h-full">
			{isLoading ? (
				<div className="text-center w-full max-w-md mx-auto">
					Fetching popular casts...
				</div>
			) : error ? (
				<div className="text-center w-full max-w-md mx-auto">
					Oops: ${error.message}
				</div>
			) : null}

			<div
				className="flex flex-row snap-x snap-mandatory overflow-x-auto"
				style={{ WebkitOverflowScrolling: "touch" }}
			>
				{!isLoading && !error && data
					? data.map((item, index) => (
							<div
								key={item.metadata.timestamp}
								className="shrink-0  max-w-[calc(100vw-24px)] snap-center px-4"
							>
								<div className="flex flex-row justify-center mb-2">
									{index === 0 && "🥇"}
									{index === 1 && "🥈"}
									{index === 2 && "🥉"}
								</div>
								<FeedCard item={item} />
							</div>
						))
					: null}
			</div>
		</div>
	);
}
