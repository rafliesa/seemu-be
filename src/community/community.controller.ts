import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('community')
export class CommunityController {
    constructor(private commmunityService: CommunityService) {}

    @UseGuards(JwtAuthGuard) 
    @Post('/')
    async createCommunity(@Body() community: {name : string}, @Req() req: any) {
        const user = req.user;
        return this.commmunityService.create(user, community.name);
    }

    @UseGuards(JwtAuthGuard) 
    @Get('/:id')
    async getCommunity(@Param() params: any) {
        return this.commmunityService.findById(params.id)
    }

    @UseGuards(JwtAuthGuard) 
    @Get('/get/user')
    async getCommunityByUser(@Req() req: any) {
        return this.commmunityService.findByUser(req.user.id)
    }


}

