const M = (superclass) => class extends superclass
{
    constructor(definition)
    {
        super(definition || [
            {
                code: 'userId',
                type: String,
                label: 'Идентификатор автора',
            },
            {
                code: 'objectId',
                type: String,
	            optional: true,
                label: 'Идентификатор объекта',
            },
	        {
		        code: 'payload',
		        type: Object,
                blackbox: true,
		        label: 'Данные',
	        },
        ]);
    }
};

export default M;
