import { Self } from "@angular/core";

export class events {
	name: string;
	type: string;
	url: string;
	locale: string;
	images: images[];
	classifications: classifications[];
	upcomingEvents: upcomingEvents;
	_links: links;
}
class images {
	ratio: string;
	url: string;
	width: number;
	height: number;
	fallback: boolean;
}
class classifications {
	primary: boolean;
	segment: classificationType;
	genre: classificationType;
	subGenre: classificationType;
	type: classificationType;
	subType: classificationType;
	family: boolean;
}
class upcomingEvents {
	_total: number;
	tmr: number;
	ticketmaster:number;
}

class links {
	self:self;
}
class classificationType {
	id: string;
	name: string;
}
class self {
	herf: string;
}