import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainService } from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
	title = 'hw8';
	searchEvent: FormControl = new FormControl();
	options = [];
	constructor(private service: MainService) {
	this.searchEvent.valueChanges
		.subscribe(eventstr => {
			if (eventstr == '') {
				return;
			}
			this.service.searchAutoComplete(eventstr).subscribe(events => {
				this.options = events;
			});
		})
	} 
}
