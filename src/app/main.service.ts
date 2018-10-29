import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { autocompEvents, SearchEvents } from './schema/ticketMasterEvents';
import { formField } from './schema/formField';
import { map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, BehaviorSubject, Subject,of} from 'rxjs';
import { ipApiJson } from './schema/ip-api';
@Injectable({
	providedIn: 'root',
})
@Injectable()
export class MainService {
	urlAutoComplete: string;
	urlForm: string;
	formObserable: Observable<formField>;
	currPane: PaneType;
	private eventSource = new Subject<SearchEvents[]>();
	currEvents = this.eventSource.asObservable();
	constructor(private http: HttpClient) {
		this.urlAutoComplete ='/auto-complete/';
		this.urlForm = '/form/';
		this.currPane ='resPane';
	}
	searchAutoComplete(word) {
		if (word == '') {
			return EMPTY;
		}
		return this.http.get<autocompEvents[]>(this.urlAutoComplete + word).pipe(map(events => {
			if (events == null) return;
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
type PaneType = 'resPane' | 'favoritePane' | 'detailPane';
