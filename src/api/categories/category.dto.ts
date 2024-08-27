import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;
}
