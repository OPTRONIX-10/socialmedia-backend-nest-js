import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';

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
}
