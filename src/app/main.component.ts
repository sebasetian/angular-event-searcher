import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from './main.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { formField } from './schema/formField';
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
	title = 'hw8';
	searchEvent: FormControl = new FormControl();
	
	options = [];
	categories = ['All','Music','Sport','Arts & Theatre','Film','Miscellaneous'];
	form = new formField('', 'All', 'Miles', 'Here', '');
	onSubmit() {
		this.service.postForm(this.form);
	}
	constructor(private service: MainService,private formBuilder:FormBuilder) {
		this.searchEvent.valueChanges
		.pipe(debounceTime(500), switchMap(eventstr => this.service.searchAutoComplete(eventstr))).
		subscribe(events => {
			if (events != undefined && events[0] != "Undefined") {
				this.options = events;
				return;
			} 
			this.options = [];
		})
	} 
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}
}
