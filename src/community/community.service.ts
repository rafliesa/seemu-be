import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entity/community.entity';
import { Repository } from 'typeorm';
import { CommunityMember } from './entity/community.member.entity';
import { User } from 'src/user/entity/user.entity';


@Injectable()
export class CommunityService {
    constructor(
        @InjectRepository(Community)
        private readonly communityRepository: Repository<Community>,
        
        @InjectRepository(CommunityMember)
        private readonly communityMemberRepository: Repository<CommunityMember>
    ) {}

    async create(creator: User, name: string): Promise<Community> {
        const community = this.communityRepository.create({ creator, name });
        await this.communityRepository.save(community);
    
        const user = creator;
        const communityMember = this.communityMemberRepository.create({ user, community });
        await this.communityMemberRepository.save(communityMember);
    
        return community;
    }
    

    async findByName(name: string): Promise<Community[] | null> {
        return this.communityRepository.find({ where: { name } });
    }

    async findById(id : string) : Promise<Community | null> {
        return this.communityRepository.findOne({where : {id}});
    }

    async findByUser(userId: string): Promise<CommunityMember[]> {   
        return this.communityMemberRepository.find({ 
            where: { 
                user: { id: userId }  
            },
            relations: ['community'] 
        });
    }

    async join(communityId: string, user: User): Promise<CommunityMember> {
        const community = await this.communityRepository.findOne({ where: { id: communityId } });
        if (!community) {
            throw new NotFoundException('Community not found');
        }

        const existingMember = await this.communityMemberRepository.findOne({ where: { user, community } });
        if (existingMember) {
            throw new BadRequestException('User already joined the community');
        }

        const newMember = this.communityMemberRepository.create({ user, community });
        return this.communityMemberRepository.save(newMember);
    }

    async leave(communityId: string, user: User): Promise<void> {
        const community = await this.communityRepository.findOne({ where: { id: communityId } });
        if (!community) {
            throw new NotFoundException('Community not found');
        }

        const member = await this.communityMemberRepository.findOne({ where: { user, community } });
        if (!member) {
            throw new NotFoundException('User is not a member of this community');
        }

        await this.communityMemberRepository.remove(member);
    }
}