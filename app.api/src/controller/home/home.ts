// @ts-ignore
import { Endpoint, Get } from '../../lib/msc';

@Endpoint('/')
export class HomeController {
    @Get()
    public async getEntity(): Promise<string> {
        return 'Hi from the Project Minimum!';
    }
}
