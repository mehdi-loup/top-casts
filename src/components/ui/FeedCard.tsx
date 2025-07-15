import {
	Coins as IconCoin,
	ExternalLink as IconExternalLink,
	Heart as IconHeart,
	MessageCircle as IconMessageCircle,
	Repeat as IconRepeat,
	Share as IconShare,
	Video as IconVideoPlay,
} from "lucide-react";
import { Avatar } from "./Avatar";
import { Card, CardContent } from "./Card";
import ImageGallery from "./ImageGallery";
import { UrlEmbed } from "./UrlEmbed";

interface Author {
	pfp_url: string;
	display_name: string;
	username: string;
	fid: number;
}

interface FeedItemMetadata {
	author: Author;
	text: string;
	comments_count?: number;
	shares_count?: number;
	likes_count?: number;
	embed_items?: string[];
}

interface FeedItem {
	item_id: string;
	metadata: FeedItemMetadata;
}

interface FeedCardProps {
	item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
	const {
		author,
		text,
		comments_count,
		shares_count,
		likes_count,
		embed_items,
	} = item.metadata;

	return (
		<Card
			className="border rounded-lg shadow-sm h-full cursor-pointer"
			onClick={() =>
				window.open(`https://warpcast.com/${author.username}/${item.item_id}`)
			}
		>
			<CardContent className="p-6 flex flex-col h-full space-y-4">
				{/* Author Info */}
				<div className="flex items-center gap-3">
					<Avatar
						pfpUrl={author.pfp_url}
						name={author.display_name.charAt(0).toUpperCase()}
					/>

					<p className="font-semibold text-sm line-clamp-1">
						{author.display_name}
					</p>
				</div>

				{/* Content */}
				<p className="text-sm flex-1 leading-6">{text}</p>

				{/* Embeds */}
				{embed_items &&
					embed_items.length > 0 &&
					(() => {
						// Separate images from other embeds
						const images: string[] = [];
						const otherEmbeds: string[] = [];

						for (const embed of embed_items) {
							if (
								/\.(jpeg|jpg|gif|png|webp)$/i.test(embed) ||
								embed.includes("imagedelivery.net") ||
								embed.includes("/ipfs/") // not all ipfs files are images, this is sample app only and these cases should be better supported
							) {
								images.push(embed);
							} else {
								otherEmbeds.push(embed);
							}
						}

						return (
							<div className="space-y-3 pt-2">
								{/* Render image gallery if there are images */}
								{images.length > 0 && <ImageGallery images={images} />}
								{/* Render other embeds */}
								{otherEmbeds.map((embed, index) => {
									// Handle Farcaster stream content
									if (embed.includes("stream.farcaster.xyz")) {
										return (
											<Card
												key={index}
												className="border hover:bg-gray-50 transition-colors"
											>
												<a
													href={embed}
													target="_blank"
													rel="noopener noreferrer"
													className="block"
												>
													<CardContent className="p-3">
														<div className="flex items-center gap-3">
															<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
																<IconVideoPlay
																	size={20}
																	className="text-white"
																/>
															</div>
															<div className="flex-1">
																<p className="text-sm font-medium text-primary">
																	View Media
																</p>
																<p className="text-xs text-muted-foreground">
																	Farcaster video content
																</p>
															</div>
															<IconExternalLink
																size={16}
																className="text-muted-foreground"
															/>
														</div>
													</CardContent>
												</a>
											</Card>
										);
									}

									// Handle all other URLs with OG preview
									return <UrlEmbed key={index} url={embed} />;
								})}
							</div>
						);
					})()}

				{/* Engagement Stats */}
				<div className="flex justify-between items-center mt-auto pt-4">
					<div className="flex items-center gap-1">
						<IconMessageCircle size={14} color="#2563eb" />
						<span className="text-xs text-muted-foreground">
							{comments_count || 0}
						</span>
					</div>

					<div className="flex items-center gap-1">
						<IconRepeat size={14} color="#16a34a" />
						<span className="text-xs text-muted-foreground">
							{shares_count || 0}
						</span>
					</div>

					<div className="flex items-center gap-1">
						<IconHeart size={14} color="#dc2626" />
						<span className="text-xs text-muted-foreground">
							{likes_count || 0}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export type { FeedItem, FeedItemMetadata, Author };
