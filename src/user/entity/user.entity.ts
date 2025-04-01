import { Comment } from "src/comment/entity/comment-entity";
import { CommunityMember } from "src/community/entity/community.member.entity";
import { Like } from "src/like/entity/like.entity";
import { Post } from "src/post/entity/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'firstname' })
    firstName: string;

    @Column({ name: 'lastname' })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.creator)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.creator)
    comments: Comment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => CommunityMember, (communityMember) => communityMember.user)
    communityMembers: CommunityMember[];
}