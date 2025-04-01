import { Comment } from "src/comment/entity/comment-entity";
import { Community } from "src/community/entity/community.entity";
import { Like } from "src/like/entity/like.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.posts)
    creator: User;

    @ManyToOne(() => Community, community => community.posts, { nullable: true })
    community: Community;

    @Column({ name: 'content' })
    content: string;

    @Column({ default: 0 })
    likesCount: number;

    @Column({ default: 1 })
    view: number;

    @CreateDateColumn({ type: 'timestamp', name: 'createdat' })
    createdAt: Date;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.post, {
        cascade: true, 
        onDelete: 'CASCADE' 
    })
    likes: Like[];
}