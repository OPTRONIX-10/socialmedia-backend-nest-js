import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { ActiveUserType } from 'src/auth/interfaces/active-user-type.interfaces';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
    private readonly hashtagService: HashtagService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async getTweets(userId: number, paginationQueryDto: PaginationQueryDto) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with this ${userId} not found`);
    }

    return await this.paginationProvider.paginateQuery(
      paginationQueryDto,
      this.tweetRepo,
      { user: { id: userId } },
    );
  }

  async createTweet(createTweetDto: CreateTweetDto, activeUser: ActiveUserType) {
    const user = await this.userService.findUserById(activeUser.sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashtags = createTweetDto.hashtags?  await this.hashtagService.findHashtags(
      createTweetDto.hashtags!,
    ):[]

    const tweet = this.tweetRepo.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    return await this.tweetRepo.save(tweet);
  }

  async updateTweet(updateTweetDto: UpdateTweetDto) {
    const hashTags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags!,
    );

    const tweet = await this.tweetRepo.findOneBy({
      id: updateTweetDto.id,
    });
    if (tweet) {
      tweet.text = updateTweetDto.text ?? tweet?.text;
      tweet.image = updateTweetDto.image ?? tweet.image;
      tweet.hashtags = hashTags;
      return await this.tweetRepo.save(tweet);
    }
    return 'not found';
  }

  async deleteTweet(id: number) {
    await this.tweetRepo.delete({
      id,
    });
    return { delete: true, id };
  }
}
