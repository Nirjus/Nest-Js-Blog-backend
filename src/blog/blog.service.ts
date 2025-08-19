import { Injectable } from '@nestjs/common';

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

  findAll() {
    return this.blogs;
  }

  findOne(title?: string, description?: string) {
    return this.blogs.find(
      (blog) => blog.title === title || blog.description === description,
    );
  }

  findById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }
}
