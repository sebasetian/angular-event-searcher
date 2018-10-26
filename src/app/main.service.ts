import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { events } from './schema/autoCompleteEvents';
import { map, debounceTime } from 'rxjs/operators';
@Injectable({
	providedIn: 'root',
})
@Injectable()
export class MainService {
	urlAutoComplete: string;
	constructor(private http: HttpClient) {
		this.urlAutoComplete ='/auto-complete/';
	}
	searchAutoComplete(word) {
		return this.http.get<events[]>(this.urlAutoComplete + word).pipe(debounceTime(1000),map(events => {
			if (events == null) return;
			let eventNames = events.map(event => event.name);
			return eventNames;
		}));
	}
}
