import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Communication } from './messageDetails.model';
import { MessageDetailsService } from './messageDetails.service';



@Controller("message")
export class MessageDetailsController {
  constructor(private readonly messageService: MessageDetailsService) { }
  @Post("add")
  async addMessageDetails(@Body() data: Communication) {
    try {
      const messageDetails = await this.messageService.postMessageDetails(data);
      console.log("Communication data", messageDetails);
      return {
        success: "Ok",
        message: "Message Details added successfully",
        messageDetails: messageDetails
      }
    }
    catch (err) {
      console.log("Error while inserting message details", err);
    }
  }

  @Get("get/:userId")
  async getMessageDetails(@Param("userId") userId: string) {
    try {
      const details = await this.messageService.getMessageDetailsByUserId(userId);
      console.log("Message details of user", details);
      return {
        status: "Ok",
        message: "Message details obtained successfully",
        messageDetails: details
      }
    }
    catch (err) {
      console.log("Error while fetching message details", err);
    }
  }
}