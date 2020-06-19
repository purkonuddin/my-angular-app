import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  // messages: Subject<any>;
  messageInput: Subject<Command>;
  messageOutput: Observable<Command[]>;

  constructor() {
    // this.messages = new Subject<any>();
    this.messageInput = new Subject<Command>();
    this.messageOutput = this.messageInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter(message => message.id !== value.id);
        }else{
          return [...acc, value];
        }
      },[])
    )
  }

  addSuccess(message: string) {
    // this.messages.next(message);
    const id = this.randomId();
    this.messageInput.next({
      id,
      type: 'success',
      text: message
    })
    setTimeout(()=>{this.clearMesssage(id)}, 5000);
  }

  addError(message: string) {
    // this.messages.next(message);
    const id = this.randomId();
    this.messageInput.next({
      id,
      type: 'error',
      text: message
    })
    setTimeout(()=>{this.clearMesssage(id)}, 10000);
  }

  clearMesssage(id: number) {
    this.messageInput.next({id, type:'clear'});
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
