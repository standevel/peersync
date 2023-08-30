/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenGeneratorService {
    genToken() {
        const token = Math.random().toString(32).replace('.', '');
        return token;
    }
}