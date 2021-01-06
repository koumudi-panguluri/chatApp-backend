import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './userDetails.model';
import { UserDetailsService } from './userDetails.service';

@Controller("user")
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) { }

  @Post("add")
  async addUserDetails(@Body() data: User) {
    try {
      const userDetails = await this.userDetailsService.postUserDetails(data);
      console.log("User data", userDetails);
      return {
        status: "Ok",
        message: "User details added successfully",
        userDetails: userDetails
      }
    }
    catch (err) {
      console.log("Error occurred while inserting data", err);
    }
  }

  @Get("get/:userId")
  async getUserById(@Param("userId") userId: string) {
    try {
      const userDetails = await this.userDetailsService.getUserDetailsById(userId);
      console.log("User details", userDetails);
      return {
        status: "Ok",
        message: "User details obtained successfully",
        userDetails: userDetails
      }
    }
    catch (err) {
      console.log("Error occurred while fetching data", err);
    }
  }

  @Get("all")
  async getAllUsers() {
    try {
      const usersDetails = await this.userDetailsService.getAllUserDetails();
      console.log("Users details", usersDetails);
      return {
        status: "Ok",
        message: "Users details obtained successfully",
        userDetails: usersDetails
      }
    }
    catch (err) {
      console.log("Error occurred while fetching data", err);
    }
  }
}
