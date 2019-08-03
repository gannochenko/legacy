import { Field } from '../field';

describe('Field', () => {
    it('should cut all redundant fields', () => {
        const field = new Field({
            type: 'boolean',
            name: 'foo',
            length: 100,
            label: 'la',
            preview: 'lo',
            required: true,
            unique: true,
            some: 'other',
            field: 'bar',
        });

        expect(Object.keys(field.getDeclaration())).toEqualArray([
            'type',
            'name',
            'length',
            'label',
            'preview',
            'unique',
            'required',
        ]);
    });

    it('should report invalid health check', async () => {
        const field = new Field({
            type: ['a', 'a'],
            name: undefined,
            label: ['a'],
            length: 'a',
            preview: 10,
            required: 'sdfads',
            unique: 'lala',
        });

        const errors = await field.getHealth();

        expect(errors).toHaveLength(7);
    });

    it('should pass healthy declaration', async () => {
        let field = new Field({
            type: ['string'],
            name: 'foo',
            label: 'this is foo',
            length: 10,
            preview: false,
            required: true,
            unique: false,
        });

        let errors = await field.getHealth();
        expect(errors).toHaveLength(0);

        field = new Field({
            type: 'string',
            name: 'foo',
            label: 'this is foo',
            length: 10,
            preview: false,
            required: true,
            unique: false,
        });

        errors = await field.getHealth();
        expect(errors).toHaveLength(0);
    });
});
