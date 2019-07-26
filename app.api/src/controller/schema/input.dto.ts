import { DTO, Attribute } from '../../lib/msc';

@DTO()
class TSDTO {}

@DTO()
class IndexDTO {
    public ts: object = TSDTO;
}

@DTO()
export class SchemaInputDTO {
    public index: object = IndexDTO;
}
