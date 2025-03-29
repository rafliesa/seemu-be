import { IsEmail, IsHash, isNotEmpty, IsNotEmpty, isString, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;    
}