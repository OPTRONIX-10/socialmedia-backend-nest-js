import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UsersService {
  constructor(@Inject(forwardRef(()=>AuthService)) private readonly authService: AuthService){}
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
    password:string
  }[] = [
    {
      id: 1,
      name: 'Abhishek',
      email: 'abhi@gmail.com',
      age: 25,
      gender: 'Male',
      isMarried: false,
      password:'test@abc'
    },
    {
      id: 2,
      name: 'KS',
      age: 26,
      email: 'abho@gmail.com',
      gender: 'Female',
      isMarried: true,
      password:'test@abc'
    },
  ];

  getallUsers() {
    if(this.authService.isAuthenticated){
      return this.users;
    }
    return 'user not authenticated'
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id == id);
  }

  createNewUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
    password:string
  }) {
    this.users.push(user);
  }
}
