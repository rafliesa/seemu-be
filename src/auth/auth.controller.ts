import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: any) {
        return req.user;
    }

    @Get("status")
    @UseGuards(JwtAuthGuard)
    status(@Req() req: any) {
        console.log("INSIDE OF CONTROLLER StATUS METHOD")
        console.log(req.user)
        return req.user
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
}
