import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { events } from './schema/autoCompleteEvents';
import { formField } from './schema/formField';
import { map } from 'rxjs/operators';
import { Observable, EMPTY} from 'rxjs';
@Injectable({
	providedIn: 'root',
})
@Injectable()
export class MainService {
	urlAutoComplete: string;
	urlForm: string;
	constructor(private http: HttpClient) {
		this.urlAutoComplete ='/auto-complete/';
		this.urlForm = '/form/';
	}
	searchAutoComplete(word) {
		if (word == '') {
			return EMPTY;
		}
		return this.http.get<events[]>(this.urlAutoComplete + word).pipe(map(events => {
			if (events == null) return;
			let eventNames = events.map(event => event.name);
			return eventNames;
		}));
	}
	postForm(form: formField) {
		if (form.distance == undefined) {
			form.distance = 10;
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'my-auth-token'
			})
		};
		return this.http.post<formField>(this.urlForm, form, httpOptions).subscribe();
	}
}
