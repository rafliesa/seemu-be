    import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
    import { AuthPayloadDto } from './dto/auth.dto';
    import { JwtService } from '@nestjs/jwt';
    import * as bcrypt from 'bcrypt';
    import { UserService } from 'src/user/user.service';
    import { RegisterDto } from './dto/register.dto';


    @Injectable()
    export class AuthService {

        constructor(private jwtService: JwtService, private userService: UserService) {}

        async validateUser({ username, password }: AuthPayloadDto) {
            const user = await this.userService.findByUsername(username);
            if (!user) throw new UnauthorizedException('Invalid credentials');
        
            console.log('Password from request:', password);
            console.log('User password from DB:', user.password);
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        
            const payload = { id: user.id, username: user.username };
            return {
                jwt: this.jwtService.sign(payload),
            };
        }

        async register(registerDto: RegisterDto) {
        const { firstname, lastname, username, email, password } = registerDto;

        const existingUser = await this.userService.findByUsername(username);
        if (existingUser) {
            throw new BadRequestException('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.create(
            firstname,
            lastname,
            username,
            email,
            hashedPassword,
        );

        return { message: 'User registered successfully', user };
        }

    }
