import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Command, NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  messages: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages = this.notificationsService.messageOutput;
    // setInterval(()=> {this.notificationsService.addError("It's Working !!!")}, 2000);
  }

  ngOnInit(): void {
  }

  clearMessage(id: number) {
    this.notificationsService.clearMesssage(id);
  }

}
