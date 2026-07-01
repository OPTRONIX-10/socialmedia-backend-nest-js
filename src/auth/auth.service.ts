import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dtos';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hasing.provider';
import { JwtService } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserType } from './interfaces/active-user-type.interfaces';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashprovider: HashingProvider,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByUsername(loginDto.username);

    const isEqual = await this.hashprovider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    const tokens = await this.generateToken(user);
    return tokens;
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto);
  }

  async getRefreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );

      const user = await this.usersService.findUserById(sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      return await this.generateToken(user);
    } catch (e) {
      throw new UnauthorizedException(error);
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  private async generateToken(user: User) {
    const accessToken = await this.signToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.expiresIn,
      { email: user.email },
    );

    const refreshToken = await this.signToken(
      user.id,
      this.authConfiguration.refreshTokenExpiresIn,
    );

    return {
      accessTokenValue: accessToken,
      refreshTokenValue: refreshToken,
    };
  }
}
