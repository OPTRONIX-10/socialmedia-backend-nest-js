import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dtos";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ){
    
  }

  getallUsers() {
   
    return this.userRepo.find()
  }


  public async createNewUser(userDto: CreateUserDto) {
    const user  = await this.userRepo.findOne({
      where:{email:userDto.email}
    })
    if(user){
      return 'User already exists'
    }

    let newUser = this.userRepo.create(userDto)
    newUser = await this.userRepo.save(newUser)
    return newUser
  }
}
