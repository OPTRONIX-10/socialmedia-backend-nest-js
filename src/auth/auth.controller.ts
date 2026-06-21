import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dtos';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post(':login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto)
    }

    @Post(':signup')
    async signUp(@Body() createUserDto: CreateUserDto){
        return await this.authService.signUp(createUserDto)
    }

}
