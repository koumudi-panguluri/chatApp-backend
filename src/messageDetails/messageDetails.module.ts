import { Module } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { MessageDetailsController } from './messageDetails.controller';
import { ChatGateway } from './messageDetails.gateway';
import { MessageDetailsService } from './messageDetails.service';
@Module({
  imports: [],
  controllers: [MessageDetailsController],
  providers: [MessageDetailsService, ChatDBService, ChatGateway],
})
export class MessageDetailsModule { }
