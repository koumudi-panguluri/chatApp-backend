import { WebSocketGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { MessageDetailsService } from './messageDetails.service';
import { Communication } from './messageDetails.model';

@WebSocketGateway(8080, {
  namespace: "test",
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer() server;
  constructor(private readonly messageService: MessageDetailsService) { }
  @SubscribeMessage('chat')
  chatMessages(client, details: Communication): Observable<WsResponse<any>> {
    try {
      console.log("hello", details);
      const message = {
        message: details.messages.message,
        time: details.messages.time
      }
      //client.emit('chat', message);
      this.messageService.postMessageDetails(details);
      return of({ event: 'chat', data: message });
    }
    catch (err) {
      console.log("error occured web sockets", err)
    }
  }

}
