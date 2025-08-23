import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/createblog.dto';
import { UpdateBlogDto } from './dto/updateblog.dto';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      title: 'Blog 1',
      description: 'This is blog description to this blogs',
    },
    {
      id: 2,
      title: 'Blog 2',
      description:
        'This is blog description to this blogs , and this is a common description',
    },
    {
      id: 3,
      title: 'Blog 3',
      description: 'This is blog description to this blogs, read this blog',
    },
    {
      id: 4,
      title: 'Blog 4',
      description:
        'This is blog description to this blogs. this is awsome description',
    },
  ];
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = this.blogRepository.create({
      title: createBlogDto.title,
      description: createBlogDto.description,
      authorName: createBlogDto.authorName,
    });

    return await this.blogRepository.save(newBlog);
  }

  async update(id: number, updateBlogData: UpdateBlogDto): Promise<Blog> {
    const findBlog = await this.findById(id);
    if (updateBlogData.title) {
      findBlog.title = updateBlogData.title;
    }
    if (updateBlogData.description) {
      findBlog.description = updateBlogData.description;
    }
    if (updateBlogData.authorName) {
      findBlog.authorName = updateBlogData.authorName;
    }

    return this.blogRepository.save(findBlog);
  }

  async remove(id: number): Promise<void> {
    const findBlog = await this.findById(id);

    await this.blogRepository.remove(findBlog);
  }
}
