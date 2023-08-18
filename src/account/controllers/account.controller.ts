/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/is_public';
import { IUser } from 'src/models';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }
    @Public()
    @Post()
    signUp(@Body() createUserDto: IUser) {
        return this.accountService.signUp(createUserDto);
    }
    @Public()
    @Post('signin')
    signIn(@Body() createUserDto: IUser) {
        return this.accountService.signIn(createUserDto);
    }
    @Public()
    @Get('check-email-exist')
    checkEmailExist(@Query('email') email: string) {
        console.log('email: ', email);

        return this.accountService.emailExist(email)
    }
    @Get()
    getAllUsers() {
        return this.accountService.getAllUsers()
    }
}
