import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';
import { NotificationType } from 'src/app/modules/shared/models/notification-type';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() content: string;
  @Input() type: NotificationType;
  typeEnum = NotificationType;
  @Output() close = new EventEmitter();
}
