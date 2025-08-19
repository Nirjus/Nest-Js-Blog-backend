import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.findAll();
  }

  @Get('search')
  getBlog(
    @Query('title')
    title?: string,
    @Query('description')
    description?: string,
  ) {
    const blog = this.blogService.findOne(title, description);
    return blog;
  }

  @Get(':id')
  getBlogById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.blogService.findById(id);
  }
}
