import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn  } from "typeorm";
import { Community } from "./community.entity";

@Entity()
export class CommunityMember {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => User, (user) => user.communityMembers)
    @JoinColumn({ name: "user_id" }) 
    user: User;

    @ManyToOne(() => Community, (community) => community.communityMembers)
    @JoinColumn({ name: "community_id" })
    community: Community;
}