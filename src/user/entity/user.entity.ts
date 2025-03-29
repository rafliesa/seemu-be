import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'firstname' })
    firstName: string;

    @Column({ name: 'lastname' })
    lastName: String;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;
}