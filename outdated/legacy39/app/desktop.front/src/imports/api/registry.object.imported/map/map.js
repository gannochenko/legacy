import Map from "../../../lib/base/map";

const M = (superclass) => class extends superclass
{
    constructor(definition)
    {
        super(definition || [
            {
                code: 'uid',
                type: String,
            },
            {
                code: 'category',
                type: String,
            },
            {
                code: 'name',
                type: String,
            },
            {
                code: 'description',
                type: String,
                optional: true,
            },
	        {
		        code: 'extraData',
		        type: Object,
                blackbox: true,
                optional: true,
	        },
            {
                code: 'location',
                type: [new Map([
                    {
                        code: 'lng',
                        type: Number,
                        decimal: true,
                    },
                    {
                        code: 'lat',
                        type: Number,
                        decimal: true,
                    },
                ])],
            },
            {
                code: 'verified',
                type: Boolean,
                optional: true,
                defaultValue: false,
            },
            {
                code: 'incorrectData',
                type: Boolean,
                optional: true,
                defaultValue: false,
            },
        ]);
    }
};

export default M;
