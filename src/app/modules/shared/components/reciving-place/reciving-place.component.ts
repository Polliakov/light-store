import { Component, Input } from '@angular/core';
import { IRecivingPlace } from '../../models/reciving-place';

@Component({
  selector: 'app-reciving-place',
  templateUrl: './reciving-place.component.html',
  styleUrls: ['./reciving-place.component.scss']
})
export class RecivingPlaceComponent {
  @Input() warehouse: IRecivingPlace;
}
