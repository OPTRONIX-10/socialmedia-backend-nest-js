import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UsersService,
        @InjectRepository(Tweet)
        private readonly tweetRepo: Repository<Tweet>,
        private readonly hashtagService: HashtagService
    ){}
   

    async getTweets(userId: number){

        const user = await this.userService.findUserById(userId)
        if(!user){
            throw new NotFoundException(`User with this ${userId} not found`)
        }
        
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

        const hashtags =await  this.hashtagService.findHashtags(createTweetDto.hashtags!)

        const tweet =   this.tweetRepo.create({
            ...createTweetDto,
            user,
            hashtags

        })

        return await this.tweetRepo.save(tweet)
    }

    async updateTweet(updateTweetDto: UpdateTweetDto){
        const hashTags =await this.hashtagService.findHashtags(updateTweetDto.hashtags!)

        const tweet = await this.tweetRepo.findOneBy({
            id:updateTweetDto.id
        })
        if(tweet){
            tweet.text = updateTweetDto.text ?? tweet?.text
            tweet.image = updateTweetDto.image ?? tweet.image
            tweet.hashtags = hashTags
            return await this.tweetRepo.save(tweet)
        }
        return 'not found'
    }

    async deleteTweet(id:number){
        await this.tweetRepo.delete({
            id
        })
        return {delete: true, id}
    }
}
