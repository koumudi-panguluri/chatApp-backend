import { Module } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { ConnectionDetailsController } from './connectionDetails.controller';
import { ConnectionDetailsService } from './connectionDetails.service';

@Module({
  imports: [],
  controllers: [ConnectionDetailsController],
  providers: [ConnectionDetailsService, ChatDBService],
})
export class ConnectionDetailsModule { }
