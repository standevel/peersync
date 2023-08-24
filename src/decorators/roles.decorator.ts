import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enum/user-roles.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
