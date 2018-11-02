
export class ArtistInfo {
	name:string;
	external_urls?: spotifyUrl;
	popularity?:number;
	followers?: follower;
	segment?:string;
	imgList?: CustomSearchImg[];
}
export class CustomSearchImg {
	link: string;
}
export class VenueInfo {
	address:string = "";
	city:string = "";
	phone:string = "";
	open:string = "";
	rule:string = "";
	child:string = "";
}
class spotifyUrl {
	spotify: string;
}
class follower {
	href: string;
	total: number;
}
