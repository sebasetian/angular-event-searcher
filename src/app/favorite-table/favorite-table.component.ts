import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SearchEvents } from '../schema/ticketMasterEvents';
import { PaneType } from '../pane-type.enum';

@Component({
  selector: 'favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.scss']
})
export class FavoriteTableComponent implements OnInit {
	constructor(public service: MainService) { }
	column: string[] = ['#', 'Date', 'Event', 'Category', 'Venue Info', 'Favorite'];
	selection = new SelectionModel<SearchEvents>(false, []);

	showDetail() {
		this.service.currPane = PaneType.detailPane;
	}
	highlightRow(row) {
		this.service.selection.toggle(row);
	}
	jumpToDetail(event) {
		this.highlightRow(event);
		this.showDetail()
	}
	ngOnInit() {
	}
	truncateName(name: string): string {
		if (name == undefined) {
			return "";
		}
		if (name.length > 35) {
			return name;
		}
		return name.substr(0, 35) + '...';
	}
}
