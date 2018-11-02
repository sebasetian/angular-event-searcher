import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { MainService } from '../main.service';
import { ArtistDetailTableComponent } from '../artist-detail-table/artist-detail-table.component';
import { SearchEvents } from '../schema/ticketMasterEvents';
@Component({
  selector: 'artist-detail-table-wrapper',
  templateUrl: './artist-detail-table-wrapper.component.html',
  styleUrls: ['./artist-detail-table-wrapper.component.scss']
})
export class ArtistDetailTableWrapperComponent implements OnInit {
	idx: number = 0;
	constructor(private resolver: ComponentFactoryResolver,private service: MainService) {
		
	}
	tableRefList = [];
	@ViewChild('table', {read: ViewContainerRef}) Ref: ViewContainerRef;
	ngOnInit() {
		if (this.tableRefList.length > 0) {
			this.removeTables();
		}
		let list = this.service.artistList.selected;
		for (let i = 0; i < list.length; i++) {
			this.createTable(i);
		}
		this.service.artistList.changed.subscribe(changed => {
			if (this.tableRefList.length > 0) {
				this.removeTables();
			}
			let list = changed.source.selected;
			for (let i = 0; i < list.length; i++) {
				this.createTable(i);
			}
		})
	}
	createTable(i) {
		let tableFac = this.resolver.resolveComponentFactory(ArtistDetailTableComponent);
		let tableRef = this.Ref.createComponent(tableFac);
		let curr = tableRef.instance;
		curr.currArtist = this.service.artistList.selected[i];
		curr.selfRef = curr;
		this.tableRefList.push(tableRef);
	}
	removeTables() {
		for (let i = 0; i < this.tableRefList.length;i++) {
			let tableRef = this.tableRefList[i];
			this.Ref.remove(this.Ref.indexOf(tableRef));
		}
		this.tableRefList = [];
	}
}
