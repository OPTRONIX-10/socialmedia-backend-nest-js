import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

//http://localhost:3000/users
@Controller('users')
export class UsersController {
  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(3), ParseIntPipe) page: number,
  ) {
    const users = new UsersService();
    console.log(limit, page);
    return users.getallUsers();
  }

  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    const users = new UsersService();
    return users.getUserById(id);
  }

  @Post()
  postUsers() {
    const user = {
      id: 3,
      name: 'ABi',
      age: 30,
      gender: 'Male',
      email: 'john@gmail.com',
      isMarried: false,
    };
    const users = new UsersService();
    users.createNewUser(user);
    return 'new user created';
  }
}
