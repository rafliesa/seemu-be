import { Post } from "src/post/entity/post.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { CommunityMember } from "./community.member.entity";

@Entity()
export class Community {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id)
    creator: User;

    @Column({ name: 'name' })
    name: string;

    @Column({ default: 0 })
    memberCount: number;

    @CreateDateColumn({ type: 'timestamp', name: 'createdat' })
    createdAt: Date;

    @OneToMany(() => Post, post => post.community)
    posts: Post[];

    @OneToMany(() => CommunityMember, (communityMember) => communityMember.community)
    communityMembers: CommunityMember[];

}