import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainService } from './main.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { formField } from './schema/formField';
import { ResultComponent } from './result/result.component';
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
	title = 'hw8';
	searchEventKeyword: FormControl = new FormControl();
	
	options = [];
	categories = ['All','Music','Sport','Arts & Theatre','Film','Miscellaneous'];
	form = new formField('', 'All', 'miles', 'Here', '',0,0);
	public submitted: boolean = false;
	submitForm() {
		this.service.postForm(this.form);
		this.submitted = true;
	}
	clearAll() {
		this.submitted = false;
		this.service.currPane = 'resPane';
	}
	showRes() {
		this.service.currPane = 'resPane';
	}
	showFav() {
		this.service.currPane = 'favoritePane';
	}
	constructor(private service: MainService) {
		this.searchEventKeyword.valueChanges
		.pipe(debounceTime(500), switchMap(eventstr => this.service.searchAutoComplete(eventstr))).
		subscribe(events => {
			if (events != undefined && events[0] != "Undefined") {
				this.options = events;
				return;
			} 
			this.options = [];
		});
	} 
}

type PaneType = 'resPane' | 'favoritePane' | 'detailPane';
