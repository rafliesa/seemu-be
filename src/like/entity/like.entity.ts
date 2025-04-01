import { Post } from "src/post/entity/post.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Post, (post) => post.likes, {
        onDelete: 'CASCADE' 
    })
    post: Post;
}
