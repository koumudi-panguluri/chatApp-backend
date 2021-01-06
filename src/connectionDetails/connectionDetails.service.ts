import { Injectable } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { Connection } from './connectionDetails.model';


@Injectable()
export class ConnectionDetailsService {
  constructor(private chatService: ChatDBService) { }

  async postConnectionDetails(connectionData: Connection) {
    if (connectionData) {
      let userId = connectionData.userId;
      const connections = {
        receiverNumber: connectionData.connections[0].receiverNumber,
        name: connectionData.connections[0].name,
      };

      await this.chatService.getConnectionCollectionDetails().updateOne(
        { userId },
        {
          //to push in an array
          $addToSet: {
            connections
          },
        },
        { upsert: true }).then((res) => {
          return connections;
        })
    }

  }

  async getConnectionDetailsByUserId(userId: string) {
    console.log("Fetching connection details by userId", userId);
    return await this.chatService.getConnectionCollectionDetails().findOne({ "userId": (userId) }, {
      projection: {
        _id: false,
      }
    })
  }
}