import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutocompEvents, SearchEvents } from './schema/ticketMasterEvents';
import { formField } from './schema/formField';
import { map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, Subject,of} from 'rxjs';
import { ipApiJson, GeoCoding } from './schema/geo';
import { PaneType } from './pane-type.enum'
import { SelectionModel } from '@angular/cdk/collections';
import { ArtistInfo, CustomSearchImg, VenueInfo, UpcomingEvent, SongkickVenueInfo, SongkickEvent } from './schema/ArtistTeamInfo';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service'

@Injectable({
	providedIn: 'root',
})
@Injectable()
export class MainService {
	
	urlAutoComplete: string;
	urlForm: string;
	urlSpotify: string;
	urlGoogleImgSearch: string;
	urlGeoCoding:string;
	urlFindVenueId:string;
	urlFindVenueUpcomingEvnet:string;
	formObserable: Observable<formField>;
	currPane: PaneType;
	favoriteList :SelectionModel<SearchEvents>;
	selection = new SelectionModel<SearchEvents>(false, []);
	artistList = new SelectionModel<ArtistInfo>(true,[]);
	upcomingEvents: UpcomingEvent[];
	sortedData: UpcomingEvent[];
	venue: VenueInfo;
	isResultLoading:boolean = false;
	private eventSource = new Subject<SearchEvents[]>();
	currEvents = this.eventSource.asObservable();
	private SongkickSource = new Subject<UpcomingEvent[]>();
	currSougkickEvent = this.SongkickSource.asObservable();
	constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private localStorage:StorageService) {
		this.urlAutoComplete ='/auto-complete/';
		this.urlForm = '/form/';
		this.currPane = PaneType.resPane;
		this.urlSpotify = '/spotify/';
		this.urlGoogleImgSearch = '/img-search/';
		this.urlGeoCoding = '/geo/';
		this.urlFindVenueId = '/find-venue-id/';
		this.urlFindVenueUpcomingEvnet = '/find-venue-upcoming-event/';
		this.favoriteList = new SelectionModel<SearchEvents>(true, this.localStorage.get('favorate_list') || []);
	}
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		
	}
	initVenue() {
		this.venue = new VenueInfo();
		let event = this.selection.selected[0];
		if (event._embedded.venues !== undefined && event._embedded.venues.length > 0) {
			let currVenue = event._embedded.venues[0];
			this.venue.name = currVenue.name;
			if (currVenue.address !== undefined) this.venue.address = currVenue.address.line1;
			this.venue.city = "";
			if (currVenue.city !== undefined && currVenue.state !== undefined) this.venue.city = currVenue.city.name + ',' + currVenue.state.name;
			else if (currVenue.city !== undefined) this.venue.city = currVenue.city.name;
			else if (currVenue.state !== undefined) this.venue.city = currVenue.state.name;

			if (currVenue.boxOfficeInfo !== undefined) {
				if (currVenue.boxOfficeInfo.phoneNumberDetail !== undefined) this.venue.phone = currVenue.boxOfficeInfo.phoneNumberDetail;
				if (currVenue.boxOfficeInfo.openHoursDetail !== undefined) this.venue.open = currVenue.boxOfficeInfo.openHoursDetail;
			}

			if (currVenue.generalInfo !== undefined) {
				if (currVenue.generalInfo.generalRule !== undefined) this.venue.rule = currVenue.generalInfo.generalRule;
				if (currVenue.generalInfo.childRule !== undefined) this.venue.child = currVenue.generalInfo.childRule;
			}
		}
	}
	findUpcomingEvents(name) {
		this.http.get<SongkickVenueInfo[]>(this.urlFindVenueId + name).pipe(switchMap(venues => {
			if (venues == null) return of([]);
			let id: number = -1;
			for (let i = 0; i < venues.length; i++) {
				if (venues[i].displayName.toLowerCase === name.toLowerCase) {
					id = venues[i].id;
					break;
				}
			}
			return this.http.get<SongkickEvent[]>(this.urlFindVenueUpcomingEvnet + id)
		})).subscribe(events => {
			let ret: UpcomingEvent[] = [];
			if (events != null && events.length > 0) {
				events.forEach(event => {
					let upcomingEvent = new UpcomingEvent();
					upcomingEvent.name = event.displayName;
					upcomingEvent.type = event.type;
					upcomingEvent.artist = event.performance.length > 0? event.performance[0].displayName: "";
					upcomingEvent.date = event.start.date !== undefined ? event.start.date: "";
					upcomingEvent.time = event.start.time !== undefined ? event.start.time: "";
					upcomingEvent.url = event.uri;
					ret.push(upcomingEvent);
				});
			}
			this.SongkickSource.next(ret);
		});
	}
	findGeoLocation(address) {
		return this.http.get<GeoCoding>(this.urlGeoCoding + address);
	}
	findImg(name:string,artist: ArtistInfo) {
		this.http.get<CustomSearchImg[]>(this.urlGoogleImgSearch + name).subscribe((items: CustomSearchImg[]) => {
			artist.imgList = items;
		});
		if (this.artistList.selected.filter(p => p.name == name).length == 0) {
			this.artistList.select(artist);
		}
		
	} 
	findArtist(name:string, segment:string) {
		if (segment === undefined || segment !== 'Music') { 
			let newTeam = new ArtistInfo();
			newTeam.name = name;
			newTeam.segment = 'nonMusic';
			this.findImg(name,newTeam);
		} else {
			this.http.get<ArtistInfo[]>(this.urlSpotify + name).subscribe((list: ArtistInfo[]) => {
				for (let i = 0; i < list.length; i++) {
					if (list[i].name === name) {
						list[i].segment = 'Music';
						this.findImg(name,list[i]);
						return;
					}
				}
				if (list.length > 0) {
					console.log('not found');
					list[0].segment = 'Music';
					this.findImg(name, list[0]);
				}
			});
		}
	}
	changeFavorite(event) {
		let favorites: SearchEvents[] = this.favoriteList.selected;
		if (favorites.length == 0 || favorites.filter(f => f.id == event.id).length == 0) {
			this.favoriteList.select(event);
			this.storeEventInStorage(event);
		} else {
			this.favoriteList.deselect(favorites.filter(f => f.id == event.id)[0]);
			this.deleteEventInStorage(event);
		}
	}
	searchAutoComplete(word) {
		if (word == '') {
			return EMPTY;
		}
		return this.http.get<AutocompEvents[]>(this.urlAutoComplete + word).pipe(map(events => {
			if (events == null) return;
			let eventNames = events.map(event => event.name);
			return eventNames;
		}));
	}
	postForm(form: formField) {
		this.isResultLoading = true;
		if (form.distance == undefined) {
			form.distance = 10;
		}
		if (form.fromWhere == 'Here') {
			this.formObserable = this.http.get<ipApiJson>('http://ip-api.com/json').pipe(switchMap(json => {
				form.lat = json.lat;
				form.lng = json.lon;
				return of(form);
			}));
		} else {
			this.formObserable = this.findGeoLocation(form.location).pipe(switchMap(json => {
				form.lat = json.lat;
				form.lng = json.lng;
				return of(form);
			}));
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		this.formObserable.pipe(switchMap(form => this.http.post(this.urlForm, form, httpOptions)))
			.subscribe((events: SearchEvents[]) => this.eventSource.next(events)); 
	}
	isFavorite(event: SearchEvents):boolean {
		if (event == null) return;
		let currList: SearchEvents[] = this.localStorage.get('favorate_list');
		if (currList !== null) {
			for (let i = 0; i < currList.length; i++) {
				if (currList[i].id == event.id) return true;
			} 
		}
		return false;
	}
	storeEventInStorage(event: SearchEvents) {
		if (event == null) return;
		let currList: SearchEvents[] = this.localStorage.get('favorate_list');
		if (currList == undefined || currList == null) {
			currList = [];
		}
		currList.push(event);
		this.localStorage.set('favorate_list',currList);
	}
	deleteEventInStorage(event: SearchEvents) {
		if (event == null) return;
		let currList: SearchEvents[] = this.localStorage.get('favorate_list');
		if (currList == undefined || currList == null) {
			return;
		}
		this.localStorage.set('favorate_list', currList.filter(val => val.id != event.id));
	}
}
