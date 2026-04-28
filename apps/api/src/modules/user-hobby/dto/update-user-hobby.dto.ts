import { PartialType } from '@nestjs/swagger';
import { CreateUserHobbyDto } from './create-user-hobby.dto';

export class UpdateUserHobbyDto extends PartialType(CreateUserHobbyDto) {}
