import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationType } from 'src/app/modules/shared/models/notification-type';
import { ErrorService } from 'src/app/modules/shared/services/error.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent {
  @ViewChild('viewContainerRef', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(errorService: ErrorService) {
    errorService.error$.subscribe(message => {
      const component = this.container.createComponent(NotificationComponent);
      component.instance.type = NotificationType.Error;
      component.instance.content = message;

      component.instance.close.subscribe(() => {
        this.container.remove(this.container.indexOf(component.hostView));
        component.destroy();
      })
    });
  }
}
