import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entity/community.entity';
import { CommunityMember } from './entity/community.member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, CommunityMember]), 
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
  exports: [CommunityService]
})
export class CommunityModule {}
