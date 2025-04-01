import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { Community } from 'src/community/entity/community.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 

        @InjectRepository(Community)
        private readonly communityRepository: Repository<Community> 
    ) {}
    
    async create(creatorId: string, communityId: string, content: string) {
        const creator = await this.userRepository.findOne({ where: { id: creatorId } });
        const community = await this.communityRepository.findOne({ where: { id: communityId } });

        if (!creator) {
            throw new NotFoundException('User not found');
        }

        if (!community) {
            throw new NotFoundException('Community not found');
        }

        const post = this.postRepository.create({
            creator, 
            community, 
            content
        });

        return this.postRepository.save(post);
    }

    async findByCreator(creatorId: string): Promise<Post[] | null> {
        const creator = await this.userRepository.findOne({ where: { id: creatorId } });
    
        if (!creator) {
            throw new NotFoundException('User not found');
        }
    
        return this.postRepository.find({ where: { creator: { id: creatorId } } });
        
    }

    async findByCommunity(communityId: string): Promise<Post[] | null> {
        const community = await this.communityRepository.findOne({ where: { id: communityId } });

        if (!community) {
            throw new NotFoundException('Community not found');
        }

        return this.postRepository.find({ where: { community : {id: communityId} } });
    }

    async findById(id: string): Promise<Post | null> {
        const post = await this.postRepository.findOne({ where: { id } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return post;
    }

    async update(id: string, creatorId: string, content: string): Promise<Post> {
        const post = await this.postRepository.findOne({ 
            where: { id },
            relations: ['creator']
        });

        
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.creator.id !== creatorId) {
            throw new NotFoundException('You cant update others post!');
        }

        post.content = content;

        return this.postRepository.save(post);
    }

    async delete(id: string, creatorId: string): Promise<string> {
        const post = await this.postRepository.findOne({ 
            where: { id },
            relations: ['creator']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.creator.id !== creatorId) {
            throw new ForbiddenException('You can only delete your own post');
        }

        await this.postRepository.remove(post);

        return 'Post successfully deleted'; 
    }

    async incrementLike(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({ where: { id } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        post.likesCount = post.likesCount + 1;

        return this.postRepository.save(post);
    }

    async decrementLike(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({ where: { id } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        post.likesCount = post.likesCount - 1;

        return this.postRepository.save(post);
    }

    async incrementView(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({ where: { id } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        post.view = post.view + 1;

        return this.postRepository.save(post);
    }
}