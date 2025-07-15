import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import { Card, CardContent } from "./Card";

interface UrlEmbedProps {
	url: string;
}

export function UrlEmbed({ url }: UrlEmbedProps) {
	return (
		<Card className="borde">
			<a href={url} target="_blank" rel="noopener noreferrer" className="block">
				<CardContent className="p-3">
					<div className="flex items-center gap-3">
						<div className="flex-shrink-0">
							<div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
								<LinkIcon size={20} className="text-muted-foreground" />
							</div>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-1 text-primary">
								<p className="text-sm font-medium  hover:underline truncate">
									{url}
								</p>
								<ExternalLinkIcon
									size={12}
									className="text-muted-foreground flex-shrink-0"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</a>
		</Card>
	);
}
