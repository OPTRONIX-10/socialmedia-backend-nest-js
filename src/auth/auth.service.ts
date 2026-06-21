import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dtos';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hasing.provider';
import { JwtService } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashprovider: HashingProvider,
    @Inject(authConfig.KEY)
    private readonly authConfiguration : ConfigType<typeof authConfig>
  ) {}
  async login(loginDto: LoginDto) {
    const user =  await this.usersService.findUserByUsername(loginDto.username);

    const isEqual = await this.hashprovider.comparePassword(loginDto.password, user.password)
    if(!isEqual){
        throw new UnauthorizedException('Incorrect password')
    }

    const token =  await this.jwtService.signAsync({
        sub: user.id,
        email: user.email
    },{
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer
    })
    return {
        token: token
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto);
  }
}
