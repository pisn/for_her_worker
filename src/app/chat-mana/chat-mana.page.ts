import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, IonContent, Events } from '@ionic/angular';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as subscriptions from '../../graphql/subscriptions';
import { CognitoServiceService } from '../cognito-service.service';
import { Router } from '@angular/router';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

@Component({
  selector: 'app-chat-mana',
  templateUrl: './chat-mana.page.html',
  styleUrls: ['./chat-mana.page.scss'],
})
export class ChatManaPage implements OnInit {
  @ViewChild('content') content: IonContent;
  @ViewChild('chat_input') messageInput: ElementRef;
  chatUser: any; 
  order: any;
  inp_text: any;
  conversationMessages: Array<any>;    
  editorMsg = '';
  showEmojiPicker = false;  

  public count = 0; 



  constructor(private events: Events, private cognitoService : CognitoServiceService, private router: Router ) {
    
  }

  async getUserChat(){
    //Initializing APPSync
    var meQuery = API.graphql(graphqlOperation(queries.me)) as Promise<any>;    

    meQuery.then((result) => {      
      if(result.data.me != null){                      
        this.chatUser = result.data.me;

      }
    });

    return meQuery;
 }

  async createUserChat() {
    var newUserMutation = API.graphql(graphqlOperation(mutations.createUser, {username: this.cognitoService.userAttributes['name']})) as Promise<any>;      
      
    return newUserMutation;
  }

  async createConversation() {
    await API.graphql(graphqlOperation(mutations.createConversation, {id: this.order.serviceId, name : this.order.serviceId}))
    await API.graphql(graphqlOperation(mutations.createUserConversations, {conversationId: this.order.serviceId, userId: this.order.cliente.clienteId }))
    await API.graphql(graphqlOperation(mutations.createUserConversations, {conversationId: this.order.serviceId, userId: this.cognitoService.getUserId() }))  
  }

  async loadMessages(){
     var messagesQuery = API.graphql(graphqlOperation(queries.allMessage, {conversationId: this.order.serviceId})) as Promise<any>;

     messagesQuery.then((result) => {
       this.conversationMessages = result.data.allMessage;
     });

     var messagesSubscription = API.graphql(graphqlOperation(subscriptions.subscribeToNewMessage, {conversationId: this.order.serviceId})) as any;
     
     messagesSubscription.subscribe((result) => {       
        
        var removeMessages = this.conversationMessages.filter(function(value) { return value.createdAt == this.createdAt && value.content == this.content }, result.value.data.subscribeToNewMessage);
        removeMessages.forEach((message) => {
           this.conversationMessages.splice(this.conversationMessages.indexOf(message),1);
        })
        
        this.conversationMessages.push(result.value.data.subscribeToNewMessage);
        
     });   

  }


  async loadChat(){
    await this.getUserChat();

    if(this.chatUser == null){
      await this.createUserChat();
      await this.getUserChat();
    }
    
    var conversations = this.chatUser.conversations.userConversations.filter(function (value) { return value.conversationId == this  },this.order.serviceId);    

    if(conversations.length == 0){       
       await this.createConversation();      
    }    

    this.loadMessages();
  }

  

  ngOnInit() {    

    //Initialiing Page
    this.order = this.router.getCurrentNavigation().extras.state.order;    
    this.loadChat();    
  }

  scrollToBottom() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom()
    }, 500)
    console.log('scrollBottom2');
  }

  logScrollStart(){
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  
  }

  logScrolling(event){
    console.log('event',event)
  }

  

  sendMsg() {
    var newMessage: any = {
      content: this.inp_text,
      conversationId: this.order.serviceId,
      createdAt: (new Date()).toISOString()    
    }    

    API.graphql(graphqlOperation(mutations.createMessage, newMessage));

    newMessage.sender = this.chatUser.cognitoId;
    newMessage.status = "pending";

    this.conversationMessages.push(newMessage);

    this.inp_text = "";    
    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
   }

   showMessageDetails(msg){     
    if(msg.showDetails == false || msg.showDetails == null){
      this.conversationMessages.forEach((message) => {
        if(message.showDetails == true)
          message.showDetails = false; //Escondendo hora de outras mensagens antes
      })

      msg.showDetails = true;
    }
    else
      msg.showDetails = false;     
   }
   
   formatTime(isoTime: string){
     var dateObject = new Date(Date.parse(isoTime));
     const today = new Date();

     if(dateObject.getDate() == today.getDate() && dateObject.getMonth() == today.getMonth() && dateObject.getFullYear() == today.getFullYear()){
       return "Hoje " + dateObject.toLocaleTimeString();
     }
     else{
       return dateObject.toLocaleString();
     }
   }

}
