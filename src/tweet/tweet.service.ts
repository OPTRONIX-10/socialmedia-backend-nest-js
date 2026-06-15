import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UsersService,
        @InjectRepository(Tweet)
        private readonly tweetRepo: Repository<Tweet>
    ){}
   

    async getTweets(userId: number){
        
        return await this.tweetRepo.find({
            where:{user:{id:userId}},
            relations:{user:true}
        })
    }

    async createTweet(createTweetDto: CreateTweetDto){
        const  user = await this.userService.findUserById(createTweetDto.userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const tweet =   this.tweetRepo.create({
            ...createTweetDto,
            user,
        })

        return await this.tweetRepo.save(tweet)
    }
}
