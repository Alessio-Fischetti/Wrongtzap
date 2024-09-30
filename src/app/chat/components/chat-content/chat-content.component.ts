/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Message } from 'src/app/app.component';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
  standalone: true,
  imports: [IonContent, MessageComponent]
})
export class ChatContentComponent implements AfterViewInit {

  @ViewChildren(MessageComponent) messageComponent!: QueryList<MessageComponent>
  @Input() messages: Message[] = []

  constructor() { }

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
            console.log('Entry:', entry);
            console.log('entry message:', this.messages[index].message)
            console.log('Bounding Client Rect:', entry.boundingClientRect);
            console.log('Intersection Ratio:', entry.intersectionRatio);
            if (entry.isIntersecting) {

                this.messages[index].status = 4;
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
}