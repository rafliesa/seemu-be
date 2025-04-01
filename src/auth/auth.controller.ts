import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: any) {
        return req.user;
    }

    @Get("status")
    @UseGuards(JwtAuthGuard)
    status(@Req() req: any) {
        return this.userService.findByUsername(req.user.username) 
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
}
