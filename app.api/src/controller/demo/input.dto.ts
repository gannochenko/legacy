import { DTO, Attribute } from '../../lib/msc';

@DTO()
class TSDTO {
    @Attribute({ required: false, type: 'boolean' })
    public yesNo: boolean;
}

@DTO()
class IndexDTO {
    @Attribute({ required: true, type: 'object' })
    public ts: object = TSDTO;
}

@DTO()
export class DemoInputDTO {
    @Attribute({ required: true, type: 'object' })
    public index: object = IndexDTO;

    @Attribute({ required: true, type: ['object'] })
    public indexAr: object = IndexDTO;

    @Attribute({ required: false, type: 'number' })
    public age: number;
}
