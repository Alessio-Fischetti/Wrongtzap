/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Message } from 'src/app/entities/models/message';
import { MessageComponent } from './message/message.component';
import { Status } from 'src/app/entities/models/status';
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss'],
  standalone: true,
  imports: [IonContent, MessageComponent]
})
export class ChatMessageListComponent implements AfterViewInit {

  @ViewChildren(MessageComponent) messageComponent!: QueryList<MessageComponent>
  @Input() messages: Message[] = []

  userId!: string

  constructor(session: SessionService,) {
    const profile = session.getProfile()
      this.userId = profile.userId
  }



  ngAfterViewInit(): void {
    this.messageComponent.changes.subscribe((messageComponent: QueryList<MessageComponent>)=> {
      messageComponent.forEach((message, index)=>{
        this.observeMessage(message, index)
      })
    })
  }

observeMessage(messageComponent: MessageComponent, index: number) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                this.messages[index].status = Status.SEEN
                messageComponent.elementRef.nativeElement.style.display = 'block';
                observer.unobserve(messageComponent.elementRef.nativeElement);

            } else {
              messageComponent.elementRef.nativeElement.style.display = 'none';
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    observer.observe(messageComponent.elementRef.nativeElement);
  }

  isSent(userId: string): boolean {
    return userId == this.userId
  }

}
