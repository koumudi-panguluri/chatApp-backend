import { Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, Db, MongoClient } from "mongodb";

@Injectable()
export class ChatDBService implements OnModuleInit {
  ChatMongoClient: MongoClient;
  ChatDb: Db;
  constructor() { }
  async onModuleInit(): Promise<void> {
    try {
      this.ChatMongoClient = await MongoClient.connect("mongodb+srv://koumudi:koumudi1998@cluster0.yyhkv.mongodb.net/chat?retryWrites=true&w=majority");
      this.ChatDb = this.ChatMongoClient.db("chat");
      console.log("MongoDB connected successfully..");
    }
    catch (err) {
      console.log("Error occurred", err);
    }
  }

  getUserCollectionDetails(): Collection {
    return this.ChatDb.collection("user");
  }

  getConnectionCollectionDetails(): Collection {
    return this.ChatDb.collection("connection");
  }
  getMessageCollectionDetails(): Collection {
    return this.ChatDb.collection("message");
  }
}
