import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutocompEvents, SearchEvents } from './schema/ticketMasterEvents';
import { formField } from './schema/formField';
import { map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, Subject,of} from 'rxjs';
import { ipApiJson, GeoCoding } from './schema/geo';
import { PaneType } from './pane-type.enum'
import { SelectionModel } from '@angular/cdk/collections';
import { ArtistInfo, CustomSearchImg } from './schema/ArtistTeamInfo';
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
	formObserable: Observable<formField>;
	currPane: PaneType;
	favoriteList = new SelectionModel<SearchEvents>(true, []);
	selection = new SelectionModel<SearchEvents>(false, []);
	artistList = new SelectionModel<ArtistInfo>(true,[]);
	
	private eventSource = new Subject<SearchEvents[]>();
	currEvents = this.eventSource.asObservable();
	constructor(private http: HttpClient) {
		this.urlAutoComplete ='/auto-complete/';
		this.urlForm = '/form/';
		this.currPane = PaneType.resPane;
		this.urlSpotify = '/spotify/';
		this.urlGoogleImgSearch = '/img-search/';
		this.urlGeoCoding = '/geo/';
	}
	findGeoLocation(address) {
		return this.http.get<GeoCoding>(this.urlGeoCoding + address);
	}
	findImg(name:string,artist: ArtistInfo) {
		this.http.get<CustomSearchImg[]>(this.urlGoogleImgSearch + name).subscribe((items: CustomSearchImg[]) => {
			artist.imgList = items;
		});
		this.artistList.select(artist);
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
					list[0].segment = 'Music';
					this.findImg(name, list[0]);
				}
			});
		}
	}
	changeFavorite(event) {
		if (this.favoriteList.isSelected(event)) {
			this.favoriteList.deselect(event);
		} else {
			this.favoriteList.select(event);
		}
	}
	searchAutoComplete(word) {
		if (word == '') {
			return EMPTY;
		}
		return this.http.get<AutocompEvents[]>(this.urlAutoComplete + word).pipe(map(events => {
			if (events == null) return ;
			let eventNames = events.map(event => event.name);
			return eventNames;
		}));
	}
	postForm(form: formField) {
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
			this.formObserable = of(form);
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		this.formObserable.pipe(switchMap(form => this.http.post(this.urlForm, form, httpOptions)))
			.subscribe((events: SearchEvents[]) => this.eventSource.next(events)); 
	}

}
