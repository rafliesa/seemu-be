import { Post } from "src/post/entity/post.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.comments)
    creator: User;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Column({ name: 'content' })
    content: string;

    @CreateDateColumn({ type: 'timestamp', name: 'createdat' })
    createdAt: Date;
}