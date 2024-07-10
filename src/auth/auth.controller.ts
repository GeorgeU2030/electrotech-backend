import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './DTO/loginDTO';
import { registerDTO } from './DTO/registerDTO';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: loginDTO) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() registerDto: registerDTO) {
        return this.authService.signUp(registerDto);
    }

}
