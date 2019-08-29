// @ts-ignore
import { Endpoint, Get } from '../../lib/msc';

@Endpoint('/')
export class HomeController {
    @Get()
    public respond() {
        return 'Hi from the Project Minimum!';
    }
}
