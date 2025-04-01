import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entity/like.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        private userService : UserService,
        private postService: PostService,
    ) {}

    async toggle(username: string, postId: string): Promise<string> {
        const user = await this.userService.findByUsername(username);
        const post = await this.postService.findById(postId);

        if (!user || !post) {
            throw new NotFoundException('User or Post not found');
        }

        const existingLike = await this.likeRepository.findOne({ where: { user: { id: user.id }, post: { id: post.id } } });

        if (existingLike) {
            await this.likeRepository.remove(existingLike);
            await this.postService.decrementLike(postId);
            return 'Post unliked';
        } else {
            const like = this.likeRepository.create({ user, post });
            await this.likeRepository.save(like);
            await this.postService.incrementLike(postId);
            return 'Post liked';
        }
    }
}