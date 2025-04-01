import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('like')
export class LikeController {
    constructor(private likeService : LikeService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    async post(@Param('id') id: string, @Req() req: any) {
        return this.likeService.toggle(req.user.username, id)
    }

}
