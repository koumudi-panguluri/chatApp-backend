import { Module } from '@nestjs/common';
import { ChatDBService } from 'src/database/chatDB.service';
import { UserDetailsController } from './userDetails.controller';
import { UserDetailsService } from './userDetails.service';

@Module({
  imports: [],
  controllers: [UserDetailsController],
  providers: [UserDetailsService, ChatDBService],
})
export class UserDetailsModule { }
