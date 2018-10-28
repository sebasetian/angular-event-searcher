import { Component, OnInit } from '@angular/core';
import { SearchEvents } from '../schema/ticketMasterEvents';
import { MainService } from '../main.service';
import { MainComponent } from '../main.component'
@Component({
  selector: 'result-field',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	searchEvents: SearchEvents[];
	constructor(private service: MainService) { }
	column: string[] = ['#','Date','Event','Category','Venue Info','Favorite'];
	ngOnInit() {
		this.service.currEvents.subscribe(events => {
			if (events != null && events[0].name != undefined) {
				this.searchEvents = events;	
			}
		});
	}

}
