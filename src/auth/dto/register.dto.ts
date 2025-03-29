import { IsNotEmpty, MinLength, IsAlphanumeric, IsEmail, isNotEmpty } from 'class-validator';
import { Transform } from 'stream';

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Firstname must have at least 3 characters' })
    firstname: string;
    
    @IsNotEmpty()
    @MinLength(3, { message: 'Lastname must have at least 3 characters' })
    lastname: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format.' })
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must have at least 6 characters.' })
    password: string;
}
