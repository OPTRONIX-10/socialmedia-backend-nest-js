import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dtos';


//http://localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private users: UsersService){}
  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(3), ParseIntPipe) page: number,
  ) {
    return this.users.getallUsers();
  }


  @Post()
  postUsers(@Body() user: CreateUserDto) {
    
    console.log(user)
    this.users.createNewUser(user);
    return 'new user created';
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id:number){
    this.users.deleteUser(id)
  }

 
}
