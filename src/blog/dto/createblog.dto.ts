import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Title must be string' })
  @IsNotEmpty({ message: 'Title must nut be empty' })
  title: string;

  @IsNotEmpty({ message: 'Description must not be empty' })
  @IsString({ message: 'Description must not be string' })
  description: string;

  @IsNotEmpty({ message: 'Author name nust not be author name' })
  authorName: string;
}
