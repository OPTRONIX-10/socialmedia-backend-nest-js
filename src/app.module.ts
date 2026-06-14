import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UsersModule, TweetModule, AuthModule,TypeOrmModule.forRootAsync({
   useFactory: ()=>({
     type:'postgres',
    autoLoadEntities:true,
    synchronize:true,
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'ronaldomessi',
    database:'nestjs-socialmedia-backend-database'
   })
  }), ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
