import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { SearchEvents } from '../schema/ticketMasterEvents';
import { PaneType } from '../pane-type.enum';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'detail-info',
	templateUrl: './detail-info.component.html',
	styleUrls: ['./detail-info.component.scss'],
	providers: [NgbTabsetConfig]
})
export class DetailInfoComponent implements OnInit {
	event: SearchEvents = null;
	eventName = 'null'; 
	constructor(private service: MainService, private config: NgbTabsetConfig) {
		config.justify = 'end';
	 }
	showList() {
		this.service.currPane = PaneType.resPane;
	}
	ngOnInit() {
		this.service.selection.changed.subscribe(event => {
			this.event = event.source.selected[0];
			this.eventName = this.event == null? 'null' : this.event.name;
		});
	}

}
