import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './category.dto';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CreateCategoryDto,
  },
})
export class CategoriesController {
  constructor(public service: CategoriesService) {}
}
