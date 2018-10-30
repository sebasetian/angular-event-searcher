import { Component, ChangeDetectionStrategy, Input , ViewEncapsulation} from '@angular/core';
import {
	animate, state, style, transition, trigger
} from '@angular/animations';
import { PaneType } from '../pane-type.enum'
@Component({
	selector: 'slide-div',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
	animations: [
		trigger('slide', [
			state('favoritePane', style({ transform: 'translateX(33.4%)' })),
			state('resPane', style({ transform: 'translateX(0)' })),
			state('detailPane', style({ transform: 'translateX(-33.3%)' })),
			transition('* => *', animate(300))
		])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {
	@Input() activePane: PaneType = PaneType.resPane;
	constructor() { }
}
