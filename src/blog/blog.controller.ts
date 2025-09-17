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
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/createblog.dto';
import { UpdateBlogDto } from './dto/updateblog.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles-guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(
    @Body()
    createBlogDto: CreateBlogDto,
    @CurrentUser()
    user: any,
  ): Promise<Blog> {
    return await this.blogService.create(createBlogDto, user);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateBlogDto: UpdateBlogDto,
    @CurrentUser()
    user: any,
  ): Promise<Blog> {
    return await this.blogService.update(id, updateBlogDto, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<void> {
    return await this.blogService.remove(id);
  }

  @Get('/title/:title')
  async getBlogByName(
    @Param('title')
    title: string,
  ): Promise<Blog> {
    return await this.blogService.findByName(title);
  }
}
