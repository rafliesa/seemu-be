import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto{
    @IsString()
    post: string;

    @IsNotEmpty()
    @IsString()
    content: string;    
}