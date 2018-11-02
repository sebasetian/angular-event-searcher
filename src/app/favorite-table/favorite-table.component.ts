import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SearchEvents } from '../schema/ticketMasterEvents';

@Component({
  selector: 'favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.scss']
})
export class FavoriteTableComponent implements OnInit {

	constructor(private service: MainService) { }
	column: string[] = ['#', 'Date', 'Event', 'Category', 'Venue Info', 'Favorite'];
	selection = new SelectionModel<SearchEvents>(false, []);

	highlightRow(row) {
		this.selection.toggle(row);
	}
	removeFavorite(event) {
		this.service.favoriteList.deselect(event);
	}	
	ngOnInit() {
	}

}
