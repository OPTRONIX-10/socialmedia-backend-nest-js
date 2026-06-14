import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UsersService){}
    tweets: {text:string, date: Date, userId: number}[] = [
        {text:'poda patti', date: new Date('2024-11-12'), userId: 1},
        {text: 'poda tehendi', date: new Date('2025-10-13'), userId: 2},
        {text: 'poda potta', date: new Date('2023-11-14'), userId: 3}
    ]

    getTweets(userId: number){
        
        return 'response'
    }
}
