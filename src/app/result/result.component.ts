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
	constructor(private service: MainService) {
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
		this.service.currEvents.subscribe(events => {
			if (events != null && events[0].name != undefined) {
				this.searchEvents = events;
				this.eventData = new MatTableDataSource<SearchEvents>(this.searchEvents);
			}
		});
	}
}