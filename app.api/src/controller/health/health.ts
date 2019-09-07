// @ts-ignore
import { Endpoint, Get } from '@bucket-of-bolts/express-mvc';

@Endpoint('/health')
export class HealthController {
    @Get()
    public report() {
        return 'I am still here!';
    }
}
