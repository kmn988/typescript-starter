import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';
import { Crud } from '@dataui/crud';

@ApiTags('actors')
@Controller('actors')
@Crud({
  model: {
    type: Actor,
  },
})
export class ActorsController {
  constructor(public service: ActorsService) {}
}
