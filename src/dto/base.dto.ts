import { UserDto } from './user.dto';

export class BaseDto {
    createdBy: UserDto | string;
}
