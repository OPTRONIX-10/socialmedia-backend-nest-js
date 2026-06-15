import { Body, Controller, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
    constructor(private readonly hashtagService: HashtagService){

        
    }

    @Post()
        createHashTag(@Body() createHashtagDto: CreateHashtagDto){
            this.hashtagService.createHashtag(createHashtagDto)
        }
}
