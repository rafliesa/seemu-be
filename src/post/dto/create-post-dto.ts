import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto{
    @IsString()
    community: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}