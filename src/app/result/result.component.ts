import { Component, OnInit, Input } from '@angular/core';
import { SearchEvents } from '../schema/ticketMasterEvents';
import { MainService } from '../main.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
	selector: 'result-field',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss'],
	
})
export class ResultComponent implements OnInit {
	searchEvents: SearchEvents[];
	constructor(private service: MainService) {
		this.service.currPane = 'resPane';
	}
	column: string[] = ['#','Date','Event','Category','Venue Info','Favorite'];
	isFavorite: boolean[];
	eventData: MatTableDataSource<SearchEvents>;
	selection = new SelectionModel<SearchEvents>(false,[]);
	
	changeFavorite(i) {
		this.isFavorite[i] = !this.isFavorite[i];
	}
	showDetail() {
		this.service.currPane = 'detailPane';
	}
	highlightRow(row) {
		if (this.selection.isSelected(row)) {
			this.selection.deselect(row);
		} else {
			this.selection.select(row);
		}
	}
	ngOnInit() {
		this.service.currEvents.subscribe(events => {
			if (events != null && events[0].name != undefined) {
				this.searchEvents = events;
				this.isFavorite = [];
				this.eventData = new MatTableDataSource<SearchEvents>(this.searchEvents);
				for (let i = 0; i < events.length;i++) {
					this.isFavorite[i] = false;
				}
			}
		});
	}
}
type PaneType = 'resPane' | 'favoritePane' | 'detailPane';
