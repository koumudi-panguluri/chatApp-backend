import { Injectable } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { User } from './userDetails.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserDetailsService {
  constructor(private chatService: ChatDBService) { };

  async postUserDetails(userDetails: User) {
    if (userDetails) {
      if (!userDetails.userId) {
        userDetails.userId = `chat_user_${uuidv4()}`;
      }
      const user = {
        name: userDetails.name,
        phone: userDetails.phone,
        userId: userDetails.userId //unique id
      }
      console.log("user details", user)
      //TODO insert or update with upsert
      await this.chatService.getUserCollectionDetails().insertOne(user)
      console.log("User details inserted");
      return user;
    }
  }

  async getUserDetailsById(userId) {
    console.log("Fetching user details by userId", userId);
    return await this.chatService.getUserCollectionDetails().findOne({ "userId": (userId) }, {
      projection: {
        _id: false //mongoDB id excluded
      }
    });

  }

  async getAllUserDetails() {
    //why no projection while find??
    return await this.chatService.getUserCollectionDetails().find().toArray()
  }

}
