import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Connection } from './connectionDetails.model';
import { ConnectionDetailsService } from './connectionDetails.service';

@Controller("connection")
export class ConnectionDetailsController {
  constructor(private readonly connectionService: ConnectionDetailsService) { }
  @Post("add")
  async addConnectionDetails(@Body() data: Connection) {
    try {
      const connectionDetails = await this.connectionService.postConnectionDetails(data);
      console.log("Connection data", connectionDetails);
      return {
        status: "Ok",
        message: "Connection details added successfully",
        connectionDetails: connectionDetails
      }
    }
    catch (err) {
      console.log("Error while inserting connection details", err);
    }

  }

  @Get("get/:userId")
  async getConnectionDetails(@Param("userId") userId: string) {
    try {
      const details = await this.connectionService.getConnectionDetailsByUserId(userId);
      console.log("Connection details of user", details);
      return {
        status: "Ok",
        message: "Connection details obtained successfully",
        connectionDetails: details
      }
    }
    catch (err) {
      console.log("Error while fetching connection details", err);
    }
  }
}