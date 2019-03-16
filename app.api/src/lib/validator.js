export default class Validator {
    /**
     * todo: different locales
     * @param entity
     * @param data
     * @returns {Promise<Array>}
     */
    static async validate(entity, data) {
        const errors = [];

        entity.schema.forEach(field => {
            const value = data[field.name];
            const name = field.name;
            const label = _.isne(field.label) ? field.label : name;
            if (typeof value !== 'undefined' && value !== null) {
            } else {
                if (field.required) {
                    errors.push({
                        code: 'required',
                        message: `Field "${label}" is required`,
                        subject: name,
                    });
                }
            }
        });

        return errors;
    }
}
