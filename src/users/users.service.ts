import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dtos";
import { Profile } from "src/profile/profile.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>,

    @InjectRepository(Profile)
    private profileRepo : Repository<Profile>
  ){
    
  }

  getallUsers() {
   
    return this.userRepo.find({
      relations:{
        profile: true
      }
    })
  }


  public async createNewUser(userDto: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: userDto.email },
    });

    if (user) {
      return 'User already exists';
    }

    
    userDto .profile = userDto.profile ?? {}
    const newUser = this.userRepo.create(
      userDto,
    );

    return await this.userRepo.save(newUser);
  }

  async deleteUser(id:number){
    //find user
    // const user = await this.userRepo.findOneBy({id})

    // delete user
    await this.userRepo.delete(id)

    // const profileId = user?.profile?.id

    // if (profileId !== undefined) {
    //   await this.profileRepo.delete(profileId)
    // }

    return {deleted:true}
  }
}
