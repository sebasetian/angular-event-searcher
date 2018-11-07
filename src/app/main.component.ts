import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from './main.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { formField } from './schema/formField';
import { PaneType } from './pane-type.enum';
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'hw8';
	searchEventKeyword: FormControl = new FormControl(); 
	eventForm: FormGroup;
	options = [];
	categories = ['All','Music','Sport','Arts & Theatre','Film','Miscellaneous'];
	form = new formField('', 'All', 'miles', 'Here', '',0,0);
	public submitted: boolean = false;
	
	submitForm() {
		this.clearAll();
		this.service.postForm(this.form);
		this.submitted = true;
	}
	clearAll() {
		this.submitted = false;
		this.service.currPane = PaneType.resPane;
	}
	showRes() {
		this.service.currPane = PaneType.resPane;
	}
	showFav() {
		this.service.currPane = PaneType.favoritePane;
	}
	constructor(public service: MainService) {
		
	}
	ngOnInit(): void {
		this.eventForm = new FormGroup({
			'keyword': new FormControl(this.form.keyword, Validators.required),
			'category': new FormControl(this.form.category),
			'distance': new FormControl(this.form.distance),
			'distanceUnit': new FormControl(this.form.distanceUnit),
			'fromWhere': new FormControl(this.form.fromWhere),
			'location': new FormControl({value: this.form.location, disabled: this.form.fromWhere === 'Here'},Validators.required)
		});
		this.eventForm.get('fromWhere').valueChanges
			.subscribe(() => {
				if (this.form.fromWhere === 'Here') this.eventForm.get('location').disable();
				else this.eventForm.get('location').enable();
			})
		this.eventForm.get('keyword').valueChanges
			.pipe(debounceTime(500), switchMap(eventstr => this.service.searchAutoComplete(eventstr))).
			subscribe(events => {
				if (events != undefined && events[0] != "Undefined") {
					this.options = events;
					return;
				}
				this.options = [];
			});
	}
	get keyword() { return this.eventForm.get('keyword')}; 
	get location() { return this.eventForm.get('location') }; 
}
