// @ts-ignore
import { Endpoint, Get } from '../../lib/msc';

@Endpoint('/health')
export class HealthController {
    @Get()
    public report() {
        return 'I am still here!';
    }
}
