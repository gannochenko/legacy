import { Endpoint, Get } from '@bucket-of-bolts/express-mvc';

@Endpoint('/')
export class HomeController {
    @Get()
    public respond() {
        return 'Hi from the Project Minimum!';
    }
}
