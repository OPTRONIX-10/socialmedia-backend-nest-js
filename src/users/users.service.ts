import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dtos';
import { Profile } from 'src/profile/profile.entity';
import { HashingProvider } from 'src/auth/provider/hasing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashProvider: HashingProvider,
  ) {}

  getallUsers() {
    return this.userRepo.find({
      relations: {
        profile: true,
      },
    });
  }

  public async createNewUser(userDto: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: userDto.email },
    });

    if (user) {
      return 'User already exists';
    }

    userDto.profile = userDto.profile ?? {};
    const newUser = this.userRepo.create({
      ...userDto,
      password: await this.hashProvider.hashPassword(userDto.password),
    });

    return await this.userRepo.save(newUser);
  }

  async deleteUser(id: number) {
    //find user
    // const user = await this.userRepo.findOneBy({id})

    // delete user
    await this.userRepo.delete(id);

    // const profileId = user?.profile?.id

    // if (profileId !== undefined) {
    //   await this.profileRepo.delete(profileId)
    // }

    return { deleted: true };
  }

  async findUserById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async findUserByUsername(userName: string) {
    let user: User | null = null;
    try {
      user = await this.userRepo.findOneBy({
        userName,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User does not found',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;  
  }
}
