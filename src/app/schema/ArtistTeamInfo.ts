
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
	name:string = "";
	address:string = "";
	city:string = "";
	phone:string = "";
	open:string = "";
	rule:string = "";
	child:string = "";
}
export class UpcomingEvent {
	name:string = "";
	artist:string = "";
	date:string = "";
	time:string = "";
	type:string = "";
	url:string = "";
}
export class SongkickVenueInfo {
	displayName:string;
	id:number;
}
export class SongkickEvent {
	displayName: string;
	uri:string;
	start: SongkickDate;
	type:string;
	performance: SongkickArtist[];
}
class SongkickDate {
	date:string;
	time:string;
}
class SongkickArtist {
	displayName:string;
}
class spotifyUrl {
	spotify: string;
}
class follower {
	href: string;
	total: number;
}
