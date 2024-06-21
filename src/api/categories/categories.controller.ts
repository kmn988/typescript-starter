import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';

@Controller('categories')
@Crud({
  model: {
    type: 'Category',
  },
})
export class CategoriesController {}
