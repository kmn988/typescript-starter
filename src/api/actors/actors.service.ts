import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class ActorsService extends TypeOrmCrudService<Actor> {
  constructor(@InjectRepository(Actor) repo) {
    super(repo);
  }
}
