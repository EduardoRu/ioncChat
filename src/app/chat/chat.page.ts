import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  Firestore,
  collection,
  collectionData,
  addDoc
 } from '@angular/fire/firestore';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: Observable<any[]>;
  newMessage: string = '';

  constructor(
    private firestore:Firestore
  ) { }

  ngOnInit() {
    this.messages = collectionData(collection(this.firestore, 'messages'), {idField:'id'});
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      addDoc(collection(this.firestore, 'messages'), {
        text: this.newMessage,
        timestamp: new Date().toISOString(),
      })
      this.newMessage = '';
    }
  }

}
