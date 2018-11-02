import { Component, OnInit, Input } from '@angular/core';
import { ArtistInfo } from '../schema/ArtistTeamInfo';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'ngbd-modal-content',
	template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
	@Input() name;

	constructor(public activeModal: NgbActiveModal) { }
}
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
