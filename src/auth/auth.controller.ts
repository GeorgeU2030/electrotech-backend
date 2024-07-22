import { Body, Controller, Headers, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './DTO/loginDTO';
import { registerDTO } from './DTO/registerDTO';
import { Public } from 'src/decorators/public';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: loginDTO) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('register')
    signUp(@Body() registerDto: registerDTO) {
        return this.authService.signUp(registerDto);
    }

    @Public()
    @Get("validate")
    validateToken(@Headers('authorization') authorization: string){
        return this.authService.isValidToken(authorization);
    }

}
