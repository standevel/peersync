/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/dto';
import { Public } from 'src/is_public';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }
    @Public()
    @Post()
    signUp(@Body() createUserDto: UserDto) {
        return this.accountService.signUp(createUserDto);
    }
    @Public()
    @Post('signin')
    async signIn(@Body() createUserDto: UserDto, @Res() res: Response) {
        return res.status(200).json(await this.accountService.signIn(createUserDto));
    }
    @Public()
    @Get('check-email-exist')
    checkEmailExist(@Query('email') email: string) {
        console.log('email: ', email);

        return this.accountService.emailExist(email);
    }
    @Get()
    getAllUsers() {
        return this.accountService.getAllUsers();
    }
}
