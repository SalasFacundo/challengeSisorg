import { Component } from '@angular/core';
import { NotificationService } from './modules/shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NotificationService]
})
export class AppComponent {
  title = 'finanzen';

  constructor(private notificationService: NotificationService){}
}
