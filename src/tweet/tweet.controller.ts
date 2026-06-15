import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService,
    ){}

    @Get(':userId')
    public getTweets(@Param('userId', ParseIntPipe) userId: number){
        return this.tweetService.getTweets(userId )
    }
    @Post()
    createTweet(@Body() tweet: CreateTweetDto){
        return this.tweetService.createTweet(tweet)

    }

    @Patch()
     updateTweet(@Body() updateTweetDto: UpdateTweetDto){
         return this.tweetService.updateTweet(updateTweetDto)
    }   

    @Delete(':id')
    async deleteTweet(@Param('id' , ParseIntPipe) id: number){
        return await this.tweetService.deleteTweet(id)
    }
}
