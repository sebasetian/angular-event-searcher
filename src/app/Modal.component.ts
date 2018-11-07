import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Input, Component } from "@angular/core";

@Component({
	selector: 'ngbd-modal-content',
	template: `
    <div class="modal-header">
      <h4 class="modal-title">View Seat Map</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <a [href]='imgHref'><img style='max-width: 100%;' [src]='imgHref'></a>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ModalContent {
	@Input() imgHref;
	constructor(public activeModal: NgbActiveModal) { }
}