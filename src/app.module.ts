import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionDetailsModule } from './connectionDetails/connectionDetails.module';
import { MessageDetailsModule } from './messageDetails/messageDetails.module';
import { UserDetailsModule } from './userDetails/userDetails.module';

@Module({
  imports: [
    UserDetailsModule,
    ConnectionDetailsModule,
    MessageDetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
