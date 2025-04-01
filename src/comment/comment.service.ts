import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment-entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        
        private userService : UserService,
        private postService : PostService
    ) {}
    
    async create(creatorUsername: string, postId: string, content: string): Promise<Comment> {
        const creator = await this.userService.findByUsername(creatorUsername)
        const post = await this.postService.findById(postId)

        if (!creator || !post) {
            throw new NotFoundException('User or Post not found');
        }

        const comment = this.commentRepository.create({ creator, post, content });
        return this.commentRepository.save(comment);
    }

    async findByPost(postId: string): Promise<Comment[] | null> {
        return this.commentRepository.find({ where: { post: { id: postId } }, relations: ['creator'] });
    }

    async findById(id: string): Promise<Comment | null> {
        return this.commentRepository.findOne({ where: { id }, relations: ['creator', 'post'] });
    }

    async update(id: string, creatorId: string, content: string): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ['creator'] });
        
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.creator.id !== creatorId) {
            throw new ForbiddenException('You can only update your own comment');
        }

        comment.content = content;

        return this.commentRepository.save(comment);
    }

    async delete(id: string, creatorId: string): Promise<string> {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ['creator'] });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.creator.id !== creatorId) {
            throw new ForbiddenException('You can only delete your own comment');
        }

        await this.commentRepository.remove(comment);

        return 'Comment successfully deleted'; 
    }
}
