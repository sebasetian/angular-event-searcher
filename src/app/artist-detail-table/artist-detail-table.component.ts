import { Component, OnInit } from '@angular/core';
import { ArtistInfo } from '../schema/ArtistTeamInfo';

@Component({
  selector: 'artist-detail-table',
  templateUrl: './artist-detail-table.component.html',
  styleUrls: ['./artist-detail-table.component.scss']
})
export class ArtistDetailTableComponent implements OnInit {
	Header = ['Name', 'Followers', 'Popularity', 'Check At'];
	currArtist: ArtistInfo;
	ArtistName: string = "";
	isDisplayed: boolean[] = [false,false,false,false];
	public selfRef: ArtistDetailTableComponent;
	id: number;	
	constructor() {
		
	}
	countRow(id,str) {
		if (str === '') {
			return false;
		}
		this.isDisplayed[id] = true;
		let count = 0;
		for (let i = 0; i <= id; i++) {
			count += this.isDisplayed[i] ? 1 : 0;
		}
		if (count % 2 == 0) {
			return false;
		}
		return true;
	}
	ngOnInit() {
		this.ArtistName = this.currArtist.name;
	}
}
