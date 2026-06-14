import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(){

    }
    login(email: string, password:string){

            return 'User logined'
        
    }
}
