import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/createblog.dto';
import { UpdateBlogDto } from './dto/updateblog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllBlogs(): Promise<Blog[]> {
    return await this.blogService.findAll();
  }

  @Get(':id')
  async getBlogById(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Blog> {
    return await this.blogService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(
    @Body()
    createBlogDto: CreateBlogDto,
  ): Promise<Blog> {
    return await this.blogService.create(createBlogDto);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return await this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<void> {
    return await this.blogService.remove(id);
  }
}
