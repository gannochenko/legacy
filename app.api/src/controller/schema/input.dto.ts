import { DTO, Attribute } from '../../lib/msc';

@DTO()
class TSDTO {}

@DTO()
class IndexDTO {
    @Attribute({ type: TSDTO, required: true })
    public ts: object | undefined;
}

@DTO()
export class SchemaInputDTO {
    @Attribute({ type: IndexDTO, required: true })
    public index: object | undefined;
}
