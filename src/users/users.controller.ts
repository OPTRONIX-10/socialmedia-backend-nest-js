import {
  Body,
  Controller,
  DefaultValuePipe,
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
import {  GetUserParamDtos } from './dtos/get-user-param.dtos';
import { UpdateUserDto } from './dtos/update-user.dtos';

//http://localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private users: UsersService){}
  @Get(':isMarried')
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(3), ParseIntPipe) page: number,
    @Param() isMarried: GetUserParamDtos
  ) {
    console.log(isMarried);
    return this.users.getallUsers();
  }

  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.users.getUserById(id);
  }

  @Post()
  postUsers(@Body() user: CreateUserDto) {
    
    console.log(user)
    //this.users.createNewUser(user);
    return 'new user created';
  }

  @Patch()
  patchUser(@Body() user:UpdateUserDto){
    console.log(user)
    return 'Updated user information'
  }
}
