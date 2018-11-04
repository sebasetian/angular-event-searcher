import { Component, OnInit } from '@angular/core';
import { SearchEvents } from '../schema/ticketMasterEvents';
import { MainService } from '../main.service';
import { MatTableDataSource } from '@angular/material';
import { PaneType } from '../pane-type.enum'
@Component({
	selector: 'result-field',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss'],
	
})
export class ResultComponent implements OnInit {
	searchEvents: SearchEvents[];
	constructor(public service: MainService) {
		this.service.currPane = PaneType.resPane;
	}
	column: string[] = ['#','Date','Event','Category','Venue Info','Favorite'];
	eventData: MatTableDataSource<SearchEvents>;
	
	showDetail() {
		this.service.currPane = PaneType.detailPane;
	}
	highlightRow(row) {
		this.service.selection.toggle(row);
	}
	ngOnInit() {
		this.service.selection.changed.subscribe(changed => {
			if (!this.service.selection.isEmpty()) {
				this.service.initVenue();
				this.service.findUpcomingEvents(this.service.venue.name);
				this.service.currSougkickEvent.subscribe(events => {
					this.service.upcomingEvents = events;
					this.service.sortedData = this.service.upcomingEvents.slice();
				});
			}
		})
		this.service.currEvents.subscribe(events => {
			if (events != null && events[0].name != undefined) {
				this.searchEvents = events;
				this.eventData = new MatTableDataSource<SearchEvents>(this.searchEvents);
			}
		});
	}
}