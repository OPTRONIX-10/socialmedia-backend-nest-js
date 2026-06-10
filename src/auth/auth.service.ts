import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(()=>UsersService)) private readonly userService: UsersService){

    }
    isAuthenticated : boolean = false
    login(email: string, password:string){
        const user = this.userService.users.find(x => x.email === email && x.password === password)
        if(user){
            this.isAuthenticated = true
            return 'User logined'
        }
        return 'user does not existed'
    }
}
