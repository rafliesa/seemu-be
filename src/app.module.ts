import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entity/post.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/entity/like.entity';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { Community } from './community/entity/community.entity';
import { Comment } from './comment/entity/comment-entity';
import { CommunityMember } from './community/entity/community.member.entity';

@Module({
  imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [User, Post, Like, Comment, Community, CommunityMember],
            synchronize: true,
            ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false
          }),
          inject: [ConfigService]
        }),
        AuthModule,
        UserModule,
        PostModule,
        LikeModule,
        CommentModule,
        CommunityModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
