import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Message } from '../../models';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, AfterViewInit {

  @Input('messages')
  public messages: Message[];

  @ViewChild('chatlist', { read: ElementRef , static: true}) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef }) chatItems: QueryList<MessageItemComponent>;

  constructor() { }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      // console.debug('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.debug('Could not find the "chatList" element.');
    }
  }

  ngOnInit() {
  }

}
