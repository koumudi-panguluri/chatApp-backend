import { Injectable } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { Communication } from './messageDetails.model';
import { v4 as uuidv4 } from 'uuid';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';


@Injectable()

export class MessageDetailsService {
  constructor(private chatService: ChatDBService) { }
  async postMessageDetails(messageDetails: Communication) {
    let userId;
    let receiverNumber;
    if (messageDetails) {
      userId = messageDetails.userId;
      receiverNumber = messageDetails.receiverNumber;

      const message = {
        message: messageDetails.messages.message,
        time: messageDetails.messages.time,
      }

      await this.chatService.getMessageCollectionDetails().updateOne(
        {
          receiverNumber
        },

        {
          $setOnInsert: {
            userId
          },
          $push: {
            message
          }
          // $addToSet: {

          // }
        },
        { upsert: true }
      ).then((res) => {
        return message;
      })
    }

  }

  async getMessageDetailsByUserId(userId: string) {
    console.log("Fetching message details by userId", userId);
    return await this.chatService.getMessageCollectionDetails().findOne({ "userId": (userId) }, {
      projection: {
        _id: false,
      }
    })
  }
} 