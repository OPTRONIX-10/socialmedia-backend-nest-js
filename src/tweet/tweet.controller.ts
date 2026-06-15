import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService){}

    @Get(':userId')
    public getTweets(@Param('userId', ParseIntPipe) userId: number){
        return this.tweetService.getTweets(userId )
    }
    @Post()
    createTweet(@Body() tweet: CreateTweetDto){
        return this.tweetService.createTweet(tweet)

    }
}
