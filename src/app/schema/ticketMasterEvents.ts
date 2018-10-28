import { Self } from "@angular/core";

export class SearchEvents {
	name: string;
	type: string;
	id: string;
	test: boolean;
	url: string;
	locale: string;
	images: images[];
	sales: sales;
	dates: dates;
	classifications: classification[];
	promoter: promoter;
	promoters: promoter[];
	priceRanges: priceRange[];
	seatMap: seatMap;
	_links: links;
	_embedded: embeddedVenues;
}
export class autocompEvents {
	name: string;
	type: string;
	url: string;
	locale: string;
	images: images[];
	classifications: classification[];
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
class classification {
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
	self:href;
	attractionsUrl: href[];
	venuesUrl:href;
}
class classificationType {
	id: string;
	name: string;
}
class href {
	herf: string;	
}
class sales {
	public:publicDate;
}
class publicDate {
	startDateTime:string;
	startTBD:boolean;
	endDateTaime:string;
}
class dates {
	start: startDate;
	timezone: string;
	status: status;
	spanMultipleDays: boolean;
}
class startDate {
	localDate: string;
	localTime: string;
	dateTime: string;
	dateTBD: boolean;
	dateTBA: boolean;
	timeTBA: boolean;
	noSpecificTime: boolean;
}
class status {
	code: string;
}
class promoter {
	id: string;
	name: string;
	description: string;
}
class priceRange {
	type: string;
	currency: string;
	min: number;
	max: number;
}
class seatMap {
	staticUrl: string;
}
class embeddedVenues {
	venues: venues[];
	attractions: attractions[];
}
class venues extends SearchEvents {
	postalCode: string;
	timezone: string;
	city: city;
	state: state;
	country: country;
	address: address;
	location: location;
	markets: market[];
}
class attractions extends SearchEvents {
	aliases: string[];
}
class city {
	name:string;
}
class state extends city {
	stateCode: string;
}
class country extends city {
	countryCode: string;
}
class address {
	line1: string;
	line2: string;
}
class location {
	longitude: string;
	latitude: string;
}
class market {
	id: string;
}