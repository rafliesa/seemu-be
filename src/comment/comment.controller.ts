import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentDto } from './dto/comment-dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @UseGuards(JwtAuthGuard) 
    @Post('/')
    async post(@Body() commentDto: CommentDto, @Req() req: any) {
        const user = req.user;
        return this.commentService.create(user.id, commentDto.post, commentDto.content);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() body: { content: string },
        @Req() req: any 
    ) {
        return this.commentService.update(id, req.user.id, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(
        @Param('id') id: string,
        @Req() req: any
    ) {
        return this.commentService.delete(id, req.user.id);
    }
    
    @UseGuards(JwtAuthGuard) 
    @Get('/post/:id')
    async postid(@Param('id') id: string) {
        return this.commentService.findByPost(id);
    }
}
