import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('post')
export class PostController {
    constructor(private postService : PostService) {}

    @UseGuards(JwtAuthGuard) 
    @Post('/')
    async post(@Body() body: {community: string, content: string}, @Req() req: any) {
        const user = req.user; 
        return this.postService.create(user.id, body.community, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() body: {content: string },
        @Req() req: any 
    ) {
        return this.postService.update(id, req.user.id, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(
        @Param('id') id: string,
        @Req() req: any
    ) {
        return this.postService.delete(id, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async get(
        @Param('id') id: string,
        @Req() req: any
    ) {
        return this.postService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/from/creator/')
    async getByCreator(
        @Req() req: any
    ) {
        return this.postService.findByCreator(req.user.id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/from/community/')
    async getByCommunity(
        @Param('id') id: string, 
        @Req() req: any
    ) {
        return this.postService.findByCommunity(id);
    }
    
}
