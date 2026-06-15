import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';
import { UpdateTweetDto } from 'src/tweet/dtos/update-tweet.dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(Hashtag)
        private readonly hashTagRepo: Repository<Hashtag>,
        
    ){

    }

    async createHashtag(createHashtagDto: CreateHashtagDto){
        const tag = this.hashTagRepo.create(createHashtagDto)
        return await this.hashTagRepo.save(tag)
    }

    async findHashtags(hashtags:number[]){
        return await this.hashTagRepo.find(
            {where:{id:In(hashtags)}}
        )
    }

    async onDelete(id: number){
        //permenant delete
        //  await this.hashTagRepo.delete(id)

        //soft delete
        await this.hashTagRepo.softDelete(id)
         return {delete:true,id}
    }


}
