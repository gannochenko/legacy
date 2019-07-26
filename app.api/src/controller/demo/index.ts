import {
    Endpoint,
    Post,
    BodyInput,
    Output,
    Result,
    InputContext,
} from '../../lib/msc';

import { DemoInputDTO } from './input.dto';

@Endpoint('/demo')
export class DemoController {
    @Post(':one/:two')
    @BodyInput(DemoInputDTO)
    @Output()
    public async getEntity(
        { type, entity },
        { runtime: { connectionManager } }: InputContext,
    ): Promise<Result> {
        const result = new Result();

        result.data = 'hey1111';

        return result;
    }
}
