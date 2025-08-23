import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString({ message: 'Title must be string' })
  @IsNotEmpty({ message: 'Title must nut be empty' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Description must not be empty' })
  @IsString({ message: 'Description must not be string' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Author name nust not be author name' })
  authorName: string;
}
